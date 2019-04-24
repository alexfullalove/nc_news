const { getTopics } = require("../models/topics-model");

exports.sendTopics = (req, res, next) => {
  getTopics().then(topics => {
    res.status(200).send({ topics });
  });
};
