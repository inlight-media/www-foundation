var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var watch = require('gulp-watch');

var connect;

gulp.task('serve', function() {
	try {
		connect = require('gulp-connect');
		connect.server({
			root: [
				path.join(__dirname, '../dist', '/')
			],
			port: 3000,
			livereload: true
		});

		// Add watchers to the dist directory if we're using LiveReload.
		watch('dist/**/*')
			.pipe(connect.reload());
	}
	catch (exception) {
		gutil.log('Error caught setting up serve task (this is likely because dev-dependencies are not installed).');
	}
});
