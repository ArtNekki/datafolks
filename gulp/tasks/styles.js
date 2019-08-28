let plumber = require('gulp-plumber'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    csscomb = require('gulp-csscomb'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    postcss = require('gulp-postcss'),
    sprites  = require('postcss-sprites'),
    postcssSVG = require('postcss-svg'),
    stylesPATH = {
        "input": "./dev/static/styles/",
        "ouput": "./build/static/css/"
    };

let spritesOpts = {
    stylesheetPath: "./dev/static/styles/",
    spritePath: "./dev/static/images/general/",
    retina: true,
    verbose:true,
    filterBy: function(image) {
      if (!/png\//.test(image.url)) {
          return Promise.reject();
      }
      return Promise.resolve('png');
   }
};

module.exports = function () {
    $.gulp.task('styles:dev', () => {
        return $.gulp.src(stylesPATH.input + 'styles.scss')
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(scss())
            .pipe(autoprefixer({
                browsers: ['last 3 version']
            }))
            .pipe(postcss([sprites(spritesOpts), postcssSVG({
              dirs: './dev/static/images/svg/'
             })]))
            .pipe(sourcemaps.write())
            .pipe(rename('styles.min.css'))
            .pipe($.gulp.dest(stylesPATH.ouput))
            .on('end', $.browserSync.reload);
    });
    $.gulp.task('styles:build', () => {
        return $.gulp.src(stylesPATH.input + 'styles.scss')
            .pipe(scss())
            .pipe(autoprefixer({
                browsers: ['last 3 version']
            }))
            .pipe(csscomb())
            .pipe($.gulp.dest(stylesPATH.ouput))
    });
    $.gulp.task('styles:build-min', () => {
        return $.gulp.src(stylesPATH.input + 'styles.scss')
            .pipe(scss())
            .pipe(autoprefixer({
                browsers: ['last 3 version']
            }))
            .pipe(csscomb())
            .pipe(csso())
            .pipe(rename('styles.min.css'))
            .pipe($.gulp.dest(stylesPATH.ouput))
    });
};
