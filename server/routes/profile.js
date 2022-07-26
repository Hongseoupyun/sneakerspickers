const router = require("express").Router();

const queryUser = `SELECT * FROM users WHERE id = $1`;
const updateUserProfile = `UPDATE users
SET user_name = $1, email= $2, password= $3
WHERE id = $4;`;

module.exports = (db) => {
  router.get("/profile", (req, res) => {
    db.query(queryUser, [req.user?.id])
      .then((result) => {
        res.json(result.rows[0]);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/profile", (req, res) => {
    const {
      user_name,
      email,
      newPassword,
      confirmedPassword,
      currentPassword,
    } = req.body;
    db.query(`SELECT password FROM users where id = $1`, [req.user.id]).then(
      (result) => {
        const passwordInDb = result.rows[0].password;
        if (
          newPassword === confirmedPassword &&
          currentPassword === passwordInDb
        ) {
          console.log(req.body);
          db.query(updateUserProfile, [
            user_name,
            email,
            newPassword,
            req.user.id,
          ])
            .then(() => {
              res.json({ success: true, message: "Profile Updated" });
            })
            .catch((err) => {
              console.log("Error! ->", err);
            });
        }
      }
    );
  });
  return router;
};
