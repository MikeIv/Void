"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var imagemin = require("gulp-imagemin");
var minify = require("gulp-csso");
var svgmin = require('gulp-svgmin');
var svgstore = require("gulp-svgstore");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var posthtml = require("gulp-posthtml");
var rename = require("gulp-rename");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var include = require("posthtml-include");
var run = require("run-sequence");
var del = require("del");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var mqpacker = require("css-mqpacker");
var sortCSSmq = require('sort-css-media-queries');
var sourcemaps = require('gulp-sourcemaps');
var webp = require("gulp-webp");



gulp.task("clean", function () {
  return del("build");
});

gulp.task('svg-clean', function () {
  return gulp.src('src/img/*' +
    '.svg')
    .pipe(svgmin({
      plugins: [{
        removeViewBox: false
      }, {
        cleanupNumericValues: {
          floatPrecision: 2
        }
      },
        {
          convertColors: {
            names2hex: false,
            rgb2hex: false
          }
        }, {
          removeDimensions: false
        }]
    }))
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(gulp.dest('src/img'));
});

gulp.task("scripts", function() {
  return gulp.src(["src/js/*.js"])
    .pipe(concat("scripts.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("build/js"));
});

gulp.task("svg-sprite", function () {
  return gulp.src("src/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("svg-sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("images", function () {
  return gulp.src("src/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("src/img"));
});

gulp.task("webp", function() {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"));
});



gulp.task("style", function() {
  gulp.src("src/less/style.less")
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: [
          "last 1 version",
          "last 2 Chrome versions",
          "last 2 Firefox versions",
          "last 2 Opera versions",
          "last 2 Edge versions",
          "IE 11"
        ]}),
      mqpacker({
        sort: sortCSSmq
      })
    ]))
    .pipe(gulp.dest("src/css"))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(sourcemaps.write('.'))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
  });

gulp.task("html", function () {
  gulp.src("src/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"))
    .pipe(server.stream());
});

gulp.task("build", function (done) {
  run(
    "clean",
    "svg-sprite",
    "copy",
    "style",
    "scripts",
    "html",
    done);
});


gulp.task("copy", function () {
  return gulp.src([
    "src/fonts/**/*.{woff,woff2}",
    "src/img/*.{svg,png,jpg,gif}",
    "src/js/*.js",
    "src/*.html",
    "src/favicon.ico",
    "src/site.webmanifest",
    "src/icon.png"

  ], {
      base: "src"
    })
    .pipe(gulp.dest("build"));
});


gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("src/less/**/*.less", ["style"]);
  gulp.watch("src/**/*.html", ["html"]).on("change", server.reload);
  gulp.watch(["src/js/*.js"], ["scripts"]).on("change", server.reload);
});
