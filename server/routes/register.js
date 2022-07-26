const router = require("express").Router();

let queryString = `
INSERT INTO users (user_name, email, password)
VALUES ($1, $2, $3);
`;

// Route /register
module.exports = (db) => {
  router.post("/", (req, res) => {
    console.log(req.body);
    db.query(queryString, [
      req.body.user_name,
      req.body.email,
      req.body.password,
    ])
      .then((result) => {
        console.log("successfully registered");
        // console.log(result)
        res.send("Successful");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
