"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
     del = require('del');

gulp.task("concatScripts", function() {
    return gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'src/js/main.js'
        ])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('src/js'));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
    return gulp.src("src/js/app.js")
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('src/js'));
});

gulp.task("modernizr", function(){
    return gulp.src("bower_components/modernizr/dist/modernizr-build.js")
    .pipe(uglify())
    .pipe(rename('modernizr.min.js'))
    .pipe(gulp.dest('src/js/vendors'));
});

gulp.task('compileSass', function() {
    return gulp.src("src/scss/application.scss")
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('src/css'));
});

gulp.task('watchFiles', function() {
    gulp.watch('src/scss/**/*.scss', ["compileSass"]);
    gulp.watch('src/js/main.js', ['concatScripts']);
});

gulp.task('clean', function(){
    del(['dist', 'src/css/application.css*', 'src/js/app*.js*']);
});

gulp.task("build", ['minifyScripts', 'compileSass'], function() {
    return gulp.src(["src/css/application.css", "src/js/app.min.js", "src/js/vendors/**", "src/index.php", "src/favicon.ico",  "src/assets/images/**", "fonts/**"], { base: './src'})
    .pipe(gulp.dest('dist'));
});

gulp.task("default", ["clean"], function(){
    gulp.start('build');
});
