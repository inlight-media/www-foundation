var gulp = require('gulp');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var stylus = require('gulp-stylus');
var watch = require('gulp-watch');

var nib = require('nib');
var rupture = require('rupture');
var jeet = require('jeet');

var minifiedFilename = (require('./helpers/get-minified-filename')()) + '.css';

gulp.task('stylus', function () {
	var opts = {
		compress: true,
		errors: true,
		use: [
			jeet(),
			rupture(),
			nib()
		]
	};

	return gulp.src('src/assets/css/main.styl')
		.pipe(plumber())
		.pipe(stylus(opts)
		.on('error', notify.onError({
			title: 'Stylus Error',
			message: '<%= error.message %>'
		})))
		.pipe(rename(minifiedFilename))
		.pipe(gulp.dest('dist/assets/css'));
});

watch('src/assets/**/*.styl', function() {
	gulp.start('stylus');
});
