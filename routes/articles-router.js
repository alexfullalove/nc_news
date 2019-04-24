const articlesRouter = require("express").Router();
const {
  sendArticles,
  sendArticleById,
  patchArticleById
} = require("../controllers/articles-controller");
const { methodNotAllowed } = require("../errors");

articlesRouter
  .route("/")
  .get(sendArticles)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id")
  .get(sendArticleById)
  .patch(patchArticleById)
  .all(methodNotAllowed);

module.exports = articlesRouter;
