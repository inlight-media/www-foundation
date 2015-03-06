var _ = require('lodash');
var gulp = require('gulp');
var jade = require('gulp-jade');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');

/**
 * Pattern to match all jade files.
 * @type {String}
 */
var allJadeFiles = 'src/views/**/*.jade';

/**
 * Patterns to match layouts + partials only.
 * These are files that should not result in "pages" being built
 * into the dist directory.
 * @type {Array}
 */
var partials = [
	'src/views/_includes/**/*.jade',
	'src/views/_mixins/**/*.jade',
	'src/views/_templates/**/*.jade',
	'src/views/layout.jade'
];

/**
 * Patterns to match pages (excludes partials).
 * @param {Array}
 */
var pages = (function() {
	// Negate each of the matches in the partials array.
	// E.g. 'layout.jade' becomes '!layout.jade'.
	var negatedPartials = _.map(partials, function(str) {
		return '!' + str;
	});

	return [allJadeFiles].concat(negatedPartials);
}());

/**
 * Pattern to match templates; these are special
 * view files that should be put into the /templates directory.
 * They are typically used in Angular apps.
 * @type {String}
 */
var templates = 'src/views/_templates/**/*.jade';

/**
 * Jade locals.
 * @type {Object}
 */
var locals = {
	// Add *some* contents of the package.json as pkg.
	pkg: _.pick(require('../package.json'), [
		'name',
		'version'
	]),

	// Add contents of the config.json as cfg
	// NOTE: 'cfg' is used instead of 'config' so it doesn't get confused with
	// a frontend service/module (e.g. the Angular config.js service).
	cfg: require('../.config.json')
};

gulp.task('jade:pages', function() {
	return gulp.src(pages)
		.pipe(plumber())
		.pipe(jade({
			locals: locals
		})
		.on('error', notify.onError({
			title: 'Jade Error',
			message: '<%= error.message %>'
		})))
		.pipe(gulp.dest('dist'));
});

gulp.task('jade:templates', function() {
	return gulp.src(templates)
		.pipe(plumber())
		.pipe(jade({
			locals: locals
		})
		.on('error', notify.onError({
			title: 'Jade Error',
			message: '<%= error.message %>'
		})))
		.pipe(gulp.dest('dist/assets/templates'));
});

gulp.task('jade', [
	'jade:pages',
	'jade:templates'
]);

gulp.task('jade:watch', function() {
	watch(allJadeFiles, function() {
		gulp.start('jade');
	});
});
