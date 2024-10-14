const notificationModel = require('./../../models/notificationModel');
const notificationTracker = require('./../../models/notificationTracker');

const notifyGroupMembers = async (req,res) => {
    try {

        // Step 1: Getting the all required informations like sender_id, his role and content of notification
        const senderId = req.user.id;
        const role  = req.user.role;
        const { title, content, userIds } = req.body;
    
        if (!content || !role || !Array.isArray(userIds) || userIds.length === 0) {
          return res.status(400).json({ message: 'Invalid request data' });
        }

        // Step 2: Creating new notification in notification table
        const newNotification = await notificationModel.create({
          senderId,
          title,
          content,
          role,
        });

        // Step3: Adding new notificationId in all userId's
        await Promise.all(
            userIds.map(async (userId) => {
              return await notificationTracker.findOneAndUpdate(
                { userId }, // Find the user's notification tracker
                { 
                  $addToSet: { notifications: { notificationId: newNotification._id } }, // Add new notification ID
                  $setOnInsert: { read: false } // Optional: initialize 'read' to false for new entries
                },
                { upsert: true, new: true } // Create a new document if it doesn't exist
              );
            })
          );
      
    
        res.status(201).json({
          status: 'success',
          data: {
            notification: newNotification,
          },
        });

      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
};

module.exports = notifyGroupMembers;