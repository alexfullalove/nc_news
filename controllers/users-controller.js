const { getUsers } = require("../models/users-model");

exports.sendUsers = (req, res, next) => {
  getUsers(req.params).then(user => {
    res.status(200).send({ user });
  });
};
