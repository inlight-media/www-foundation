var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var plumber = require('gulp-plumber');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

var minifiedFilename = (require('./helpers/get-minified-filename')()) + '.js';

gulp.task('javascript', ['jshint', 'jscs'], function() {
	var bundler = browserify({
		entries: [
			path.join(__dirname, '../src/assets/js/main.js')
		],
		debug: true
	});

	return bundler
		.bundle()
		.pipe(source(minifiedFilename))
		.pipe(buffer())
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		// Add transformation tasks to the pipeline here.
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist/assets/js'));
});

watch('src/assets/js/**/*.js', function() {
	gulp.start('javascript');
});
