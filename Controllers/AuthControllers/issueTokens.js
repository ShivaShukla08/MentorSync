const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const userModel = require('../../models/UserModel');


// create Access JWT Token
const AccessToken = (id, sessionid, role) => {
    return jwt.sign({ id: id, role: role, sessionid: sessionid }, process.env.JWT_SECRET, { expiresIn: `${process.env.JWT_SECRET_EXP}m` });
};

// create Refresh JWT Token
const RefreshToken = (id, sessionid) => {
    return jwt.sign({ id: id, sessionid: sessionid }, process.env.JWT_REFRESH_SECRET, { expiresIn: `${process.env.JWT_REFRESH_SECRET_EXP}d` });
};

// sending access and refresh JWT Token to user
exports.createSendToken = (res, user, sessionidA, sessionidR) => {
    const accessToken = AccessToken(user._id, user.role, sessionidA);
    const refreshToken = RefreshToken(user._id, user.role, sessionidR);

    // JWT Access-Token
    const accessCookies = {
        expires: new Date(
            Date.now() + parseInt(process.env.JWT_SECRET_EXP) * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Automatically set secure based on environment
    };

    // JWT Refresh-Token
    const refreshCookies = {
        expires: new Date(
            Date.now() + parseInt(process.env.JWT_REFRESH_SECRET_EXP) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Automatically set secure based on environment
    };

    // send througth cookies of Refresh-Token and Access-Token
    res.cookie('auth-jwt', accessToken, accessCookies);
    res.cookie('auth-ref-jwt', refreshToken, refreshCookies);

    // Remove password from output
    user.password = undefined;

   // Set the Bearer token in the Authorization header
   res.setHeader('Authorization', `Bearer ${accessToken}`);
};

