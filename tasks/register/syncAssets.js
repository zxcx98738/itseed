module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		'jst:dev',
		'less:dev',
		'sync:dev',
		'coffee:dev',
		'sync:files_dropbox',
		'sync:db_dropbox'
	]);
};
