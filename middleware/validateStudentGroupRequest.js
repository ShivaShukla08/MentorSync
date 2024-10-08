const mongoose = require('mongoose');
const requestTable = require('./../models/RequestTableGroupAndStudentModel');


const validateGroupStudentRequest = async function(req,res,next){
    try{
        const requestId = req.body.requestId;          // Student_id and group_id param
        console.log(req.params)
        console.log(req.query);
        const isValid = mongoose.Types.ObjectId.isValid(requestId);
        console.log(requestId);

        if(!isValid)
        {
            return res.status(404).json({
                statuscode: 404,
                message:'requestId is invalid',
                requestId,
            })
        }

        const request = await requestTable.findById(requestId); 

        if(!request)
        {
            return res.status(404).json({
                statuscode: 404,
                message:'Request Not found',
                requestId,
                suggestion: 'Please check if the request ID is correct and try again.'
            })
        }

        return res.status(200).json({
            statuscode: 200,
            message:'Request found',
            requestId,
        })
        next();
    }
    catch(error)
    {
        res.status(500).json({ message: 'Server error' });
    }
}

const validateGroupStudentRequests = async function(req,res,next){
    try{
        const requestId = req.body.requestId;          // Student_id and group_id param
        console.log(req.params)
        console.log(req.query);
        const isValid = mongoose.Types.ObjectId.isValid(requestId);
        console.log(requestId);

        if(!isValid)
        {
            return res.status(404).json({
                statuscode: 404,
                message:'requestId is invalid',
                requestId,
            })
        }

        const request = await requestTable.findById(requestId); 

        if(!request)
        {
            return res.status(404).json({
                statuscode: 404,
                message:'Request Not found',
                requestId,
                suggestion: 'Please check if the request ID is correct and try again.'
            })
        }

        return res.status(200).json({
            statuscode: 200,
            message:'Request found',
            requestId,
        })
        next();
    }
    catch(error)
    {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = validateGroupStudentRequest;