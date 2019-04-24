const knex = require("../db/connection");

exports.getTopics = () => {
  return knex("topics").select("*");
};
