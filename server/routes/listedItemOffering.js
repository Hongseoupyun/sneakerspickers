const router = require("express").Router();

const queryListing = `SELECT * FROM listings WHERE listings.id = $1`;

module.exports = (db) => {
  router.get("/listeditem/:id", (req, res) => {
    db.query(queryListing, [req.params.id])
      .then((result) => {
        res.json(result.rows);
      })
      .catch((err) => {
        console.log("Error found in listings =>", err);
      });
  });
  return router;
};
