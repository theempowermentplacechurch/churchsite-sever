const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const AboutpageSchema = require("../Schema/Aboutpage");
const userSchema = require("../Schema/Userschema.js");
const Userschema = require("../Schema/Userschema.js");

const getAboutpage = async (req, res) => {
  try {
    const aboutData = await AboutpageSchema.find({});
    res.status(200).json({ status: "SUCCESS", data: aboutData });
  } catch (error) {
    res.status(200).json({ status: "FAILED", error: error.message });
  }
};

// post about page items
const postAboutpageItems = async (req, res) => {
  const { bannerimage, ministerimage, ministername, ministertitle } = req.body;

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

    const aboutData = new AboutpageSchema({
      bannerimage,
      ministerimage,
      ministername,
      ministertitle,
    });

    await aboutData.save();
    res.status(200).json({ status: "SUCCESS", data: aboutData });
  } catch (error) {
    res.status(500).json({ status: "FAILED", error: error.message });
  }
};

// update aboutpage items
const updateAboutpageItems = async (req, res) => {
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
    const allowAccess = await userSchema.findOne({
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
    const aboutData = await AboutpageSchema.findOneAndUpdate(
      { _id: req.params.id }, // specify the user to update
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({ status: "SUCCESS", data: aboutData });
  } catch (error) {
    res.status(200).json({ status: "FAILED", error: error.message });
  }
};
// update aboutpage items
const deleteAboutpageItems = async (req, res) => {
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
    const aboutData = await AboutpageSchema.findOneAndDelete(
      { _id: req.params.id }, // specify the user to update
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({ status: "SUCCESS", data: aboutData });
  } catch (error) {
    res.status(200).json({ status: "FAILED", error: error.message });
  }
};
module.exports = {
  getAboutpage,
  postAboutpageItems,
  updateAboutpageItems,
  deleteAboutpageItems,
};
