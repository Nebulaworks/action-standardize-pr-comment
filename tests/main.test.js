const { standardizeCommentContext } = require("../src/standardize.js");

const standardizedEvent = {
  comment: "packer build",
  comments_url: "https://github.com/some/commenturl",
  issue_number: "1",
  repository_url: "https://github.com/somerepo",
  url: "https://github.com/some/pr",
};

test("translate issue comment", () => {
  const result = standardizeCommentContext({
    eventName: "issue_comment",
    payload: {
      comment: { body: "packer build" },
      issue: {
        pull_request: { url: "https://github.com/some/pr" },
        comments_url: "https://github.com/some/commenturl",
        number: "1",
        repository_url: "https://github.com/somerepo",
      },
    },
  });
  expect(result).toEqual(standardizedEvent);
});

test("translate PR review comment", () => {
  const result = standardizeCommentContext({
    eventName: "pull_request_review_comment",
    payload: {
      comment: { body: "packer build" },
      pull_request: {
        url: "https://github.com/some/pr",
        number: "1",
        comments_url: "https://github.com/some/commenturl",
      },
      repository: { url: "https://github.com/somerepo" },
    },
  });
  expect(result).toEqual(standardizedEvent);
});
