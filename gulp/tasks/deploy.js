const ghPages = require('gulp-gh-pages');

module.exports = function () {
  $.gulp.task('deploy', () => $.gulp.src('./build/**/*').pipe(ghPages()));
}
