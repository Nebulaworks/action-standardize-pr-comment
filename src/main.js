const core = require('@actions/core');
const github = require('@actions/github');
const {standardizeCommentContext} = require('./standardize.js');

try {
  const standardized = standardizeCommentContext(github.context);
  for (const [key, value] of Object.entries(standardized)) {
    core.setOutput(key, value);
  }
} catch (error) {
  core.setFailed(error.message);
}
