const express = require("express");
const router = express.Router();

const {
  postTransaction,
  getAllTransactions,
  updateTransaction,
} = require("../Controller/Transation");

router.post("/posttransaction", postTransaction);
router.get("/getalltransactions", getAllTransactions);
router.patch("/updatetransaction/:id", updateTransaction);

module.exports = router;
