const { expect } = require("chai");
const { formatData, createRef, formatDate } = require("../utils");

xdescribe("formatDate", () => {
  it("will take a single object array including a timestamp and convert to date format", () => {
    const data = [
      {
        created_at: 1542284514171
      }
    ];
    expect(formatDate(data)).to.eql([
      {
        created_at: "Thu Nov 15 2018 12:21:54 GMT+0000 (Greenwich Mean Time)"
      }
    ]);
  });
  it("will take an array of objects including a timestamp and convert to date format", () => {
    const data = [
      {
        created_at: 1542284514171
      },
      {
        created_at: 1542284514171
      }
    ];
    expect(formatDate(data)).to.eql([
      {
        created_at: "Thu Nov 15 2018 12:21:54 GMT+0000 (Greenwich Mean Time)"
      },
      {
        created_at: "Thu Nov 15 2018 12:21:54 GMT+0000 (Greenwich Mean Time)"
      }
    ]);
  });
});

describe("createRef", () => {
  it("will return an empty object", () => {
    array = [];
    expect(createRef(array)).to.eql({});
  });
  it("will return a refernce object", () => {
    array = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];
    expect(createRef(array, "topic", "author")).to.eql({
      mitch: "butter_bridge"
    });
  });
});
