const connection = require("../db/connection");

exports.getUsers = ({ username }) => {
  return connection
    .select("*")
    .from("users")
    .where("username", "=", username);
};

exports.createUser = ({ username, name, avatar_url }) => {
  const userObj = { username, name, avatar_url };
  return connection
    .select("*")
    .from("users")
    .insert(userObj)
    .returning("*");
};
