const path = require('path');

const express = require('express');

const forgetpass = require('../controllers/forgetpass');

const router = express.Router();


router.post('/forgetpass',forgetpass.forgetpass)
module.exports = router