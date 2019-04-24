const connection = require("../db/connection");

exports.getArticles = () => {
  return connection("articles").select("*");
};
