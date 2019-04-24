const connection = require("../db/connection");

exports.getArticles = () => {
  return connection("articles")
    .select("articles.*")
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .groupBy("articles.article_id")
    .count("comments.comment_id AS comment_count");
};

// author which is the username from the users table
// title
// article_id
// body
// topic
// created_at
// votes
