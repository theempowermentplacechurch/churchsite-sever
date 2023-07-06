const mongoose = require("mongoose");
const HomepageSchema = require("../Schema/Homepage");
const jwt = require("jsonwebtoken");
const Userschema = require("../Schema/Userschema");

const postHomepageItems = async (req, res) => {
  const {
    bannerimage,
    servicetime,
    liveservice,
    liveurl,
    address,
    email,
    contact,
    whatsapp,
    facebook,
    youtube,
    instagram,
  } = req.body;

  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "FAILED",
        message: "No token provided, You dont have access to this data",
      });
    }

    const token = auth.split(" ")[1];
    const verifyToken = jwt.verify(token, process.env.SECRET);

    if (!verifyToken) {
      return res
        .status(401)
        .json({ status: "ERROR", message: "Invalide token access" });
    }

    const homeData = new HomepageSchema({
      bannerimage,
      servicetime,
      liveservice,
      liveurl,
      address,
      email,
      contact,
      whatsapp,
      facebook,
      youtube,
      instagram,
    });

    await homeData.save();
    res.status(200).json({ status: "SUCCESS", data: homeData });
  } catch (error) {
    res.status(500).json({ status: "FAILED", error: error.message });
  }
};

// update homepage items
const updateHomeoageItems = async (req, res) => {
  try {
    // check if there is successfull token login
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "FAILED",
        message: "No token provided, You dont have access to this data",
      });
    }

    // get token and verify with jwt
    const token = auth.split(" ")[1];
    const verifyToken = await jwt.verify(token, process.env.SECRET);
    if (!verifyToken) {
      return res
        .status(401)
        .json({ status: "ERROR", message: "Invalide token access" });
    }

    // find user with token
    const allowAccess = await Userschema.findOne({
      _id: verifyToken.id,
    });

    // condition user with access
    if (!allowAccess) {
      return res.status(401).json({
        status: "ERROR",
        message: "You are not authorized to perform this action",
      });
    }

    // update user
    const homeData = await HomepageSchema.findOneAndUpdate(
      { _id: req.params.id }, // specify the user to update
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({ status: "SUCCESS", data: homeData });
  } catch (error) {
    res.status(200).json({ status: "FAILED", error: error.message });
  }
};
// update homepage items
const getHomeoageItems = async (req, res) => {
  try {
    // update user
    const homeData = await HomepageSchema.find({});

    res.status(200).json({ status: "SUCCESS", data: homeData });
  } catch (error) {
    res.status(200).json({ status: "FAILED", error: error.message });
  }
};
module.exports = { getHomeoageItems, postHomepageItems, updateHomeoageItems };
