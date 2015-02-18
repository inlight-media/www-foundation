var gulp = require('gulp');
var jscs = require('gulp-jscs');
var plumber = require('gulp-plumber');

var src = [
	'**/*.js',
	'!dist/',
	'!dist/**',
	'!node_modules/',
	'!node_modules/**'
];

gulp.task('jscs', function() {
	gulp.src(src)
		.pipe(plumber())
		.pipe(jscs());
});
