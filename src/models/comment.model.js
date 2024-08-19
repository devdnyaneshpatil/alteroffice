const mongoose = require("mongoose");
const defaultPaginate=require("mongoose-paginate-v2")

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "post", required: true },
  parentCommentId: { type: mongoose.Schema.Types.ObjectId, ref: "comment", default: null },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
});

commentSchema.plugin(defaultPaginate);

const Comment = mongoose.model("comment", commentSchema);

module.exports=Comment
