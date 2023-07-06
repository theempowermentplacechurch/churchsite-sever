const express = require("express");
const router = express.Router();

const {
  getEventpage,
  postEventpageItems,
  updateEventpageItems,
  deleteEventpageItems,
} = require("../Controller/Events");

router.post("/posteventpageitems", postEventpageItems);
router.get("/geteventpage", getEventpage);
router.delete("/deleteeventpageitems/:id", deleteEventpageItems);
router.patch("/updateeventpageitems/:id", updateEventpageItems);

module.exports = router;
