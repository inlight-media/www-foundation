var gulp = require('gulp');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');

var src = [
	'**/*.js',
	'!dist/',
	'!dist/**',
	'!node_modules/',
	'!node_modules/**'
];

gulp.task('jshint', function() {
	gulp.src(src)
		.pipe(plumber())
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
});
