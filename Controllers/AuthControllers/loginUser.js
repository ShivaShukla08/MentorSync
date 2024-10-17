const mongoose = require('mongoose');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const userModel = require('../../models/UserModel');
const {createSendToken} = require('./issueTokens')

const login = catchAsync(async(req, res, next) => {
   
        const userId = req.body.userId;
        const password = req.body.password;

        // 1) check if userId and password exit
        if (!userId || !password) {
            return next(new AppError('Please provide userId and password!', 400));
        };

        // 2) check if user exits and password is correct
        const userData = await userModel.findOne({ userId: userId }).select('+password');

        if (!userData || !await userData.correctPassword(password, userData.password)) {
            return next(new AppError('Incorrect userId or password!', 401));
        }

        // if everthing true, send token to user
        createSendToken(res, userData);

        res.status(200).json({
            status: 'Success',
            message: "Login Successfully",
            data: userData
        });

});

module.exports = login;