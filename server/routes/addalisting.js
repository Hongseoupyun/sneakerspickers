const router = require("express").Router();
const uploadListing = `INSERT INTO listings (user_id, name, description, brand, size, image_url, preference, active) VALUES ($1,$2,$3, $4, $5, $6, $7, TRUE);`;

module.exports = (db) => {
  router.post("/listings", (req, res) => {
    const { name, size, brand, description, img, preference } = req.body;
    console.log(req.body);
    const userId = req.user.id;
    db.query(uploadListing, [
      userId,
      name,
      description,
      brand,
      size,
      img,
      preference,
    ])
      .then(() => {
        res.json({ success: true, message: "User uploaded listing" });
      })
      .catch((err) => {
        console.log("Error occured in addalisting backend", err);
        res.json({ message: "Failed" });
      });
  });
  return router;
};
