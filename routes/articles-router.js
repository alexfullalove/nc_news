const articlesRouter = require("express").Router();
const {
  sendArticles,
  sendArticleById,
  patchArticleById,
  sendCommentsByArticle,
  postComment
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

articlesRouter
  .route("/:article_id/comments")
  .get(sendCommentsByArticle)
  .post(postComment)
  .all(methodNotAllowed);

module.exports = articlesRouter;
