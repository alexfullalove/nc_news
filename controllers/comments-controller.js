const {
  updateCommentById,
  deleteComment
} = require("../models/comments-model");

exports.patchCommentById = (req, res, next) => {
  updateCommentById({ ...req.body, ...req.params })
    .then(comment => {
      if (comment.length !== 0) res.status(200).send({ comment });
      else
        return Promise.reject({ status: 404, message: "page does not exist" });
    })
    .catch(next);
};

exports.removeComment = (req, res, next) => {
  deleteComment(req.params)
    .then(result => {
      console.log(result);
      if (result === 1) res.status(204).send({ result });
      else
        return Promise.reject({ status: 404, message: "page does not exist" });
    })
    .catch(next);
};
