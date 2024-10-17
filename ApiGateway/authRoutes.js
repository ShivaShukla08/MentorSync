const express = require("express");
const router = express.Router();

const authcontroller = require('../utils/authControllerExport');

router
.route('/login')
.post(authcontroller.login)

router
.route('/protect')
.post(authcontroller.authorizeToken, authcontroller.authorizeRole('student'))


module.exports = router;