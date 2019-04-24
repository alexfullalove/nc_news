const articlesRouter = require("express").Router();
const {
  sendArticles,
  sendArticleById
} = require("../controllers/articles-controller");
const { methodNotAllowed } = require("../errors");

articlesRouter
  .route("/")
  .get(sendArticles)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id")
  .get(sendArticleById)
  .all(methodNotAllowed);

module.exports = articlesRouter;
