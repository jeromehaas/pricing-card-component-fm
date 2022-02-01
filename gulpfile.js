const { series, parallel, dest } = require('gulp');

const browserSync = require("browser-sync")

const watchTask = () => {
	browserSync.init({
		server: {
			baseDir: './'
		},
		open: false
	});
	console.log('Gulp is up and running!')
}

exports.default = watchTask;