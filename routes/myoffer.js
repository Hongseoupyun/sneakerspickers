const router = require("express").Router();

const queryListings = `

SELECT listings.*, offers.* FROM listings 
JOIN users ON users.id=user_id 
JOIN offers ON listings.id=listing_offer_made_to_id
WHERE users.id = $1
AND
pending IS TRUE
AND
active IS TRUE;
`;

const offeredListings = `
SELECT listings.*, offers.* FROM listings  
JOIN offers ON listings.id=listing_being_offered_id
JOIN users ON user_id=users.id
WHERE listing_being_offered_id = $1
AND listing_offer_made_to_id = $2;
`;

const acceptOffer = `UPDATE offers SET pending = FALSE, complete = TRUE where offers.offerid = $1
`;
const acceptSeller = `
UPDATE listings SET active = FALSE where listings.id = $1
`;
const acceptBuyer = `
UPDATE listings SET active = FALSE where listings.id = $1
`;

const declineOffer = `
UPDATE offers SET pending = FALSE where offers.offerid = $1
`;

module.exports = (db) => {
  router.get("/offerlist", (req, res) => {
    db.query(queryListings, [req.user?.id])
      .then((result) => {
        res.json(result.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/offerlist", (req, res) => {
    db.query(offeredListings, [req.body.offeredid, req.body.wantedID])
      .then((result) => {
        res.json(result.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/acceptoffer", (req, res) => {
    console.log("accepted offer", req.body.offerid);
    db.query(acceptOffer, [req.body.offerid])
      .then(() => {
        console.log("changing seller info");
        db.query(acceptSeller, [req.body.wantedID]);
      })
      .then(() => {
        console.log("changing buyers info");
        db.query(acceptBuyer, [req.body.offeredid]);
      })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/declineoffer", (req, res) => {
    console.log("offerid:", req.body.offerid);
    db.query(declineOffer, [req.body.offerid])
      .then((result) => {
        console.log("buyer's info:", result.rows);
        res.json(result.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
