const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const yargs =  require('yargs');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const named = require('vinyl-named');
const uglify = require('gulp-uglify');

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

const scriptsPATH = {
    "input": "./dev/static/js/main.js",
    "ouput": "./build/static/js/"
};

let webpackConfig = {
  mode: (PRODUCTION ? 'production' : 'development'),
  plugins: [
   new webpack.ProvidePlugin({
     $: 'jquery',
     jQuery: 'jquery',
     'window.jQuery': 'jquery'
   })
 ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ "@babel/preset-env" ],
            compact: false
          }
        }
      }
    ]
  },
  devtool: !PRODUCTION && 'source-map'
}

module.exports = function () {

$.gulp.task('scripts', function () {
  return $.gulp.src(scriptsPATH.input)
    .pipe(named())
    .pipe(sourcemaps.init())
    .pipe(webpackStream(webpackConfig, webpack))
    // .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe($.gulp.dest(scriptsPATH.ouput));
  });
};
