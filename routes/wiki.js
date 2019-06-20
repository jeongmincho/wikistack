const express = require("express");
const router = express.Router();
const { addPage } = require("../views/");

router.get("/", (req, res, next) => {
  res.send("this is the wikiGetPage");
});

router.get("/add", (req, res, next) => {
  res.send(addPage());
});

router.post("/", (req, res, next) => {
  // res.json(req.body);
  console.log(req.body);
  // res.send("this is the wikiPostPage");
});

module.exports = router;
