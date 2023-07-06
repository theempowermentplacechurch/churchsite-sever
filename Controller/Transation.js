const transactionSchema = require("../Schema/Transaction");
const axios = require("axios");
const jwt = require("jsonwebtoken");

// post transaction
const postTransaction = async (req, res) => {
  try {
    const {
      name,
      email,
      phonenumber,
      purpose,
      amount,
      paymentmethod,

      note,
    } = req.body;

    const transactionDetails = {
      name,
      email,
      phonenumber,
      purpose,
      amount,
      paymentmethod,
      note,
    };

    const headers = {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    };

    const data = {
      email: email,
      amount: amount * 100,
      currency: "NGN",
      // Replace "NGN" with the desired currency code
      metadata: {
        name: name,
        products: transactionDetails,
      },
    };

    const paystackRes = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      data,
      { headers }
    );

    if (paystackRes.data.status !== true) {
      return res.status(400).json({
        status: "FAILED",
        message: "Failed to initialize transaction.",
      });
    }

    const Transaction = new transactionSchema({
      name,
      email,
      phonenumber,
      purpose,
      amount,
      paymentmethod,
      note,
      paystackRef: paystackRes.data.data.reference,
      authorization_url: paystackRes.data.data.authorization_url,
    });

    await Transaction.save();
    res.status(200).json({
      status: "SUCCESS",
      data: {
        Transaction,
        authorization_url: paystackRes.data.data.authorization_url,
        reference: paystackRes.data.data.reference,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

// get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "FAILED",
        message: "No token provided. You don't have access to this data.",
      });
    }

    const token = auth.split(" ")[1];
    const verifyToken = jwt.verify(token, process.env.SECRET);

    if (!verifyToken) {
      return res.status(401).json({
        status: "ERROR",
        message: "Invalid token access.",
      });
    }

    const allTransaction = await transactionSchema.find({});

    res.status(200).json({ status: "SUCCESS", data: allTransaction });
  } catch (error) {
    throw new Error(error.message);

    // res.status(400).json({ status: "FAILED", message: error });
  }
};

// update transaction status
const updateTransaction = async (req, res) => {
  try {
    // update transaction
    const transaction = await transactionSchema.findOneAndUpdate(
      { _id: req.params.id }, // specify the user to update
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({ status: "SUCCESS", data: transaction });
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = { postTransaction, getAllTransactions, updateTransaction };
