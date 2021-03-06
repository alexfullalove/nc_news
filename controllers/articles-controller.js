const {
  getArticles,
  getArticleById,
  updateArticleById,
  getCommentsByArticle,
  addComment,
  createArticle
} = require("../models/articles-model");

exports.sendArticles = (req, res, next) => {
  getArticles(req.query)
    .then(articles => {
      if (articles.length !== 0) res.status(200).send({ articles });
      else return Promise.reject({ status: 404, message: "page not found" });
    })
    .catch(next);
};

exports.sendArticleById = (req, res, next) => {
  getArticleById(req.params)
    .then(([article]) => {
      if (article !== undefined) res.status(200).send({ article });
      else return Promise.reject({ status: 404, message: "Invalid Id" });
    })
    .catch(next);
};

exports.postArticle = (req, res, next) => {
  createArticle(req.body)
    .then(([article]) => {
      res.status(201).send({ article });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  updateArticleById({ ...req.body, ...req.params })
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.sendCommentsByArticle = (req, res, next) => {
  getCommentsByArticle({ ...req.params, ...req.query })
    .then(comments => {
      if (comments.length !== 0) res.status(200).send({ comments });
      else return Promise.reject({ status: 404, message: "ID not found" });
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  addComment({ ...req.params, ...req.body })
    .then(comment => {
      res.status(201).send({ comment: comment[0] });
    })
    .catch(next);
};
