function standardizeIssueComment(event) {
	return {
		comment: event.comment.body,
		comments_url: event.issue.comments_url,
		issue_number: event.issue.number,
		repository_url: event.issue.repository_url,
		url: event.issue.pull_request.url,
	};
}
  
function standardizePullRequestReviewComment(event) {
	return {
		comment: event.comment.body,
		comments_url: event.pull_request.comments_url,
		issue_number: event.pull_request.number,
		repository_url: event.repository.url,
		url: event.pull_request.url,
	};
}

function standardizeCommentContext(context) {
	switch (context.eventName) {
		case "issue_comment":
			return standardizeIssueComment(context.payload);
		case "pull_request_review_comment":
			return standardizePullRequestReviewComment(context.payload);
		default:
			throw {
				message: "standardize-pr-comment can only be run with comment events"
			};
	}
}

module.exports = {
		standardizeIssueComment: standardizeIssueComment,
		standardizePullRequestReviewComment: standardizePullRequestReviewComment,
		standardizeCommentContext: standardizeCommentContext
}