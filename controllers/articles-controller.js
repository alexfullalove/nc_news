const {
  getArticles,
  getArticleById,
  updateArticleById
} = require("../models/articles-model");

exports.sendArticles = (req, res, next) => {
  getArticles(req.query).then(articles => {
    res.status(200).send({ articles });
  });
};

exports.sendArticleById = (req, res, next) => {
  getArticleById(req.params).then(article => {
    res.status(200).send({ article });
  });
};

exports.patchArticleById = (req, res, next) => {
  updateArticleById({ ...req.body, ...req.params }).then(article => {
    res.status(200).send({ article });
  });
};
