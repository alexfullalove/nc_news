const { getArticles, getArticleById } = require("../models/articles-model");

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
