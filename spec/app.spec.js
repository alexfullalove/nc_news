process.env.NODE_ENV = "test";
const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../app");
const connection = require("../db/connection");
const request = supertest(app);

describe("/", () => {
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
    it("GET status:200 - returns all the topics", () => {
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
    it("GET status:404 - returns NOT FOUND for non existant route", () => {
      return request
        .get("/api/banana")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).to.eql();
        });
    });
  });
  describe("/api", () => {
    it("GET status:200 - returns all the articles with correct keys", () => {
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
    describe("/api", () => {
      it("GET status:200 - filters by author", () => {
        return request
          .get("/api/articles?author=rogersop")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles.length).to.eql(3);
          });
      });
    });
    it("GET status:404 - responds with 404 page not found", () => {
      return request
        .get("/api/articles?author=kuharsgkhasdfkghdhjrg")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).to.eql("page not found");
        });
    });
  });
  describe("/api", () => {
    it("GET status:200 - filters by topic", () => {
      return request
        .get("/api/articles?topic=cats")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles.length).to.eql(1);
        });
    });
    it("GET status:404 - filters by topic that does not exist", () => {
      return request
        .get("/api/articles?topic=bananas")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).to.eql("page not found");
        });
    });
  });
  describe("/api", () => {
    it("GET status:200 - get article by Id", () => {
      return request
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          expect(body.article.length).to.eql(1);
        });
    });
    it("GET status:404 - get article by Id", () => {
      return request
        .get("/api/articles/99")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).to.eql("Invalid Id");
        });
    });
    it("GET status:404 - get article by Id when given a letter not a number", () => {
      return request
        .get("/api/articles/q")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.eql("bad request");
        });
    });
  });
  describe("/api", () => {
    it("PATCH status:200 - increment votes for article by Id", () => {
      return request
        .patch("/api/articles/1")
        .send({ inc_votes: 9 })
        .expect(200)
        .then(({ body }) => {
          expect(body.article[0].votes).to.eql(109);
        });
    });
    it("PATCH status:400 - increment votes for article by invalid Id", () => {
      return request
        .patch("/api/articles/t")
        .send({ inc_votes: 9 })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.eql("bad request");
        });
    });
    it("PATCH status:404 - increment votes for valid article but votes body contains a string", () => {
      return request
        .patch("/api/articles/1")
        .send({ inc_votes: "q" })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.eql("bad request");
        });
    });
    it("PATCH status:404 - increment votes for valid article but no votes given", () => {
      return request
        .patch("/api/articles/1")
        .send({})
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.eql("bad request");
        });
    });
  });
  describe("/api", () => {
    it("GET status:200 - comments by Article ID", () => {
      return request
        .get("/api/articles/5/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments.length).to.eql(2);
        });
    });
  });
  describe("/api", () => {
    it("GET status:400 - comments by Article ID when given an invalid article ID", () => {
      return request
        .get("/api/articles/z/comments")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.eql("bad request");
        });
    });
  });
  describe("/api", () => {
    it("GET status:404 - comments by Article ID when given an Id that does not exist", () => {
      return request
        .get("/api/articles/48000/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).to.eql("page not found");
        });
    });
  });
  describe("/api", () => {
    it("GET status:200 - comments by Article ID sorted by votes", () => {
      return request
        .get("/api/articles/5/comments?sort_by=votes")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments[0].votes).to.eql(16);
        });
    });
    it("GET status:404 - comments by Article ID sorted by a column that does not exist", () => {
      return request
        .get("/api/articles/5/comments?sort_by=bananas")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).to.eql("page does not exist");
        });
    });
  });
  describe("/api", () => {
    it("POST status:201 - adds a comment to an article", () => {
      return request
        .post("/api/articles/1/comments")
        .send({ username: "butter_bridge", comment: "Hello" })
        .expect(201)
        .then(({ body }) => {
          expect(body.comment[0].body).to.eql("Hello");
        });
    });
    it("POST status:400 - ERROR when adding a comment to an article with invalid ID", () => {
      return request
        .post("/api/articles/z/comments")
        .send({ username: "butter_bridge", comment: "Hello" })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.eql("bad request");
        });
    });
    it("POST status:400 - ERROR when passing a comment to an article with no body", () => {
      return request
        .post("/api/articles/1/comments")
        .send({})
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.eql("bad request");
        });
    });
    it("POST status:400 - ERROR when passing a comment to an article with no body", () => {
      return request
        .post("/api/articles/1/comments")
        .send({ banana: "butter_bridge", comment: "Hello" })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.eql("bad request");
        });
    });
  });
  describe("/api", () => {
    it("PATCH status:200 - increments a vote on a comment", () => {
      return request
        .patch("/api/comments/1")
        .send({ inc_votes: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.comment[0].votes).to.eql(17);
        });
    });
    it("PATCH status:400 - ERROR bad request for invalid id when incrementing a vote", () => {
      return request
        .patch("/api/comments/z")
        .send({ inc_votes: 1 })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.eql("bad request");
        });
    });
    it("PATCH status:404 - ERROR bad request for non existent when incrementing a vote", () => {
      return request
        .patch("/api/comments/48000")
        .send({ inc_votes: 1 })
        .expect(404)
        .then(({ body }) => {
          expect(body.message).to.eql("page does not exist");
        });
    });
    it("PATCH status:404 - ERROR bad request for non existent when incrementing a using a string", () => {
      return request
        .patch("/api/comments/48000")
        .send({ inc_votes: "q" })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.eql("bad request");
        });
    });
    it("PATCH status:400 - ERROR bad request for an empty votes body", () => {
      return request
        .patch("/api/comments/48000")
        .send({})
        .expect(400)
        .then(({ body }) => {
          console.log(body);
          expect(body.message).to.eql("bad request");
        });
    });
  });
  describe("/api", () => {
    it("DELETE status:204 - deletes comment by id and returns nothing", () => {
      return request
        .delete("/api/comments/1")
        .expect(204)
        .then(({ body }) => {
          expect(body).to.eql({});
        });
    });
    it("DELETE status:400 - ERROR when trying to delete a comment by id that is invalid", () => {
      return request
        .delete("/api/comments/z")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.eql("bad request");
        });
    });
    it("DELETE status:400 - ERROR when trying to delete a comment by id that does not exist", () => {
      return request
        .delete("/api/comments/48000")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).to.eql("page does not exist");
        });
    });
  });
  describe("/api", () => {
    it("GET status:200 - returns user by username", () => {
      return request
        .get("/api/users/butter_bridge")
        .expect(200)
        .then(({ body }) => {
          expect(body.user[0].name).to.eql("jonny");
        });
    });
    it("GET status:404 - returns user by username", () => {
      return request
        .get("/api/users/6")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).to.eql("user not found");
        });
    });
  });
});
