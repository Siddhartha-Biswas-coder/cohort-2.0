const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller.js");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middlewares/auth.middleware.js");

/**
 * @route POST /api/posts [protected]
 * @description Create a post with the content and image (optional) provided in the request body. This post should be associated with the user that the request come from
 */

postRouter.post(
  "/",
  upload.single("image"),
  identifyUser,
  postController.createPostController,
);

/**
 * @route GET /api/posts/ [protected]
 * @description Get all the posts created by the user that the request come from also return the total number of posts created by the user
 */

postRouter.get("/", identifyUser, postController.getPostController);

/**
 * @route  GET api/posts/details/:postid
 * @description return an detail about specific post with the id, also check whether the post belongs to the user that is request come from
 */

postRouter.get(
  "/details/:postId",
  identifyUser,
  postController.getPostDetailsController,
);

/**
 * @route POST /api/posts/likes/:postId
 * @description like a post with the id provided in the request params
 */

postRouter.post(
  "/likes/:postId",
  identifyUser,
  postController.likePostController,
);

module.exports = postRouter;
