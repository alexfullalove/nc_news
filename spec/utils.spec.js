const { expect } = require("chai");
const { formatData, createRef, formatDate } = require("../utils");

describe("formatDate", () => {
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
