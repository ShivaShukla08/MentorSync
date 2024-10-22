const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const User = require('../../models/UserModel');
const createSendToken = require('../../Controllers/AuthControllers/issueTokens');
const { Session } = require('inspector/promises');
const sendEmail = require('../../services/emailService')

const requestPasswordReset = catchAsync(async (req, res, next) => {

    //get userId from req body
    const userId = req.body.userId;
    console.log("Forget password")

    //Get user from userTables
    const user = await User.findOne({ userId: userId });

    // check if user does't exits 
    if (!user) {
        return next(new AppError("User Id does't exits, please check your UserId", 401));
    }

    //Generate the random reset token and key. save key in user Tables
    const key = crypto.randomBytes(32).toString('hex');
    await User.findOneAndUpdate({userId: userId}, {resetPasswordToken: key});

    const resetSessionId = new mongoose.Types.ObjectId();
    const resetToken =  jwt.sign({ id: user._id, resetSId: resetSessionId}, process.env.JWT_RESET_SECRET, { expiresIn: `5m` });


    // send it to user's email
    const resetURL = `${req.protocol}://${req.get(
        'host'
    )}/api/v1/auth/resetPassword?token=${resetToken}&key=${key}`;
    const message = `
    You have requested a password reset. Please click on the link below to reset your password:
    ${resetURL}`;

    await sendEmail({
        email: `${user._id}@stu.xyz.ac.in`,
        subject: 'Your password reset token (valid for 10 min)',
        message: message,
    });
  
    return res.status(200).json({
        status: 'success', 
        message: 'Reset Token sent to email', 
        resetURL     // send only for develoment env
    });

});

module.exports = requestPasswordReset;