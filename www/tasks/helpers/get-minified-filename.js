var pkg = require('../../package.json');

module.exports = function() {
	return pkg.name + '-' + pkg.version + '.min';
};
