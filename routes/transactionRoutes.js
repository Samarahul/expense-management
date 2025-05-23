const express=require('express')
const { addTransaction, getAllTransaction,editTransaction,deleteTransaction } = require('../controllers/transactionCtrl')
 
//router object
const router=express.Router()

//routes 
//Add transaction POST Method
router.post("/add-transaction",addTransaction)
//Edit transaction POST Method
router.post("/edit-transaction",editTransaction)

//delete transaction
router.post("/delete-transaction",deleteTransaction)

//get transactions
router.post("/get-transaction",getAllTransaction);

module.exports=router;