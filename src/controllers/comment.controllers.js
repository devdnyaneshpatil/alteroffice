const CustomError = require("../utils/customError");
const isValidData = require("../utils/dataValidator");
const postContext = require("../db/context/post.context");
const commentContext = require("../db/context/comment.context");

const createCommentController = async (req, res, next) => {
  const { postId, text } = req.body;
  try {
    const validate = isValidData(req.body, ["postId", "text"]);
    if (validate !== true) {
      const err = new CustomError(validate, 400);
      return next(err);
    }
    const isPostExist = await postContext.getPostByPostId(postId);
    if (!isPostExist) {
      const err = new CustomError(
        `Post not found with post id:-${postId}`,
        404
      );
      return next(err);
    }
    const commentObj = {
      userId: req.userId,
      postId,
      text,
    };
    const newComment = await commentContext.createComment(commentObj);
    return res
      .status(201)
      .json({ msg: "Comment added successfully", newComment });
  } catch (error) {
    const err = new CustomError(`Internal Server Error:-${error.message}`, 500);
    return next(err);
  }
};

const replyToCommentController = async (req, res, next) => {
  const { commentId, postId, text } = req.body;
  try {
    const validate = isValidData(req.body, ["postId", "commentId","text"]);
    if (validate !== true) {
      const err = new CustomError(validate, 400);
      return next(err);
    }
    const isPostExist = await postContext.getPostByPostId(postId);
    if (!isPostExist) {
      const err = new CustomError(
        `Post not found with post id:-${postId}`,
        404
      );
      return next(err);
    }
    const isCommentExist = await commentContext.getCommentByCommentId(commentId)
    if (!isCommentExist) {
      const err = new CustomError(
        `Comment not found with comment id:-${commentId}`,
        404
      );
      return next(err);
    }
    const replyObj = {
      postId,
      parentCommentId: commentId,
      userId: req.userId,
      text,
    };
    const newReply = await commentContext.createComment(replyObj);
    const parentComment = await commentContext.getCommentByCommentId(commentId);
    parentComment.replies.push(newReply._id);
    await parentComment.save();
    return res.status(200).json({ msg: "Reply added successfully", newReply });
  } catch (error) {
    const err = new CustomError(`Internal Server Error:-${error.message}`, 500);
    return next(err);
  }
};

const getCommentsController = async (req, res, next) => {
  const { postId } = req.params;
  const sortBy = req.query.sortBy || 'createdAt';
  const sortOrder = req.query.sortOrder || 'desc';
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 2;

  try {
    const isPostExist = await postContext.getPostByPostId(postId);
    if (!isPostExist) {
      const err = new CustomError(
        `Post not found with post id:-${postId}`,
        404
      );
      return next(err);
    }
    const comments = await commentContext.getAllComments(
      postId,
      page,
      limit,
      sortBy,
      sortOrder
      );
      return res.status(200).json({data:comments})
  } catch (error) {
    const err = new CustomError(`Internal Server Error:-${error.message}`, 500);
    return next(err);
  }
};

const expandCommentsController = async (req, res, next) => {
  const { postId, commentId } = req.params;
  const sortBy = req.query.sortBy || 'createdAt';
  const sortOrder = req.query.sortOrder || 'desc';
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 2;

  try {
    const isPostExist = await postContext.getPostByPostId(postId);
    if (!isPostExist) {
      const err = new CustomError(`Post not found with post id: ${postId}`, 404);
      return next(err);
    }

    const isParent = await commentContext.getParentComment(commentId)
    if (!isParent) {
      const err = new CustomError('Please provide parent comment id', 400)
      return next(err)
    }

    const commentData = await commentContext.expandComment(
      postId,
      commentId,
      sortBy,
      sortOrder,
      page,
      limit
    );

    return res.status(200).json({ data: commentData });
  } catch (error) {
    const err = new CustomError(`Internal Server Error: ${error.message}`, 500);
    return next(err);
  }
};


module.exports = {
  createCommentController,
  replyToCommentController,
    getCommentsController,
  expandCommentsController
};
