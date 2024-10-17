const express = require("express");
const router = express.Router();

const authcontroller = require('../utils/authControllerExport');

router
.route('/login')
.post(authcontroller.login)

module.exports = router;