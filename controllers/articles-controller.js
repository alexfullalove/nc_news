const { getArticles } = require("../models/articles-model");

exports.sendArticles = (req, res, next) => {
  getArticles(req.query).then(articles => {
    res.status(200).send({ articles });
  });
};
