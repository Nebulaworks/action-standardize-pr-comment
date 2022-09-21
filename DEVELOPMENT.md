## Structure

The relevant files are:

action.yml: The action definition for Github actions.

src/main.js: The entry point and core Github interaction logic (getting event info, setting outputs).

src/standardize.js: The core data transformation logic.

tests/main.test.js: The unit tests. 

## Development

If you want to add new outputs, you'll need to update both of the transformation functions in src/standarize.js, the output list in action.yml, and the tests in tests/main.test.js.

If you add new production dependencies, you'll need to `npm install --production` and `git add --force` them, since Github actions doesn't do it for you. The node_modules directory is gitignored so it doesn't accidentally blow up diffs, which is why the `--force` is necessary.

## Testing

To run the test suite, just run `npm test`.