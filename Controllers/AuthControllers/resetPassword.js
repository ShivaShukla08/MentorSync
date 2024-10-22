const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const User = require('../../models/UserModel');
const { createSendToken } = require('./issueTokens');

const resetPassword = catchAsync(async (req, res, next) => {

    const token = req.query.token;
    const key = req.query.key;

    if (!token || !key) {
        return next(new AppError('Invalid or expired reset link', 400));
    };

    let userData;
    try {
        userData = (jwt.verify)(token, process.env.JWT_RESET_SECRET);
    }catch(err){
        return next(new AppError('Invalid or expired reset link', 400));
    };

    const userDetail = await User.findOne({_id: userData.id, resetPasswordToken: key});

    if (!userDetail) {
        return next(new AppError('Invalid or expired reset link', 400));
    };

    // if all correct then, password upadate.
    userDetail.password = req.body.password;
    userDetail.passwordConfirm = req.body.passwordConfirm;
    userDetail.passwordChangedAt = Date.now();
    userDetail.resetPasswordToken = undefined
    await userDetail.save();

    // // after updated password successfully, send new JWT Token
    createSendToken(res, userDetail.userId);

    res.status(200).json({ status: 'success', message: 'Password updated successfully' });

});

module.exports = resetPassword;