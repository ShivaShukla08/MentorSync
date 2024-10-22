const mongoose = require('mongoose');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const User = require('../../models/UserModel');
const { createSendToken } = require('./issueTokens');

const updatePassword = catchAsync(async (req, res, next) => {
     
    let userId;
    // if user is student
    if(req.role === 'student'){
      userId = req.user.sapId;
    }else if(req.role === 'reacher'){  // if user is teacher
      userId = req.user.tid;
    }else{  // if user is admin
    //   userId = req.user.adminId;
    }

    //Get user from userTables
    const user = await User.findOne({ userId: userId }).select('+password');

    // check if Posted current password is incorrect
    if (!user || !await user.correctPassword(req.body.oldPassword, user.password)) {
        return next(new AppError('Incorrect old password', 404));
    }

    // if all correct then, password upadate.
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.changedPasswordAfter = Date.now();
    await user.save();

    // after updated password successfully, send new JWT Token
    createSendToken(res, user.userId);

    res.status(200).json({status: 'success', message: 'Password updated successfully'});

});

module.exports = updatePassword;