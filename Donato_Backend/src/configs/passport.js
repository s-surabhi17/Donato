require("dotenv").config();

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/user.model");
const { v4: uuidv4 } = require("uuid");

// ✅ Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://${process.env.BACKEND_URL}/auth/google/callback`,
    },
    async function (accessToken, refreshToken, profile, cb) {
      const email = profile?._json?.email;
      const name = profile?._json?.name;
      const picture = profile?._json?.picture;

      try {
        let user = await User.findOne({ email }).lean().exec();

        if (!user) {
          user = await User.create({
            email: email,
            password: uuidv4(),
            name: name,
            profilePic: picture,
            donations: [],
          });
        }

        return cb(null, user);
      } catch (err) {
        console.error("Error in Google Strategy:", err);
        return cb(err, null);
      }
    }
  )
);

// ✅ Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// ✅ Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).lean();
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
