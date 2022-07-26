const router = require("express").Router();
const getOffer = `

SELECT listings.*, offers.* FROM listings 
JOIN users ON users.id=user_id 
JOIN offers ON listings.id=listing_offer_made_to_id 
WHERE users.id = $1
AND
pending IS FALSE
AND
complete IS TRUE;
`;
const getOffer2 = `

SELECT listings.*, offers.* FROM listings 
JOIN users ON users.id=user_id 
JOIN offers ON listings.id=listing_being_offered_id
WHERE users.id = $1
AND
pending IS FALSE
AND
complete IS TRUE;
`;


const getMessages = `SELECT * FROM messages where offer_id = $1`;

const insertMessages = `INSERT INTO messages(offer_id, sender_id, text) VALUES ($1, $2, $3)`;

module.exports = (db) => {
  router.get("/offerlist/acceptedconversation", (req, res) => {
    db.query(getOffer, [req.user?.id]).then((result) => {
      res.json(result.rows)
    });
  });
  
  router.get("/chatting", (req, res) => {
    console.log("mymessages GET", req.body.selectedId);
    db.query(getMessages, [req.body.selectedId])
      .then((result) => {
        res.json(result.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  router.post("/chatting", (req, res) => {
    console.log("chatting POST", req.body.text);
    db.query(insertMessages, [
      req.body.selectedId,
      req.user?.id,
      req.body.text
    ]).then(() => {
      res.json({ success: true, message: "User uploaded listing" });
    });
  });

  return router;
};
