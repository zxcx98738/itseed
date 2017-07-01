/**
 * A grunt task to keep directories in sync. It is very similar to grunt-contrib-copy
 * but tries to copy only those files that has actually changed.
 *
 * ---------------------------------------------------------------
 *
 * Synchronize files from the `assets` folder to `.tmp/public`,
 * smashing anything that's already there.
 *
 * For usage docs see:
 * 		https://github.com/tomusdrw/grunt-sync
 *
 */
module.exports = function(grunt) {

	grunt.config.set('sync', {
		dev: {
			files: [{
				cwd: './assets',
				src: ['**/*.!(coffee)'],
				dest: '.tmp/public'
			}]
		},
		files_dropbox: {
			files: [{
				cwd: './assets',
				src: ['**/*.!(coffee)'],
				dest: '/root/Dropbox/itseed_backup'
			}]
		},
		db_dropbox: {
			files: [{
				cwd: '.tmp/',
				src: ['localDiskDb.db'],
				dest: '/root/Dropbox/itseed_DB_backup'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-sync');
};
