var gulp = require('gulp');
var includer = require('gulp-htmlincluder');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var spritecreat = require('gulp.spritesmith');
var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');
var concatCss = require('gulp-concat-css');


gulp.task('sprite', function(){
    var spriteData = gulp.src('dev/img/icons/*.png').pipe(spritecreat({
        imgName: 'sprite.png',
        cssName: 'sprite.css',
        algorithm: 'binary-tree'
    }));
    spriteData.img.pipe(gulp.dest('build/img/'));
    spriteData.css.pipe(gulp.dest('dev/css'));
});
 
gulp.task('html', function(){
	gulp.src('dev/**/*.html')
		.pipe(includer())
    .pipe(gulp.dest('build/'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task('less', function(){
  gulp.src('dev/less/**/*.less')
  .pipe(less())
  .pipe(gulp.dest('dev/css/'))
  .pipe(connect.reload());
});

gulp.task('css', function(){
  return gulp.src('dev/css/**/*.css')
  .pipe(concatCss('style.css'))
  .pipe(cleanCss({compatibiliti: 'ie8'}))
  .pipe(gulp.dest('build/css/'))
  .pipe(connect.reload());
});

gulp.task('move', function(){
  gulp.src('dev/js/*.js').pipe(gulp.dest('build/js/'));
  gulp.src('dev/img/**/*.*').pipe(gulp.dest('build/img/'));
});

gulp.task('default', function(){
      gulp.start('connect','html', 'less', 'css', 'move');
  gulp.watch(['dev/css/**/*.css'], function(){
    gulp.start('css');})
  gulp.watch(['dev/**/*.html'], function(event){
    gulp.start('html');})
  gulp.watch(['dev/less/**/*.less'], function(){
    gulp.start('less');})
})