const knex = require("../knexfile");

exports.getTopics = (req, res, next) => {
  return knex.select("*").from("topics");
};
