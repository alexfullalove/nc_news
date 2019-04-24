process.env.NODE_ENV = "test";
const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../app");
const connection = require("../db/connection");
const request = supertest(app);

describe.only("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe("/api", () => {
    it("GET status:200", () => {
      return request
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.equal(true);
        });
    });
  });
  describe("/api", () => {
    it("GET status:200", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body.topics[0]).to.eql({
            description: "The man, the Mitch, the legend",
            slug: "mitch"
          });
        });
    });
  });
  describe("/api", () => {
    it("GET status:200", () => {
      return request
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0]).to.contain.keys(
            "author",
            "title",
            "article_id",
            "body",
            "topic",
            "created_at",
            "votes",
            "comment_count"
          );
        });
    });
  });
  describe("/api", () => {
    it("GET status:200", () => {
      return request
        .get("/api/articles?author=rogersop")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles.length).to.eql(3);
        });
    });
  });
});
