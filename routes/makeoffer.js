const router = require("express").Router();

let queryString = `
INSERT INTO offers (listing_offer_made_to_id, listing_being_offered_id, complete, pending)
VALUES
  ($1, $2, FALSE, TRUE);
`;

// Route /api/listings
module.exports = (db) => {
  router.post("/makeoffer", (req, res) => {
    console.log("bodyrequest offer:", req.body);
    db.query(queryString, [req.body.listingID, req.body.offeredID])
      .then((result) => {
        console.log("result makeoffer:", result);
        rows = result.rows;
        res.json({ "Offering id:": req.body.offeredID });
      })
      .catch((err) => {
        console.log("error in make offer:", err);
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
