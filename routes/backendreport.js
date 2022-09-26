const path = require('path');
const express = require('express');
const router = express.Router();
const userauthentication = require('../middleware/auth')
const backendreport = require('../controllers/backendreport');

//const token = localStorage.getItem("token")
router.get('/backendreport',userauthentication.authenticate,backendreport.backendreport)



module.exports = router








