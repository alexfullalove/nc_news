const connection = require("../db/connection");

exports.getArticles = ({ author }) => {
  return connection
    .select("articles.*")
    .from("articles")
    .where("articles.author", "like", author || "%")
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .groupBy("articles.article_id")
    .count("comments.comment_id AS comment_count");
};

// exports.getTreasure = ({ sort_by, order, limit, colour, max_age, min_age, max_price, min_price }) => {
// 	return connection
// 		.select('treasure_id', 'treasure_name', 'colour', 'age', 'cost_at_auction', 'shop_name')
// 		.from('treasures')
// 		.where('colour', 'like', colour || '%')
// 		.whereBetween('age', [min_age || 0, max_age || 99999])
// 		.whereBetween('cost_at_auction', [min_price || 0, max_price || 999999])
// 		.limit(limit || 25)
// 		.join('shops', 'treasures.shop_id', '=', 'shops.shop_id')
// 		.orderBy(sort_by || 'cost_at_auction', order || 'asc');
// };

// author, which filters the articles by the username value specified in the query
// topic, which filters the articles by the topic value specified in the query
// sort_by, which sorts the articles by any valid column (defaults to date)
// order, which can be set to asc or desc for ascending or descending (defaults to descending)
