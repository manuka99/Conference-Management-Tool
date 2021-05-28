const User = require("../models/User");
const { AUTH_SECRET } = require("../config/index");
const { Strategy, ExtractJwt } = require("passport-jwt");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: AUTH_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, async (payload, done) => {
      await User.findById(payload.user_id)
        .then((user) => (user ? done(null, user) : done(null, false)))
        .catch((error) => done(null, false));
    })
  );
};
