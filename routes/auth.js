const { Router } = require("express");
const passport = require("passport");
const router = Router();

router.post("/login", passport.authenticate("local"), (req, res) => {
  const params = req.body;
  console.log("/login route hit:", params);
  res.send(res.data);
});

module.exports = router;
