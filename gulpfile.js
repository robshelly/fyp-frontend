// var gulp = require('gulp');

// gulp.task('default', defaultTask);

// function defaultTask(done) {
//   // place code for your default task here
//   done();
// }
var gulp = require('gulp');

var requireDir = require('require-dir');
requireDir('./tasks');

gulp.task('default', ['scripts', 'sass'], function () {
  // Default tasks here
  // gulp.watch('src/js/**/*.js', ['scripts']);
  // gulp.watch('src/sass/**/*.{sass,scss}', ['sass']);
});