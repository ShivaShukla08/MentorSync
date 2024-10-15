const presentationGroups = require("../../models/PresentationGroupsModel");

const updateGroupStatus = async (req, res) => {
  const groupId = req.params.groupId;
  try {
    const group = await presentationGroups.findById(groupId);
    if (group.status === "full") {
      group.status = "notFull";
    } else {
      group.status = "full";
    }

    await group.save();
    return res.status(200).json({
      status: "success",
      message: "Group status changed successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

module.exports = updateGroupStatus;