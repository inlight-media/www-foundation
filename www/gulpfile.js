var gulp = require('gulp');

require('./tasks');

// Run `gulp help` to see a list of all tasks.

gulp.task('release', [
	'clean',
	'assets:release',
	// NOTE: We have to call this task 'js' not 'javascript'
	// because JSHint disables script urls e.g. javascript:release
	'js:release',
	'stylus',
	'jade'
]);

gulp.task('default', [
	'clean',
	'assets',
	'js',
	'js:watch',
	'stylus',
	'stylus:watch',
	'jade',
	'jade:watch',
	'serve'
]);
