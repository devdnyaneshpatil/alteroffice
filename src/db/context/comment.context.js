const { Comment } = require("../../models/index");
const mongoose = require("mongoose");
const createComment = async (payload) => {
  const comment = new Comment(payload).save();
  return comment;
};

const getCommentByCommentId = async (id) => {
  const comment = await Comment.findOne({ _id: id });
  return comment;
};

const getAllComments = async (postId, page, limit, sortBy, sortOrder) => {
  const comments = await Comment.paginate(
    { postId, parentCommentId: null },
    {
      page,
      limit,
      sort: {
        [sortBy]: sortOrder,
      },
      populate: {
        path: "replies", // Populate the 'replies' field
        populate: { path: "replies" }, // If you want to populate nested replies
        options: { sort: { createdAt: -1 }, limit: 2 }, // Get the two latest replies
        // select: "text createdAt",
      },
    }
  );
  return comments;
};

const expandComment = async (postId,commentId) => {
    const comments = await Comment.paginate(
    { postId, _id: commentId },
    {
      populate: {
        path: "replies", // Populate the 'replies' field
        populate: { path: "replies" }, // If you want to populate nested replies
        options: { sort: { createdAt: -1 }}, // Get the two latest replies
        // select: "text createdAt",
      },
    }
    );
    return comments
}

module.exports = { createComment, getCommentByCommentId, getAllComments,expandComment };
