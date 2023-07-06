const express = require("express");
const router = express.Router();

const {
  updateSermon,
  postSermon,
  getSermon,
  deleteSermon,
} = require("../Controller/Sermon");

router.post("/postsermon", postSermon);
router.get("/getsermon", getSermon);
router.patch("/updatesermon/:id", updateSermon);
router.delete("/deletesermon/:id", deleteSermon);

module.exports = router;
