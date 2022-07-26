const router = require("express").Router();

let queryString = `
SELECT *
FROM listings
WHERE 
active IS TRUE 
AND size = $1 
AND brand = $2;
`;

// Route /api/listings
module.exports = (db) => {
  router.post("/listingsfilter", (req, res) => {
    console.log(req.body);
    db.query(queryString, [req.body.size, req.body.brand])
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
