const { getUsers } = require("../models/users-model");

exports.sendUsers = (req, res, next) => {
  getUsers(req.params)
    .then(([user]) => {
      if (user !== undefined) res.status(200).send({ user });
      else return Promise.reject({ status: 404, message: "user not found" });
    })
    .catch(next);
};
