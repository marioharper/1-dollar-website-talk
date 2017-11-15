const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const clean = require('gulp-clean');
const galleryService = require('./galleryService');

const appRoot = 'src/';
const outputRoot = 'dist/';

const paths = {
  root: appRoot,
  html: [
    appRoot + '**/*.html',
    '!' + appRoot + '**/partials/**',
    '!' + appRoot + '**/templates/**',
  ],
  output: outputRoot
};

// compiles nunjucks
gulp.task('build-html', function () {
  return galleryService.getGallery()
    .then((images) => {
      gulp.src(paths.html)
        .pipe(nunjucksRender({
          path: [paths.root],
          data: {
            images,
          }
        }))
        .pipe(gulp.dest(paths.output));
    });
});

// copies assets folder to output folder
gulp.task('copy-assets', function () {
  return gulp.src(paths.root + '/assets/**')
    .pipe(gulp.dest(paths.output + '/assets'));
});

// removes the output folder
gulp.task('clean', function () {
  return gulp.src(paths.output, { read: false }).pipe(clean());
});

gulp.task('build', ['clean'], function () {
  gulp.start('build-html');
  gulp.start('copy-assets');
});

gulp.task('default', ['build']);