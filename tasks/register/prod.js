module.exports = function (grunt) {
	grunt.registerTask('prod', [
		'compileAssets',
		'concat',
		'uglify',
		'cssmin',
		'sails-linker:prodJs',
		'sails-linker:devJsAdmin',
		'sails-linker:prodStyles',
		'sails-linker:devStylesAdmin',
		'sync:files_dropbox',
		'sync:db_dropbox'
	]);
};
