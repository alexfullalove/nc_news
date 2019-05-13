const articlesRouter = require("express").Router();
const {
  sendArticles,
  sendArticleById,
  patchArticleById,
  sendCommentsByArticle,
  postArticle,
  postComment
} = require("../controllers/articles-controller");
const { methodNotAllowed } = require("../errors");

articlesRouter
  .route("/")
  .get(sendArticles)
  .post(postArticle)
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
