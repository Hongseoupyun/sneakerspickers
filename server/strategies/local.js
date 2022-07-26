const LocalStrategy = require("passport-local");
const passport = require("passport");
const db = require("../configs/db.config");

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const result = await db.query(
      `SELECT * FROM USERS WHERE email = '${email}'`
    );
    if (result.rows[0]) {
      done(null, result.rows[0]);
    }
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const result = await db.query(`SELECT * FROM USERS WHERE email = $1`, [
          email,
        ]);
        console.log("Authenticating: local.js:", result.rows[0]);
        if (!result.rows.length) {
          done(null, false);
        } else {
          if (result.rows[0].password === password) {
            console.log("Successfully authenticated");
            done(null, result.rows[0]);
          } else {
            done(null, false);
          }
        }
      } catch (error) {
        done(error, false);
      }
    }
  )
);
