/**
 * reuire models
 */
const postModel = require("../models/post.model.js");
const likeModel = require("../models/like.model.js");

const ImageKit = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,

  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,

  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function createPostController(req, res) {
  if (!req.file) {
    return res.status(400).json({
      message: "Image is required",
    });
  }

  const safeFileName = `${Date.now()}-${req.file.originalname.replace(/\s+/g, "-")}`;

  const file = await imageKit.files.upload({
    file: await ImageKit.toFile(Buffer.from(req.file.buffer), safeFileName),

    fileName: safeFileName,

    folder: "Cohort-2-insta-clone-post",
  });

  const post = await postModel.create({
    caption: req.body.caption,

    imgUrl: `${process.env.IMAGEKIT_URL_ENDPOINT}/tr:w-1000${file.filePath}`,

    user: req.user.id,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
}

async function getPostController(req, res) {
  const userId = req.user.id;

  const posts = await postModel.find({
    user: userId,
  });

  res.status(200).json({
    message: "Posts fetched successfully",
    posts,
  });
}

async function getPostDetailsController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const isValidUser = post.user.toString() === userId;

  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden Content",
    });
  }

  return res.status(200).json({
    message: "Post fetched successfuly",
    post,
  });
}

async function likePostController(req, res) {
  const postId = req.params.postId;
  const username = req.user.username;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const isPostAlreadyLiked = await likeModel.findOne({
    postId: postId,
    user: username,
  });

  if (isPostAlreadyLiked) {
    return res.status(409).json({
      message: "Post is already liked",
    });
  }

  const like = await likeModel.create({
    postId: postId,
    user: username,
  });

  res.status(201).json({
    message: "Post liked successfully",
  });
}
async function unlikePostController(req, res) {
  const postId = req.params.postId;
  const username = req.user.username;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const isPostLiked = await likeModel.findOne({
    postId: postId,
    user: username,
  });

  if (!isPostLiked) {
    return res.status(400).json({
      message: "Post is not liked",
    });
  }

  await likeModel.findByIdAndDelete({
    _id: isPostLiked._id,
  });

  res.status(200).json({
    message: "Post unliked successfully",
  });
}

async function getFeedController(req, res) {
  try {
    const user = req.user;

    const posts = await postModel
      .find()
      .sort({ _id: -1 })
      .populate("user")
      .lean();

    const updatedPosts = await Promise.all(
      posts.map(async (post) => {
        const isLiked = await likeModel.findOne({
          user: user.username,
          postId: post._id,
        });

        post.isLiked = !!isLiked;

        return post;
      }),
    );

    res.status(200).json({
      message: "Post fetched successfully",
      posts: updatedPosts,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController,
  unlikePostController,
  getFeedController,
};
