const mongoose = require('mongoose');
const presentationGroup = require('../models/PresentationGroupsModel');

exports.isGroupAdmin = async (req, res, next) => {

    try{
        const userId = req.user._id.toString();
        const groupDetail = req.userGroup;
    
        if (groupDetail) {
            // Check if user is an admin or not
            let isAdmin = groupDetail.role.admin.some(adminId => {
                //  return userId === adminId.toString();     
                 return userId == adminId;
            });
            
            // if user are Admin then move to next middleware
            if (isAdmin) {
                return next()
            }
        }
    
        return res.status(401).json({
            status: 'fail',
            message: "You don't have the permissions to access Group Admin tasks. Please contact your admin for further assistance.",
            errorCode: 'UNAUTHORIZED_ACCESS'
        });
    }
    catch(error)
    {
        res.status(500).json({
            status: 'error',
            message: error,
        });
    }
   
};