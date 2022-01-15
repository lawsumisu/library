const {src, dest, series} = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

function clean() {
  return del('dist/**', {force: true});
}

function copyFiles() {
  return src(['src/shaders/**', 'src/typings/**'], { "base" : "src" })
    .pipe(dest('dist'));
}

function buildSource() {
  return tsProject.src().pipe(tsProject()).pipe(dest('dist'));
}

exports.build = series(clean, buildSource, copyFiles);