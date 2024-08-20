const { Comment } = require("../../models/index");
const createComment = async (payload) => {
  const comment = new Comment(payload).save();
  return comment;
};

const getCommentByCommentId = async (id) => {
  const comment = await Comment.findOne({ _id: id });
  return comment;
};

const getParentComment = async (id) => {
  const parentComment = await Comment.findOne({ _id: id, parentCommentId: null })
  return parentComment
}

const getAllComments = async (postId, page, limit, sortBy, sortOrder) => {
  const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };
  const comments = await Comment.find({ postId, parentCommentId: null })
    .populate({
      path: "replies",
      select: "createdAt text",// Populate the 'replies' field
      options:{limit:2},
      populate: { path: "replies" ,select:"createdAt text"},
       // If you want to populate nested replies
    })
    .lean();

  comments.forEach((comment) => {
    comment.repliesCount = comment.replies.length;
  });

  // If sorting by repliesCount, sort after fetching the data

  if (sortBy === "repliesCount") {
    comments.sort((a, b) =>
      sortOrder === "asc"
        ? a.repliesCount - b.repliesCount
        : b.repliesCount - a.repliesCount
    );
  } else {
    comments.sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a[sortBy]) - new Date(b[sortBy])
        : new Date(b[sortBy]) - new Date(a[sortBy])
    );
  }
  // Step 4: Paginate the sorted comments manually
  const startIndex = (page - 1) * limit;
  const paginatedComments = comments.slice(startIndex, startIndex + limit);

  for (const comment of paginatedComments) {
    comment.totalReplies = await Comment.countDocuments({
      parentCommentId: comment._id,
    });
    delete comment.repliesCount;
  }

  // Step 5: Return the paginated comments with total count and pagination info
  return {
    docs: paginatedComments,
    totalDocs: comments.length,
    limit,
    totalPages: Math.ceil(comments.length / limit),
    page,
    pagingCounter: startIndex + 1,
    hasPrevPage: page > 1,
    hasNextPage: startIndex + limit < comments.length,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: startIndex + limit < comments.length ? page + 1 : null,
  };
};

const expandComment = async (
  postId,
  commentId,
  sortBy,
  sortOrder,
  page,
  limit
) => {
  const comment = await Comment.findOne({
    postId,
    parentCommentId: null,
    _id: commentId,
  })
    .populate({
      path: "replies", // Populate the 'replies' field
      select:"text createdAt",
      populate: {
        path: "replies",
        select:"text createdAt"
      }, // If you want to populate nested replies
    })
    .lean();
  comment.replies.forEach((reply) => {
    reply.repliesCount = reply.replies.length;
  });
  if (sortBy === "repliesCount") {
    comment.replies.sort((a, b) =>
      sortOrder === "asc"
        ? a.repliesCount - b.repliesCount
        : b.repliesCount - a.repliesCount
    );
  } else {
    comment.replies.sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a[sortBy]) - new Date(b[sortBy])
        : new Date(b[sortBy]) - new Date(a[sortBy])
    );
  }
  const startIndex = (page - 1) * limit;
  const paginatedReplies = comment.replies.slice(
    startIndex,
    startIndex + limit
  );

  return {
    comment: comment.text, // Assuming you want to return the main comment text
    _id: comment._id,
    postId:comment.postId,
    paginatedReplies,
    totalReplies: comment.replies.length,
    currentPage: page,
    totalPages: Math.ceil(comment.replies.length / limit),
  };
  return comment;
};

module.exports = {
  createComment,
  getCommentByCommentId,
  getAllComments,
  expandComment,
  getParentComment
};
