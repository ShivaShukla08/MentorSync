const mongoose = require('mongoose');
const studentDetail = require('../models/StudentDetailModel')
const presentationGroup = require('../models/PresentationGroupsModel');

exports.UserLoginSuccessfull = async (req, res, next) => {
    const user = await studentDetail.findOne({ 'sapId': '500086' }).populate('groupId');
    req.userGroup = (user.groupId);
    let gId;
    if(user.groupId){
        gId = (user.groupId._id);
    }
    user.groupId = gId;
    req.user = user;

   console.log("Add User Data after Login-successful");

    return next();
}

exports.finalcontrollerfunctions = async (req, res) => {
    const data = req.user;
    res.status(404).json({
        status: 'Success', data
    });
}