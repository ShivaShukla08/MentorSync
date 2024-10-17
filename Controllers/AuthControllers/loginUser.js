const mongoose = require('mongoose');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const userModel = require('../../models/UserModel');
const createSendToken = require('./issueTokens')

const login = catchAsync(async(req, res, next) => {
   
        const email = req.body.email;
        const password = req.body.password;

        // 1) check if email and password exit
        if (!email || !password) {
            return next(new AppError('Please provide email and password!', 400));
        };

        // 2) check if user exits and password is correct
        const userData = await userModel.findOne({ userId: email }).select('+password');

        if (!userData || !await userData.correctPassword(password, userData.password)) {
            return next(new AppError('Incorrect email or password!', 401));
        }

        // created session_id of refreshToken and accessToken.
        const sessionidA = crypto.randomUUID().replace(/-/g, '');
        const sessionidR = crypto.randomUUID().replace(/-/g, '');

        // if everthing true, send token to user
        await createSendToken.createSendToken(res, userData, sessionidA, sessionidR);

        res.status(200).json({
            status: 'Success',
            message: "Login Successfully",
            data: userData
        });

});

module.exports = login;