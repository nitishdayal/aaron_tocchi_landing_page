"use strict";
var express = require("express");
var router = express.Router();
/* GET users listing. */
router.get("/", function (req, res, next) {
    res.render("users", { title: "Users Page", back: req.url });
});
module.exports = router;
//# sourceMappingURL=users.js.map