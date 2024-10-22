const mongoose = require('mongoose');
const  presentationGroup = require('./../models/PresentationGroupsModel');

const isGroupFull = async function(req,res,next)
{
    let groupId, groupDetail;
    // if groupId get into the params
    if(req.params.groupId){
     groupId = req.params.groupId;
     groupDetail = req.paramDetails.group;
    }else{
       groupId = req.user.groupId;
       groupDetail = req.userGroup;
    }
  
    if(groupDetail.status == "full" )
    {
        return res.status(409).json({
            statuscode:409,          // 409 => conflict 
            message: "Invalid request!, because Group is full"
        });
    }

    return next();
}

module.exports = isGroupFull;