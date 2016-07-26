/*eslint-env node, jasmine, phantomjs, es6, angular/di: [2,"array"] */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var eslint = require('gulp-eslint'); 
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('dist', [
	'copy-html',
	//'copy-images',
	'styles',
	//'lint'//,
	'scripts-dist'
]);

gulp.task('scripts', function() {
	gulp.src([
		'node_modules/angular/angular.js',
		'node_modules/angular-route/angular-route.js',
		'public/**/*.js'
		])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-dist', function() {
	gulp.src([
		'node_modules/angular/angular.js',
		'node_modules/angular-route/angular-route.js',
		'public/**/*.js'
		])
		.pipe(sourcemaps.init())
		.pipe(concat('app.js'))
		.pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('copy-html', function() {
	gulp.src('./public/index.html')
		.pipe(gulp.dest('./dist'));
	gulp.src('./public/views/**/*.htm')
		.pipe(gulp.dest('./dist/views'));
	gulp.src('./public/js/**/*.htm')
		.pipe(gulp.dest('./dist/views'));
});

gulp.task('styles', function() {
	gulp.src('public/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('dist/css'));
		//.pipe(browserSync.stream());
});

gulp.task('lint', function () {
	return gulp.src(['public/**/*.js'])
		// eslint() attaches the lint output to the eslint property
		// of the file object so it can be used by other modules.
		.pipe(eslint())
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format());
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failOnError last.
		//.pipe(eslint.failOnError());
});