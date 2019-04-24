const { getTopics } = require("../models/topics-model");

exports.sendTopics = (req, res, next) => {
  getTopics().then(body => {
    res.status(200).send(body);
  });
};
