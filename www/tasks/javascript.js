var _ = require('lodash');
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
var gulpif = require('gulp-if');
var babelify = require('babelify');

var minifiedFilename = (require('./helpers/get-minified-filename')()) + '.js';

function runTask(release) {
	var bundler = browserify({
		entries: [
			path.join(__dirname, '../src/assets/js/main.js')
		],
		debug: true
	}).transform(babelify);

	return bundler
		.bundle()
		.pipe(source(minifiedFilename))
		.pipe(buffer())
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		// Add transformation tasks to the pipeline here.
		.pipe(gulpif(release, uglify()))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist/assets/js'));
}

var runDefaultTask = _.partial(runTask, false);
var runReleaseTask = _.partial(runTask, true);

var taskDependencies = ['jshint', 'jscs'];
gulp.task('js', taskDependencies, runDefaultTask);
gulp.task('js:release', taskDependencies, runReleaseTask);

gulp.task('js:watch', function() {
	watch('src/assets/js/**/*.js', function() {
		gulp.start('js');
	});
});
