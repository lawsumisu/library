const gulp = require('gulp');
const concat = require('gulp-concat');
gulp.task('dts', function() {
  return gulp.src(['./temp/**/*.d.ts'])
    .pipe(concat('index.d.ts'))
    .pipe(gulp.dest('./dist'));
});