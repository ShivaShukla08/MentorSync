const express = require("express");
const router = express.Router();

const authcontroller = require('../utils/authControllerExport');

router
.route('/login')
.post(authcontroller.login)

router
.route('/forget-password')
.post(authcontroller.requestPasswordReset);

router
.route('/reset-password')
.post(authcontroller.resetPassword);

router
.route('/update-password')
.patch(authcontroller.authorizeToken, authcontroller.updatePassword);

module.exports = router;