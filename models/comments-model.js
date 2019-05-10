const connection = require("../db/connection");

exports.updateCommentById = ({ inc_votes = 0, comment_id }) => {
  return connection
    .select("*")
    .from("comments")
    .where("comment_id", "=", comment_id)
    .increment("votes", +inc_votes)
    .returning("*");
};

exports.deleteComment = ({ comment_id }) => {
  return connection
    .select("comments.*")
    .from("comments")
    .where("comment_id", "=", comment_id)
    .del()
    .then(result => {
      return result;
    });
};
