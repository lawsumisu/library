const gulp = require('gulp');
const concat = require('gulp-concat');
gulp.task('scripts', function() {
  return gulp.src(['./dist/**/*.d.ts'])
    .pipe(concat('index.d.ts'))
    .pipe(gulp.dest('./'));
});