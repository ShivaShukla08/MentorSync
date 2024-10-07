const mongoose = require('mongoose');
const studentDetail = require('../models/StudentDetailModel')
const presentationGroup = require('../models/PresentationGroupsModel');

exports.UserLoginSuccessfull = async (req, res, next) => {
    const user = await studentDetail.findOne({ 'sapId': '500086' });
    req.user = user;
    return next();
}

exports.finalcontrollerfunctions = async (req, res) => {
    const data = req.user;
    res.status(404).json({
        status: 'Success', data
    });
}