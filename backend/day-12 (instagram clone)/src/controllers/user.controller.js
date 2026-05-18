const followModel = require("../models/follow.model.js");
const userModel = require("../models/user.model.js");

async function followUserController(req, res) {
  const followerUserName = req.user.username;
  const followeeUserName = req.params.username;

  const isFolloweeExist = await userModel.findOne({
    username: followeeUserName,
  });

  if (!isFolloweeExist) {
    return res.status(404).json({
      message: "User you are trying to follow does not exist",
    });
  }

  if (followerUserName === followeeUserName) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }

  const isAlreadyfollowing = await followModel.findOne({
    followee: followeeUserName,
    follower: followerUserName,
  });

  if (isAlreadyfollowing) {
    return res.status(200).json({
      message: `You are already following ${followeeUserName}`,
      follow: isAlreadyfollowing,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUserName,
    followee: followeeUserName,
  });

  res.status(201).json({
    message: `You are now following ${followeeUserName}`,
    follow: followRecord,
  });
}

async function unFollowUserControler(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isFolloweeExist = await userModel.findOne({
    username: followeeUsername,
  });

  if (!isFolloweeExist) {
    return res.status(404).json({
      message: `${followeeUsername} does not exist`,
    });
  }

  if (followeeUsername === followerUsername) {
    return res.status(400).json({
      message: "Invalid request",
    });
  }

  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!isUserFollowing) {
    return res.status(200).json({
      message: `You are not following ${followeeUsername}`,
    });
  }

  await followModel.findByIdAndDelete(isUserFollowing._id);

  res.status(200).json({
    message: `You unfollowed ${followeeUsername}`,
  });
}

async function acceptFollowRequestController(req, res) {
  const requestId = req.params.requestId;

  const request = await followModel.findById(requestId);

  if (!request) {
    return res.status(404).json({
      message: "Follow request not found",
    });
  }

  if (request.followee !== req.user.username) {
    return res.status(403).json({
      message: "Unauthorized access",
    });
  }

  if (request.status !== "pending") {
    return res.status(409).json({
      message: `Follow request already ${request.status}`,
    });
  }

  request.status = "accepted";

  await request.save();

  res.status(200).json({
    message: "Followrequest accepted",
  });
}

async function rejectFollowRequestController(req, res) {
  const requestId = req.params.requestId;

  const request = await followModel.findById(requestId);

  if (!request) {
    return res.status(404).json({
      message: "Follow request not found",
    });
  }

  if (request.followee !== req.user.username) {
    return res.status(403).json({
      message: "Unauthorized access",
    });
  }

  if (request.status !== "pending") {
    return res.status(409).json({
      message: `Follow request already ${request.status}`,
    });
  }

  request.status = "rejected";

  await request.save();

  res.status(200).json({
    message: "Followrequest rejected",
  });
}
module.exports = {
  followUserController,
  unFollowUserControler,
  acceptFollowRequestController,
  rejectFollowRequestController,
};
