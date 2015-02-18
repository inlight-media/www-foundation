var _ = require('lodash');
var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var plumber = require('gulp-plumber');
var symlink = require('gulp-symlink');

var srcAssetsPath = path.join(__dirname, '../src/assets');
var destAssetsPath = path.join(__dirname, '../dist/assets');

// Get a list of directories in the src/assets directory
// excluding css + js (as they are "complex assets").
var dirs = _.chain(fs.readdirSync(srcAssetsPath))
	.without('css', 'js')
	.map(function(dir) {
		if (dir[0] === '.') {
			return null;
		}
		var stat = fs.statSync(path.join(srcAssetsPath, dir));

		return stat.isDirectory() ? dir : null;
	})
	.filter()
	.value();

gulp.task('assets', function() {
	dirs.forEach(function(dir) {
		var cwd = path.join(srcAssetsPath, dir);
		var dest = path.join(destAssetsPath, dir);
		var useSymlink = true; // @TODO: When it's release copy otherwise symlink.

		if (useSymlink) {
			gulp.src(path.join(srcAssetsPath, dir))
				.pipe(symlink.absolute(dest));
		}
		else {
			gulp.src('./**/*', { cwd: cwd })
				.pipe(gulp.dest(dest));
		}
	});
});
