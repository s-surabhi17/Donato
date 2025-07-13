const redis = require("redis");
const { promisify } = require("util");

// Redis v3.1.2 client configuration
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  db: parseInt(process.env.REDIS_DB) || 0,
  retry_strategy: (options) => {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      console.error('🔴 Redis connection refused');
      return new Error('The server refused the connection');
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      console.error('🔴 Redis retry time exhausted');
      return new Error('Retry time exhausted');
    }
    if (options.attempt > 10) {
      console.error('🔴 Redis max attempts reached');
      return undefined;
    }
    const delay = Math.min(options.attempt * 100, 5000);
    console.log(`🔄 Retrying Redis connection in ${delay}ms...`);
    return delay;
  }
});

// Event handlers
redisClient.on("connect", () => {
  console.log("🟢 Redis connected successfully");
});

redisClient.on("ready", () => {
  console.log("✅ Redis client ready and operational");
  // Set keyspace notifications for expiry events
  redisClient.config("SET", "notify-keyspace-events", "Ex", (err) => {
    if (err) console.error("⚠️ Could not set keyspace events:", err.message);
  });
});

redisClient.on("error", (err) => {
  console.error("🔴 Redis Error:", err.message);
});

redisClient.on("reconnecting", (params) => {
  console.log("🔄 Redis reconnecting...", params);
});

redisClient.on("end", () => {
  console.log("🔌 Redis connection ended");
});

// Promisify Redis methods - only after client is ready
let getAsync, setexAsync, delAsync, existsAsync, expireAsync, ttlAsync;

const initializeAsyncMethods = () => {
  try {
    getAsync = promisify(redisClient.get).bind(redisClient);
    setexAsync = promisify(redisClient.setex).bind(redisClient); // Note: setex, not setEx
    delAsync = promisify(redisClient.del).bind(redisClient);
    existsAsync = promisify(redisClient.exists).bind(redisClient);
    expireAsync = promisify(redisClient.expire).bind(redisClient);
    ttlAsync = promisify(redisClient.ttl).bind(redisClient);
    console.log("✅ Redis async methods initialized");
  } catch (error) {
    console.error("❌ Error initializing Redis async methods:", error);
  }
};

// Initialize methods when client is ready
redisClient.on('ready', initializeAsyncMethods);

// If already ready, initialize immediately
if (redisClient.ready) {
  initializeAsyncMethods();
}

