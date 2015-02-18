var gulp = require('gulp');

require('./tasks');

// Run `gulp help` to see a list of all tasks.

gulp.task('release', [
	'clean',
	'assets',
	'javascript',
	'stylus',
	'jade'
]);

gulp.task('default', [
	'clean',
	'assets',
	'javascript',
	'stylus',
	'jade',
	'serve'
]);
