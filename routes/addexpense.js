const path = require('path');

const express = require('express');

const addexpenseController = require('../controllers/addexpense');
const userauthentication = require('../middleware/auth')

const router = express.Router();


router.post('/addexpense', addexpenseController.postaddexpense);
router.get('/getexpense',userauthentication.authenticate ,addexpenseController.getaddexpense)
router.delete('/deleteexpense/:Id',addexpenseController.deleteExpenses)

//
module.exports = router 