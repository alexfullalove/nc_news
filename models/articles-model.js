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

exports.updateArticleById = ({ inc_votes = 0, article_id }) => {
  return connection
    .select("*")
    .from("articles")
    .where("article_id", "=", article_id)
    .increment("votes", +inc_votes)
    .returning("*");
};

exports.getCommentsByArticle = ({ article_id, sort_by, order }) => {
  return connection
    .select(
      "comment_id",
      "comments.votes",
      "comments.created_at",
      "comments.author",
      "comments.body"
    )
    .from("comments")
    .where("comments.article_id", "=", article_id)
    .rightJoin("articles", "articles.article_id", "comments.article_id")
    .groupBy("comments.comment_id")
    .orderBy(sort_by || "created_at", order || "desc");
};

exports.addComment = ({ article_id, username, body }) => {
  const obj = { article_id, author: username, body };
  return connection
    .select("*")
    .from("comments")
    .where("comments.article_id", "=", article_id)
    .insert(obj)
    .returning("*");
};
