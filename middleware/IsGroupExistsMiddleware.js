const mongoose = require('mongoose');
const presentationGroup = require('../models/PresentationGroupsModel');
const isValidObjectId = require('../utils/verifyObjectId');

exports.isGroupExists = async (req, res, next) => {

    const groupId = req.params.groupId;
    if(!isValidObjectId(groupId)){
        return res.status(404).json({
            status: "fail",
            message: "The page you are looking for does not exist. Please check the URL."
        });  
    }

    const groupDetail = await presentationGroup.findOne({_id : groupId});

    // check if groupId does't exits
    if(!groupDetail){
        return res.status(404).json({
            status: "fail",
            message: "Group does't exists!."
        });
    };

    // add group details in req.paramDetail.group 
    const paramDetails = {group: groupDetail};
    req.paramDetails = paramDetails;

    return next();
};
