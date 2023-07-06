const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const sermonSchema = require("../Schema/Sermonschema");
const Userschema = require("../Schema/Userschema");

const getSermon = async (req, res) => {
  try {
    const sermonData = await sermonSchema.find({});

    res.status(200).json({ status: "SUCCESS", data: sermonData });
  } catch (error) {
    res.status(200).json({ status: "FAILED", error: error.message });
  }
};

// post about page items
const postSermon = async (req, res) => {
  const { title, series, speaker, date, video, audio, details, type } =
    req.body;

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

    const sermonData = new sermonSchema({
      title,
      series,
      speaker,
      type,
      date,
      video,
      audio,
      details,
    });

    await sermonData.save();
    res.status(200).json({ status: "SUCCESS", data: sermonData });
  } catch (error) {
    res.status(500).json({ status: "FAILED", error: error.message });
  }
};

// update aboutpage items
const updateSermon = async (req, res) => {
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
    const sermonData = await sermonSchema.findOneAndUpdate(
      { _id: req.params.id }, // specify the user to update
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({ status: "SUCCESS", data: sermonData });
  } catch (error) {
    res.status(200).json({ status: "FAILED", error: error.message });
  }
};

// update aboutpage items
const deleteSermon = async (req, res) => {
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
    const sermonData = await sermonSchema.findOneAndDelete(
      { _id: req.params.id }, // specify the user to update
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({ status: "SUCCESS", data: sermonData });
  } catch (error) {
    res.status(200).json({ status: "FAILED", error: error.message });
  }
};
module.exports = { updateSermon, postSermon, getSermon, deleteSermon };
