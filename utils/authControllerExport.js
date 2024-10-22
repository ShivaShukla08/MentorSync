// index.js
const login = require('../Controllers/AuthControllers/loginUser');
const authorizeRole = require('../controllers/authcontrollers/authorizeRole');
const logout = require('../controllers/authcontrollers/logout');
const resetPassword = require('../Controllers/AuthControllers/resetPassword');
const requestPasswordReset = require('../controllers/authcontrollers/requestPasswordReset');
const updatePassword = require('../Controllers/AuthControllers/updatePassword');
const authorizeToken = require('../Controllers/AuthControllers/verifyToken');


module.exports = {
  login,
  authorizeRole,
  logout,
  resetPassword,
  requestPasswordReset,
  updatePassword,
  authorizeToken,
};

