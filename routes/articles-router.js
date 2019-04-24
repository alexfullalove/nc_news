const articlesRouter = require("express").Router();
const { sendArticles } = require("../controllers/articles-controller");
const { methodNotAllowed } = require("../errors");

articlesRouter
  .route("/")
  .get(sendArticles)
  .all(methodNotAllowed);

module.exports = articlesRouter;
