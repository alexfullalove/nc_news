const { sendTopics } = require("../models/topics-model");

exports.sendTopics = (req, res, next) => {
  getTopics()
    .res.status(200)
    .send();
};
