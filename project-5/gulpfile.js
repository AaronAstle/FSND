var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var stylish = require('jshint-stylish');

var pathTo = {
  source: {
    vendor: [
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
      './node_modules/knockout/build/output/knockout-latest.js'
    ],
    application: './src/scripts/**/*.js',
    styles: [
      './src/styles/**/*.scss'
    ]
  },
  dist: {
    scripts: './dist/scripts/',
    styles: './dist/styles/'
  }
};

gulp.task('vendor-scripts', function() {
  return gulp.src(pathTo.source.vendor)
    .pipe(concat('vendor-scripts.js'))
    .pipe(gulp.dest(pathTo.dist.scripts));
});

gulp.task('scripts', function() {
  return gulp.src(pathTo.source.application)
    .pipe(concat('application.js'))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(gulp.dest(pathTo.dist.scripts));
});

gulp.task('styles', function() {
  return gulp.src(pathTo.source.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(pathTo.dist.styles));
});

gulp.task('watch', function() {
  gulp.watch(pathTo.source.application, ['scripts']);
  gulp.watch(pathTo.source.styles, ['styles']);
});

// Default Task
gulp.task('default', ['vendor-scripts', 'scripts', 'styles', 'watch']);