// Enhanced Redis operations with proper error handling
const redisOperations = {
  async get(key) {
    try {
      if (!redisClient.ready) {
        throw new Error('Redis client not ready');
      }
      
      const result = await getAsync(key);
      console.log(`🔍 Redis GET '${key}':`, result ? "Found" : "Not found");
      return result ? JSON.parse(result) : null;
    } catch (err) {
      console.error(`❌ Redis GET error for '${key}':`, err.message);
      throw err;
    }
  },

  async set(key, value, ttl = 3600) { // Default 1 hour TTL
    try {
      if (!redisClient.ready) {
        throw new Error('Redis client not ready');
      }
      
      const stringValue = JSON.stringify(value);
      await setexAsync(key, ttl, stringValue); // Redis v3 uses setex (lowercase)
      console.log(`💾 Redis SET '${key}' with ${ttl}s TTL`);
      return true;
    } catch (err) {
      console.error(`❌ Redis SET error for '${key}':`, err.message);
      throw err;
    }
  },

  async setWithoutTTL(key, value) {
    try {
      if (!redisClient.ready) {
        throw new Error('Redis client not ready');
      }
      
      const setAsync = promisify(redisClient.set).bind(redisClient);
      const stringValue = JSON.stringify(value);
      await setAsync(key, stringValue);
      console.log(`💾 Redis SET '${key}' (no TTL)`);
      return true;
    } catch (err) {
      console.error(`❌ Redis SET error for '${key}':`, err.message);
      throw err;
    }
  },

  async del(key) {
    try {
      if (!redisClient.ready) {
        throw new Error('Redis client not ready');
      }
      
      const result = await delAsync(key);
      console.log(`🗑️ Redis DEL '${key}':`, result > 0 ? "Deleted" : "Key not found");
      return result > 0;
    } catch (err) {
      console.error(`❌ Redis DEL error for '${key}':`, err.message);
      throw err;
    }
  },

  async exists(key) {
    try {
      if (!redisClient.ready) {
        throw new Error('Redis client not ready');
      }
      
      const result = await existsAsync(key);
      return result > 0;
    } catch (err) {
      console.error(`❌ Redis EXISTS error for '${key}':`, err.message);
      throw err;
    }
  },

  async expire(key, ttl) {
    try {
      if (!redisClient.ready) {
        throw new Error('Redis client not ready');
      }
      
      const result = await expireAsync(key, ttl);
      console.log(`⏰ Redis EXPIRE '${key}' set to ${ttl}s`);
      return result > 0;
    } catch (err) {
      console.error(`❌ Redis EXPIRE error for '${key}':`, err.message);
      throw err;
    }
  },

  async ttl(key) {
    try {
      if (!redisClient.ready) {
        throw new Error('Redis client not ready');
      }
      
      const result = await ttlAsync(key);
      return result;
    } catch (err) {
      console.error(`❌ Redis TTL error for '${key}':`, err.message);
      throw err;
    }
  },

  // Application-specific methods
  async cacheNGOs(ngos) {
    return await this.set('all_ngos', ngos, 1800); // 30 minutes cache
  },

  async getCachedNGOs() {
    return await this.get('all_ngos');
  },

  async cacheSingleNGO(ngo) {
    if (!ngo || !ngo._id) {
      throw new Error('Invalid NGO object');
    }
    return await this.set(`ngo:${ngo._id}`, ngo, 3600); // 1 hour cache
  },

  async getCachedNGO(ngoId) {
    if (!ngoId) {
      throw new Error('NGO ID is required');
    }
    return await this.get(`ngo:${ngoId}`);
  },

  // Session management
  async setSession(sessionId, sessionData, ttl = 86400) { // 24 hours default
    return await this.set(`session:${sessionId}`, sessionData, ttl);
  },

  async getSession(sessionId) {
    return await this.get(`session:${sessionId}`);
  },

  async deleteSession(sessionId) {
    return await this.del(`session:${sessionId}`);
  },

  // Rate limiting
  async incrementCounter(key, ttl = 3600) {
    try {
      if (!redisClient.ready) {
        throw new Error('Redis client not ready');
      }
      
      const incrAsync = promisify(redisClient.incr).bind(redisClient);
      const count = await incrAsync(key);
      
      if (count === 1) {
        // Set expiry only on first increment
        await this.expire(key, ttl);
      }
      
      return count;
    } catch (err) {
      console.error(`❌ Redis INCREMENT error for '${key}':`, err.message);
      throw err;
    }
  }
};

// Connection helper (for v3, connection is automatic)
function connectRedis() {
  return new Promise((resolve, reject) => {
    if (redisClient.ready) {
      console.log("✅ Redis already connected");
      resolve(redisClient);
      return;
    }

    const timeout = setTimeout(() => {
      reject(new Error('Redis connection timeout'));
    }, 10000); // 10 second timeout

    redisClient.once('ready', () => {
      clearTimeout(timeout);
      console.log("🟢 Redis connection established");
      resolve(redisClient);
    });

    redisClient.once('error', (err) => {
      clearTimeout(timeout);
      console.error("🔴 Failed to connect to Redis:", err.message);
      reject(err);
    });
  });
}

// Health check
async function healthCheck() {
  try {
    if (!redisClient.ready) {
      return { status: 'disconnected', message: 'Redis client not ready' };
    }

    const testKey = 'health_check_' + Date.now();
    await redisOperations.set(testKey, 'ok', 10);
    const result = await redisOperations.get(testKey);
    await redisOperations.del(testKey);

    return result === 'ok' 
      ? { status: 'healthy', message: 'Redis is working properly' }
      : { status: 'error', message: 'Redis test failed' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('🔌 Closing Redis connection...');
  redisClient.quit(() => {
    console.log('✅ Redis connection closed');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('🔌 Closing Redis connection...');
  redisClient.quit(() => {
    console.log('✅ Redis connection closed');
    process.exit(0);
  });
});

module.exports = {
  redisClient: redisOperations,
  connectRedis,
  healthCheck,
  rawClient: redisClient // For when you need direct access
};