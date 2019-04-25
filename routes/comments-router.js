const commentsRouter = require("express").Router();
const { patchCommentById } = require("../controllers/comments-controller");
const { removeComment } = require("../controllers/comments-controller");
const { methodNotAllowed } = require("../errors");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentById)
  .delete(removeComment)
  .all(methodNotAllowed);

module.exports = commentsRouter;
