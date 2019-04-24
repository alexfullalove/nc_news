const connection = require("../db/connection");

exports.getArticles = ({ author, topic, sort_by, order }) => {
  return connection
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .groupBy("articles.article_id")
    .count("comments.comment_id AS comment_count")
    .orderBy(sort_by || "created_at", order || "desc")
    .modify(query => {
      if (author) query.where("articles.author", "like", author);
      if (topic) query.where("articles.topic", "like", topic);
    });
};

exports.getArticleById = ({ article_id }) => {
  return connection
    .select("articles.*")
    .from("articles")
    .where("articles.article_id", "=", article_id)
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .groupBy("articles.article_id")
    .count("comments.comment_id AS comment_count");
};
