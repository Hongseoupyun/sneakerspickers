const router = require("express").Router();

const queryListing = `
SELECT offers.id, 
from_list.brand as from_brand,
from_list.image_url as from_image,
from_list.id as from_id,
from_list.name as from_name, 
from_list.size as from_size, 
from_list.description as from_description, 
to_list.brand as to_brand,
to_list.image_url as to_image,
to_list.id as to_id,
to_list.name as to_name, 
to_list.size as to_size, 
to_list.description as to_description FROM offers 
JOIN listings AS from_list ON offers.listing_being_offered_id = from_list.id
JOIN listings AS to_list ON offers.listing_offer_made_to_id = to_list.id
WHERE to_list.user_id = $1 AND offers.pending = TRUE
`;

module.exports = (db) => {
  router.get("/offers", (req, res) => {
    const user_id = 3;
    db.query(queryListing, [user_id])
      .then((result) => {
        res.json(result.rows);
      })
      .catch((err) => [console.log("Error!", err)]);
  });
  return router;
};
