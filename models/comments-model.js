const connection = require("../db/connection");

exports.updateCommentById = ({ inc_votes, comment_id }) => {
  return connection
    .select("*")
    .from("comments")
    .where("comment_id", "=", comment_id)
    .increment("votes", inc_votes)
    .returning("*");
};
