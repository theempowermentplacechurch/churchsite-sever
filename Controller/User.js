const userSchema = require("../Schema/Userschema.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Userschema = require("../Schema/Userschema.js");

// register user

const registerUser = async (req, res) => {
  const {
    addadminpageaccess,
    eventpageaccess,
    financepageaccess,
    homepageaccess,
    ministerpageaccess,
    password,
    sermonpageaccess,
    useremail,
    username,
    userphonenumber,
    position,
  } = req.body;

  // check if any user in the database already use the email entered in
  const existingUser = await userSchema.findOne({
    useremail: useremail,
  });

  // if the email is already exits cancel the registration
  if (existingUser) {
    return res.status(400).json({
      status: "FAILED",
      error: `${useremail} has been taken by another user`,
    });
  }

  // If the email has not been used the proceed
  try {
    // using bcrypt to encrypt the password
    const rounds = 10;
    const hashPassword = await bcrypt.hash(password, rounds);

    //   return all the values entered and store in the data base and add verified status for email verification
    let user = await userSchema.create({
      username,
      useremail: useremail,
      userphonenumber,
      position,
      password: hashPassword,
      addadminpageaccess,
      eventpageaccess,
      financepageaccess,
      homepageaccess,
      ministerpageaccess,
      sermonpageaccess,
    });

    //   save the details to database but also send OTP to the user email
    await user.save();
    res.status(200).json({ status: "SUCCESS", data: user });
  } catch (error) {
    throw Error(error.message);
  }
};

// log in as an admin
const loginUser = async (req, res) => {
  try {
    // get the email and password from user input
    const { useremail, password } = req.body;

    if (!useremail || !password) {
      return res
        .status(400)
        .json({ status: "FAILED", message: "Enter email and password" });
    }
    // check if user with that email exist
    const user = await userSchema.findOne({ useremail });

    if (!user) {
      return res.status(400).json({
        status: "FAILED",
        message: `${useremail} Email is not asigned to a valide user, Kindly register`,
      });
    }
    // if the email is not found or the password doesnt match return error

    // encrypt the password
    const validPassword = await bcrypt.compare(password, user.password);

    // if user have been blocked
    if (user.block === true) {
      return res.status(403).json({
        status: "ERROR",
        message: "You have been blocked from accessing this application",
      });
    }

    // if the email is not found or the password doesnt match return error
    if (!user || !validPassword) {
      return res
        .status(400)
        .json({ status: "FAILED", message: "Invalid email or password" });
    }

    // if it matches then create a token with the details
    const userToken = {
      username: user.username,
      id: user.id,
    };

    // const token = jwt.sign(userToken, process.env.SECRET, { expiresIn: "1d" });
    const token = jwt.sign(userToken, process.env.SECRET);

    res.status(200).json({ status: "SUCCESS", data: token });
  } catch (error) {
    throw Error(error.message);
  }
};

// GET ALL SUCESSFULLY REGISTERED USERS
const allUsers = async (req, res) => {
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

    const users = await userSchema.find({});

    res.status(200).json({ status: "SUCCESS", data: users });
  } catch (error) {
    throw Error(error.message);
  }
};

//FETCH SINGLE TRANSACTION
const getSingleUser = async (req, res) => {
  try {
    // check if the user has a successful token lopgin
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "FAILED",
        message: "No token provided, You dont have access to this data",
      });
    }

    // split token from bearer and get real value to verify
    const token = auth.split(" ")[1];
    const verifyToken = jwt.verify(token, process.env.SECRET);

    if (!verifyToken) {
      return res
        .status(401)
        .json({ status: "ERROR", message: "Invalide token access" });
    }
    // get all users the the database
    const singleUser = await userSchema.findById(req.params.id);

    // console.log(transaction);
    res.status(200).json({ status: "SUCCESS", data: singleUser });
  } catch (error) {
    throw Error(error.message);
  }
};

// GET SIGNED IN USER DETAILS
const getSessionUser = async (req, res) => {
  try {
    // check if the user has a successful token login
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "FAILED",
        message: "No token provided, You dont have access to this data",
      });
    }

    // split token from bearer and get real value to verify
    const token = auth.split(" ")[1];
    const verifyToken = jwt.verify(token, process.env.SECRET);

    if (!verifyToken) {
      return res
        .status(401)
        .json({ status: "ERROR", message: "Invalide token access" });
    }

    // get the user with the specified ID from the database
    const users = await userSchema.findOne({ _id: verifyToken.id });
    // console.log(users);
    await users.save();
    res.status(200).json({ status: "SUCCESS", data: users });
  } catch (error) {
    throw Error(error.message);
  }
};

// update user position to give access
const updateUserPosition = async (req, res) => {
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
    const user = await userSchema.findOneAndUpdate(
      { _id: req.params.id }, // specify the user to update
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({ status: "SUCCESS", data: user });
  } catch (error) {
    throw new Error(error.message);
  }
};
// DELETE USER
const deleteUser = async (req, res) => {
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
      return res.status(401).json({
        status: "ERROR",
        message: "Invalid token access",
      });
    }

    await userSchema.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ status: "SUCCESS", message: "User deleted successfully" });
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  registerUser,
  loginUser,
  allUsers,
  getSingleUser,
  getSessionUser,
  updateUserPosition,
  deleteUser,
};
