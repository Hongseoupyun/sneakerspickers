const router = require("express").Router();

let queryString = `
SELECT *
FROM listings
WHERE active IS TRUE;
`;

// Route /api/listings
module.exports = (db) => {
  router.get("/alllistings", (req, res) => {
    db.query(queryString)
      .then((result) => {
        rows = result.rows;
        res.json(result.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
