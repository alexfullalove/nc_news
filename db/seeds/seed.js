const data = require("../data/");
const { formatDate, createRef, formatData } = require("../../utils");

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      console.log("seeding topics");
      return knex("topics")
        .insert(data.topicsData)
        .returning("*");
    })
    .then(() => {
      console.log("seeding users");
      return knex("users")
        .insert(data.usersData)
        .returning("*");
    })
    .then(() => {
      console.log("formatting articles date");
      const formattedArticlesData = formatDate(data.articlesData);
      return formattedArticlesData;
    })
    .then(formattedArticlesData => {
      console.log("seeding articles");
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
      console.log(formattedCommentDates);
      return formattedCommentDates;
    })
    .then(formattedCommentDates => {
      return knex("comments")
        .insert(formattedCommentDates)
        .returning("*");
    });
};
