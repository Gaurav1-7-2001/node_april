const passport = require("passport");
const Person = require("./models/Person");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async (Username, password, done) => {
    try {
      console.log("reaceived credential", Username, password);
      const user = await Person.findOne({ username: Username });
      if (!user) {
        return done(null, false, { message: "invalid username.." });
      }

    //   const isPassMatch = user.password === password ? true : false;

    const isPassMatch = user.comparedPassword(password);
      if (isPassMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "invalid password.." });
      }
    } catch (error) {
      return done(error);
    }
  }),
);

module.exports = passport;
