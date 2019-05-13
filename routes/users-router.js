const usersRouter = require("express").Router();
const { sendUsers, postUser } = require("../controllers/users-controller");
const { methodNotAllowed } = require("../errors");

usersRouter
  .route("/:username")
  .get(sendUsers)
  .all(methodNotAllowed);

usersRouter
  .route("/")
  .post(postUser)
  .all(methodNotAllowed);

module.exports = usersRouter;
