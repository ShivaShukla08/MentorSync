const presentationGroups = require('./../../models/PresentationGroupsModel');

const updateGroupStatus = async (req,res) => {
    const groupId = req.params.groupId;
    try{
        const group = await presentationGroups.findById(groupId);
        if(group.status === 'full')
        {
            console.log(group.status);
            return res.status(400).json({
                status:"fail",
                message: "Group is already marked full"
            });
        }
        else
        {
            group.status = 'full';
            await group.save();
            return res.status(200).json({
                status: 'success',
                message: 'Group marked as full successfully',
                data: {
                  groupId: group._id,
                  status: group.status,
                },
              });
        }
    }catch(error)
    {
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

module.exports = updateGroupStatus;