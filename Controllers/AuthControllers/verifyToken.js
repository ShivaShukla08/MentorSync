const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const User = require('../../models/UserModel');
const studentDetail = require('../../models/StudentDetailModel');
const teacherDeatail = require('../../models/TeacherDetailModel');
const { createSendToken } = require('./issueTokens');

const authorizeToken = catchAsync(async (req, res, next) => {
    try {
        let accessToken, refreshToken;

        // 1) Getting token and check if it's there
        if (req.headers.authorization && req.headers.authorization.includes('Bearer')) {
            accessToken = req.headers.authorization.split(' ')[1];
        } else if (req.cookies['auth-jwt']) {
            accessToken = req.cookies['auth-jwt'];
        } else if (req.cookies['auth-ref-jwt']) {
            refreshToken = req.cookies['auth-ref-jwt'];
        }

        // If neither access token nor refresh token is found
        if (!accessToken && !refreshToken) {
            return next(new AppError('You are not logged in. Please log in!', 400));
        }

        // 2) Verification of token
        let decoded;
        if (accessToken) {
            // Verify the access token
            decoded = (jwt.verify)(accessToken, process.env.jwt_SECRET);
        } else if (refreshToken) {
            // Verify the refresh token
            decoded = (jwt.verify)(refreshToken, process.env.jwt_REFRESH_SECRET);
        }

        // 3) Check if user still exists
        const currentUser = await User.findOne({ userId: decoded.id });

        if (!currentUser) {
            return next(new AppError('Your session has expired. Please log in again.', 401));
        }

        // 4) Check if the user changed the password after the JWT was issued
        // if (await currentUser.changedPasswordAfter(decoded.iat)) {
        //     return next(new AppError('User recently changed password! Please log in again.', 401));
        // }

        // Send new access and refresh tokens if the refresh token was used
        if (refreshToken) {
            // if everthing true, send token to user
            createSendToken(res, currentUser.userId, sessionidA, sessionidR);;
        }

        // Grant access to protected routes   
        // set user details in the req Object       
        setUserDetails(req, res, next, currentUser);

    } catch (err) {
        console.log(err);
        return next(new AppError('Your token is invalid. Please log in again...', 401));
    }
});


const setUserDetails = async (req, res, next, currentUser) => {
    if (currentUser.role === 'student') {
        const user = await studentDetail.findOne({ sapId: currentUser.userId }).populate('groupId');
        if (user && user.groupId) {
            req.userGroup = user.groupId;
            req.user = user;
            req.role = 'student';
        }
    } else if (currentUser.role === 'teacher') {
        const user = await teacherDetail.findOne({ tid: currentUser.userId });
        req.user = user;
        req.role = 'teacher';
    } else if (currentUser.role === 'admin') {
        req.role = 'admin';
    }

    next();
};


module.exports = authorizeToken;
