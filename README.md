# Standardize PR Comment

## Overview

This is a custom Github action that you can run either in an issue_comment event or a pull_request_review_comment event. In either case, it will give the same set of outputs, which contain useful information about the comment. This way, you can have an action that responds to either kind of comment.

## Why would I want this?

If you make changes to a workflow with an issue_comment trigger (e.g. to create Github bots like Atlantis), you can't test changes to the workflow without also changing the trigger (and corresponding event data), because issue_comment workflows always run off the main branch. On the other hand, pull_request_review_comments run off your pull request's branch, but they're a bit cumbersome to use as a primary interface. And the data structures for the two kinds of events are very similar, but different enough that switching back and forth can be a hassle. With this action, you can respond to either event and not have to care which one kicked off the workflow.

## Releasing

```
npm version --no-git-tag-version --no-commit-hooks major
```

Commit the changes and then cut the tag after a merge to `master`
