const gulp = require('gulp');
const { series, parallel, dest } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const cssnano = require('gulp-cssnano');
const autoprefixer = require('autoprefixer-stylus')
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const babel = require('gulp-babel');
const del = require('del');
const plumber = require('gulp-plumber');
const notifier = require('gulp-notifier');
const svgmin = require('gulp-svgmin');
const stylus = require('gulp-stylus');
const favicons = require('gulp-favicons');

// FILE PATHS
const filesPath = {
	stylus: './src/stylus/**/*.styl',
	graphics: './src/assets/graphics/**/*.+(png|jpg|gif|svg)',
	favicon: './src/assets/favicon/**/*.+(png|ico)',
	fonts: './src/assets/fonts/**/*.+(ttf|woff|woff2)',
	js: './src/js/**/*.js',
}

// MESSAGES FOR NOTIFIER
notifier.defaults({
	messages: {
		stylus: 'CSS compiled!',
		js: "JS compiled!",
		graphics: "Graphics optimized!",
		icons: "Icons optimized!",
		fonts: "Fonts optimized!",
		favicon: "Favicon optimized!"
	},
	prefix: '===>',
	suffix: '<===',
	exclusions: '.map'
})

// STYLUS
const stylusTask = (done) => {
	gulp.src(filesPath.stylus)
		.pipe(sourcemaps.init())
		.pipe(stylus({
			pretty: true,
			use: [autoprefixer('last 2 versions')]
		}))
		.pipe(cssnano())
		.pipe(sourcemaps.write('.'))
		.pipe(dest('./css'))
		.pipe(notifier.success('stylus'))
	done();
}

// JS TASK
const jsTask = (done) => {
	gulp.src(['./src/js/main.js'])
		.pipe(plumber({ errorHandler: notifier.error }))
		.pipe(babel({ presets: ['@babel/env'] }))
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(dest('./js'))
		.pipe(notifier.success('js'))
	done();
}

// GRAPHICS TASK
const graphicsTask = (done) => {
	gulp.src(filesPath.graphics)
		.pipe(cache(imagemin()))
		.pipe(svgmin())
		.pipe(dest('./assets/graphics/'))
		.pipe(notifier.success('graphics'))
	done();
}

// FAVICON TASK
const faviconTask = (done) => {
	gulp.src(filesPath.favicon)
		.pipe(favicons({
			appName: 'Pricing Card Component',
			appShortName: 'PCC',
			appDescription: 'Compenent with three cards which describe prices',
			developerName: 'Jérôme Haas',
			developerURL: 'jeromehaas.dev',
			background: '#fff',
			path: './assets/favicons/',
			url: '',
			display: 'standalone',
			orientation: 'portrait',
			scope: '/',
			start_url: '/',
			version: 1.0,
			logging: false,
			html: 'index.html',
			pipeHTML: true,
			replace: true,
		}))
		.pipe(gulp.dest('./assets/favicon/'))
		.pipe(notifier.success('favicon'))
	done();
};

// FONT TASK
const fontTask = (done) => {
	gulp.src(filesPath.fonts)
		.pipe(dest('./assets/fonts/'))
		.pipe(notifier.success('fonts'))
	done();
}

// WATCH TASK
const watchTask = () => {
	browserSync.init({
		server: { baseDir: './' },
		open: false
	});
	gulp.watch('./index.html').on('change', browserSync.reload);
	gulp.watch(filesPath.stylus, stylusTask).on("change", browserSync.reload);
	gulp.watch(filesPath.js, jsTask).on("change", browserSync.reload);
	gulp.watch(filesPath.graphics, graphicsTask).on("change", browserSync.reload);
	gulp.watch(filesPath.fonts, fontTask).on("change", browserSync.reload);
	gulp.watch(filesPath.favicon, faviconTask).on("change", browserSync.reload);
}

exports.build = parallel(stylusTask, jsTask, graphicsTask, fontTask, faviconTask);
exports.default = series(exports.build, watchTask);