const { updateCommentById } = require("../models/comments-model");

exports.patchCommentById = (req, res, next) => {
  updateCommentById({ ...req.body, ...req.params }).then(comment => {
    res.status(200).send({ comment });
  });
};
