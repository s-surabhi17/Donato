const express = require("express");
const router = express.Router();
const NGO = require("../models/NGO.model");
const { redisClient } = require("../configs/redis");

// Cache duration in seconds (30 minutes)
const CACHE_TTL = 1800;

/**
 * @swagger
 * /ngos:
 *   get:
 *     summary: Get all NGOs
 *     description: Returns a list of all NGOs, cached for performance
 *     responses:
 *       200:
 *         description: List of NGOs
 */
router.get("/", async (req, res) => {
  const logPrefix = "[NGO Route]";
  try {
    console.log(`${logPrefix} Starting NGO fetch process`);
    console.log(`${logPrefix} Checking Redis cache...`);

    let ngos = [];
    let source = "cache";

    const cachedNGOs = await redisClient.getCachedNGOs();

    if (cachedNGOs && Array.isArray(cachedNGOs)) {
      console.log(`${logPrefix} Returning ${cachedNGOs.length} NGOs from cache`);
      return res.status(200).json({
        success: true,
        data: cachedNGOs,
        source: "redis-cache",
        cached: true,
        count: cachedNGOs.length
      });
    }

    source = "database";
    console.log(`${logPrefix} Cache miss, querying MongoDB...`);

    ngos = await NGO.find({})
      .lean()
      .select('_id NGOName description location contact reviews')
      .exec();

    if (!Array.isArray(ngos)) {
      throw new Error("Invalid data format from database");
    }

    console.log(`${logPrefix} Found ${ngos.length} NGOs in database`);

    if (ngos.length > 0) {
      try {
        await redisClient.cacheNGOs(ngos);
        console.log(`${logPrefix} Cached ${ngos.length} NGOs for ${CACHE_TTL} seconds`);
      } catch (cacheError) {
        console.error(`${logPrefix} Cache update failed:`, cacheError.message);
      }
    }

    res.status(200).json({
      success: true,
      data: ngos,
      source,
      cached: false,
      count: ngos.length
    });

  } catch (error) {
    console.error(`${logPrefix} Error:`, error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch NGO data",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @swagger
 * /ngos/{id}:
 *   get:
 *     summary: Get NGO by ID
 *     description: Returns a specific NGO by ID, cached for performance
 */
router.get("/:id", async (req, res) => {
  const logPrefix = "[NGO Route - Single]";
  const { id } = req.params;

  try {
    console.log(`${logPrefix} Fetching NGO with ID: ${id}`);

    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid NGO ID format"
      });
    }

    const cachedNGO = await redisClient.getCachedNGO(id);

    if (cachedNGO) {
      return res.status(200).json({
        success: true,
        data: cachedNGO,
        source: "redis-cache",
        cached: true
      });
    }

    const ngo = await NGO.findById(id).lean().exec();

    if (!ngo) {
      return res.status(404).json({
        success: false,
        message: "NGO not found"
      });
    }

    try {
      await redisClient.cacheSingleNGO(ngo);
    } catch (cacheError) {
      console.error(`${logPrefix} Cache update failed:`, cacheError.message);
    }

    res.status(200).json({
      success: true,
      data: ngo,
      source: "database",
      cached: false
    });

  } catch (error) {
    console.error(`${logPrefix} Error:`, error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch NGO data",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @swagger
 * /ngos/cache/clear:
 *   delete:
 *     summary: Clear NGO cache
 *     description: Clears all cached NGO data from Redis
 */
router.delete("/cache/clear", async (req, res) => {
  const logPrefix = "[NGO Route - Cache Clear]";
  try {
    console.log(`${logPrefix} Clearing NGO cache...`);

    const cleared = await redisClient.del('all_ngos');

    console.log(`${logPrefix} Cache cleared successfully`);

    res.status(200).json({
      success: true,
      message: "NGO cache cleared successfully",
      cleared: cleared
    });

  } catch (error) {
    console.error(`${logPrefix} Error clearing cache:`, error.message);
    res.status(500).json({
      success: false,
      message: "Failed to clear cache",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @swagger
 * /ngos:
 *   post:
 *     summary: Add a new NGO
 *     description: Creates a new NGO entry in the database
 */
router.post("/add-ngo", async (req, res) => {
  const logPrefix = "[NGO Route - Create]";
  try {
    const { NGOName, description, location, contact, createdBy } = req.body;

    if (!NGOName || !location || !contact || !createdBy) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields (NGOName, location, contact, createdBy)"
      });
    }

    const newNGO = new NGO(req.body);
    const savedNGO = await newNGO.save();

    console.log(`${logPrefix} New NGO created: ${savedNGO._id}`);

    try {
      await redisClient.del("all_ngos");
      console.log(`${logPrefix} Cleared cached NGO list after adding new NGO`);
    } catch (cacheError) {
      console.warn(`${logPrefix} Failed to clear cache after adding NGO`, cacheError.message);
    }

    res.status(201).json({
      success: true,
      message: "NGO created successfully",
      data: savedNGO
    });

  } catch (error) {
    console.error(`${logPrefix} Error creating NGO:`, error.message);
    res.status(500).json({
      success: false,
      message: "Server error while creating NGO",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @swagger
 * /ngos/by-user/{userId}:
 *   get:
 *     summary: Get NGO by User ID
 *     description: Fetch a single NGO based on the user who created it
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user who created the NGO
 *     responses:
 *       200:
 *         description: NGO data
 *       404:
 *         description: NGO not found
 */
router.get("/by-user/:userId", async (req, res) => {
  const logPrefix = "[NGO Route - By User]";
  const { userId } = req.params;

  try {
    console.log(`${logPrefix} Fetching NGO created by user ID: ${userId}`);

    if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format"
      });
    }

    const ngo = await NGO.findOne({ createdBy: userId }).lean();

    if (!ngo) {
      return res.status(404).json({
        success: false,
        message: "NGO not found for this user"
      });
    }

    res.status(200).json({
      success: true,
      data: ngo
    });

  } catch (error) {
    console.error(`${logPrefix} Error fetching NGO by user ID:`, error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch NGO by user ID",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
