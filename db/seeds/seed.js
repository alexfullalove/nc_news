const data = require("../data/");
const { formatDate, createRef, formatData } = require("../../utils");

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("topics")
        .insert(data.topicsData)
        .returning("*");
    })
    .then(() => {
      return knex("users")
        .insert(data.usersData)
        .returning("*");
    })
    .then(() => {
      const formattedArticlesData = formatDate(data.articlesData);
      return formattedArticlesData;
    })
    .then(formattedArticlesData => {
      return knex("articles")
        .insert(formattedArticlesData)
        .returning("*");
    })
    .then(articles => {
      const commentRef = createRef(articles, "title", "article_id");
      const formattedCommentData = formatData(
        data.commentsData,
        "belongs_to",
        "article_id",
        commentRef
      );
      return formattedCommentData;
    })
    .then(formattedCommentData => {
      const formattedCommentDates = formatDate(formattedCommentData);
      return formattedCommentDates;
    })
    .then(formattedCommentDates => {
      return knex("comments")
        .insert(formattedCommentDates)
        .returning("*");
    });
};
