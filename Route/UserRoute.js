const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  allUsers,
  getSingleUser,
  getSessionUser,
  updateUserPosition,
  deleteUser,
} = require("../Controller/User");

router.post("/registeruser", registerUser);
router.post("/loginuser", loginUser);
router.get("/allusers", allUsers);
router.get("/getsessionuser", getSessionUser);
router.get("/getsingleuser/:id", getSingleUser);
router.patch("/updateuser/:id", updateUserPosition);
router.delete("/deleteuser/:id", deleteUser);

module.exports = router;
