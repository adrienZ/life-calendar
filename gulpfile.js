var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync');


gulp.task('sass', function() {
  return gulp
    .src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
      stream: true,
    }));
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './',
    },
  });
});

gulp.task('default', ['browserSync', 'sass'], function() {
  console.log('go gulp');
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('index.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
  // Other watchers
});
