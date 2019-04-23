const data = require("../data/");
const { formatDate } = require("../../utils");

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      console.log("seeding topics");
      return knex("topics")
        .insert(data.topicsData)
        .returning("*");
    })
    .then(() => {
      console.log("seeding users");
      return knex("users")
        .insert(data.usersData)
        .returning("*");
    })
    .then(() => {
      console.log("formatting articles date");
      const formattedArticlesData = formatDate(data.articlesData);
      return formattedArticlesData;
    })
    .then(formattedArticlesData => {
      console.log("seeding articles");
      return knex("articles")
        .insert(formattedArticlesData)
        .returning("*");
    });
};

// const data = require("../data");
// const { createRef, formatData } = require("../../utils/formatUtils");
// console.log(process.env.NODE_ENV);
// exports.seed = (connection, promise) => {
//   return connection("owners")
//     .insert(data.ownerData)
//     .returning("*")
//     .then(owners => {
//       const ownerRef = createRef(owners, "forename", "owner_id");
//       const formattedShopData = formatData(
//         data.shopData,
//         "owner",
//         "owner_id",
//         ownerRef
//       );
//       return formattedShopData;
//     })
//     .then(formattedShopData => {
//       return connection("shops")
//         .insert(formattedShopData)
//         .returning("*")
//         .then(shops => {
//           const shopRef = createRef(shops, "shop_name", "shop_id");
//           const formattedTreasureData = formatData(
//             data.treasureData,
//             "shop",
//             "shop_id",
//             shopRef
//           );
//           return formattedTreasureData;
//         })
//         .then(formattedTreasureData => {
//           console.log("string");
//           return connection("treasures")
//             .insert(formattedTreasureData)
//             .returning("*");
//         });
//     });
// };
