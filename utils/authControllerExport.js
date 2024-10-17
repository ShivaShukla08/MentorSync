// index.js
const login = require('../Controllers/AuthControllers/loginUser');
const authorizeRole = require('../controllers/authcontrollers/authorizeRole');
const logout = require('../controllers/authcontrollers/logout');
const modifyPassword = require('../controllers/authcontrollers/modifyPassword');
const requestPasswordReset = require('../controllers/authcontrollers/requestPasswordReset');
const updatePassword = require('../controllers/authcontrollers/updatePassword');
const verifyToken = require('../Controllers/AuthControllers/verifyToken');


module.exports = {
  login,
  authorizeRole,
  logout,
  modifyPassword,
  requestPasswordReset,
  updatePassword,
  verifyToken,
};

