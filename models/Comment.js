var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({

  title: {
    type: String
  },
  body: {
    type: String
  },
  saved: {
  	type: Boolean,
    default: false
  }
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
