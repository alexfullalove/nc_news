const connection = require("../knexfile");

exports.getTopics = () => {
  return connection.select("*").from("topics");
};
