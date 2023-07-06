const express = require("express");
const router = express.Router();

const {
  getAboutpage,
  postAboutpageItems,
  updateAboutpageItems,
  deleteAboutpageItems,
} = require("../Controller/About");

router.post("/postaboutpageitems", postAboutpageItems);
router.get("/getaboutpage", getAboutpage);
router.patch("/updataboutpageitems/:id", updateAboutpageItems);
router.delete("/deleteaboutpageitems/:id", deleteAboutpageItems);

module.exports = router;
