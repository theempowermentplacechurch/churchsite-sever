const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const EventSchema = require("../Schema/Eventschema");
const Userschema = require("../Schema/Userschema");

const getEventpage = async (req, res) => {
  try {
    const eventData = await EventSchema.find({});
    res.status(200).json({ status: "SUCCESS", data: eventData });
  } catch (error) {
    res.status(200).json({ status: "FAILED", error: error.message });
  }
};

// post about page items
const postEventpageItems = async (req, res) => {
  const { bannerimage, title, series, date, details } = req.body;

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

    const eventtData = new EventSchema({
      bannerimage,
      title,
      series,
      date,
      details,
    });

    await eventtData.save();
    res.status(200).json({ status: "SUCCESS", data: eventtData });
  } catch (error) {
    res.status(500).json({ status: "FAILED", error: error.message });
  }
};

// update aboutpage items
const updateEventpageItems = async (req, res) => {
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
    const aboutData = await EventSchema.findOneAndUpdate(
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
const deleteEventpageItems = async (req, res) => {
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
    const aboutData = await EventSchema.findOneAndDelete(
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
  getEventpage,
  postEventpageItems,
  updateEventpageItems,
  deleteEventpageItems,
};
