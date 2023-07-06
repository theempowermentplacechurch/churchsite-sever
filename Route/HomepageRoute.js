const express = require("express");
const router = express.Router();

const {
  postHomepageItems,
  updateHomeoageItems,
  getHomeoageItems,
} = require("../Controller/Home");


router.post("/posthomepageitems", postHomepageItems);
router.get("/gethomeoageitems", getHomeoageItems);
router.patch("/updatehomeoageitems/:id", updateHomeoageItems);


module.exports = router;
