const express = require("express");
const router = express.Router();
const { addPage, wikiPage, main } = require("../views/");
const { Page, User } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const foundPages = await Page.findAll();
    res.send(main(foundPages));
  } catch (error) {
    next(error); //renders errors!
  }
});

router.get("/add", (req, res, next) => {
  res.send(addPage());
});

router.get("/:slug", async (req, res, next) => {
  try {
    const foundPage = await Page.findOne({
      where: { slug: req.params.slug }
    });
    // console.log(foundPage);
    // res.json(foundPage);
    res.send(wikiPage(foundPage));
  } catch (error) {
    next(error); //renders errors!
  }
});

router.post("/", async (req, res, next) => {
  // res.json(req.body); //what is res.json actually returning?
  //console.log(req.body);
  // res.send("this is the wikiPostPage");

  const { name, email, title, content, status } = req.body;

  const page = new Page({
    title: title,
    content: content
  });

  const user = new User({
    name: name,
    email: email
  });

  page.setAuthor(user);

  try {
    await user.save();
    await page.save();
    await res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
  console.log(page);
});

module.exports = router;
