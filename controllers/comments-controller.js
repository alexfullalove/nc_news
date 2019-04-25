const {
  updateCommentById,
  deleteComment
} = require("../models/comments-model");

exports.patchCommentById = (req, res, next) => {
  updateCommentById({ ...req.body, ...req.params })
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.removeComment = (req, res, next) => {
  deleteComment(req.params)
    .then(comments => {
      res.status(204).send({ comments });
    })
    .catch(next);
};
