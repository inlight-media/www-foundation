var gulp = require('gulp');
var path = require('path');
var rm = require('rimraf');

gulp.task('clean', function() {
	return rm.sync(path.join(__dirname, '../dist'));
});
