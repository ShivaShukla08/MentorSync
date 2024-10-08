const mongoose = require('mongoose');
const  presentationGroup = require('./../models/PresentationGroupsModel');

const isGroupFull = async function(req,res,next)
{
    const groupId = req.body.groupId;
    const isValid = mongoose.Types.ObjectId.isValid(groupId);

    if(!isValid)
    {
        return res.status(404).json({
            statuscode: 404,
            message:'grouptId is invalid',
            requestId,
        })
    }

    const detail = await presentationGroup.findOne({ _id: groupId }, 'status');
    if(detail.status == "full")
    {
        return res.status(409).json({
            statuscode:409,          // 409 => conflict 
            message: "Invalid request!, because Group is full"
        })
    }
    
    return res.status(200).json({
        statuscode:200,          
        message: "Successfull"
    })

    next();
}

module.exports = isGroupFull;