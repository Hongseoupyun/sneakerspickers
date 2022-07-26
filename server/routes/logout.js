const { Router } = require("express");
const router = Router();

router.get("/logout", function (req, res) {
  res.status(200).clearCookie("connect.sid", { path: "/" });
  req.session.destroy(function () {
    res.redirect("/");
  });
  
});

module.exports = router;
