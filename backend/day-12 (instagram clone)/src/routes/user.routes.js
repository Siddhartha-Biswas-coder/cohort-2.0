const express = require("express");
const userControler = require("../controllers/user.controller.js");
const identifyUser = require("../middlewares/auth.middleware.js");

const userRouter = express.Router();

/**
 * @route POST /api/users/follow/:username
 * @description Follow a user
 * @access Private
 */
userRouter.post(
  "/follow/:username",
  identifyUser,
  userControler.followUserController,
);

/**
 * @route POST /api/users/follow/accept:username
 * @description user ( followee ) accepts the follow from a user ( follower )
 * @access Private
 */
userRouter.patch(
  "/follow/accept/:requestId",
  identifyUser,
  userControler.acceptFollowRequestController,
);

/**
 * @route POST /api/users/follow/reject/:username
 * @description user ( followee ) rejects the follow from a user ( follower )
 * @access Private
 */
userRouter.patch(
  "/follow/reject/:requestId",
  identifyUser,
  userControler.rejectFollowRequestController,
);

/**
 * @route POST /api/users/unfollow/:username
 * @description UnFollow a user
 * @access Private
 */
userRouter.post(
  "/unfollow/:username",
  identifyUser,
  userControler.unFollowUserControler,
);

module.exports = userRouter;
