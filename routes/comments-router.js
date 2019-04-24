const commentsRouter = require("express").Router();
const { patchCommentById } = require("../controllers/comments-controller");
const { methodNotAllowed } = require("../errors");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentById)
  .all(methodNotAllowed);

module.exports = commentsRouter;
