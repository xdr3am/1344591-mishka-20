const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const pipeline = require("readable-stream").pipeline;
const sync = require("browser-sync").create();

// Clean

const clean = () => {
  return del("build");
};

exports.clean = clean;

// Copy

const copy = () => {
  return gulp
    .src(
      [
        "source/fonts/**/*.{woff,woff2}",
        "source/img/**",
        "source/js/**",
        "source/*.html",
      ],
      {
        base: "source",
      }
    )
    .pipe(gulp.dest("build"));
};

exports.copy = copy;

// Styles

const styles = () => {
  return gulp
    .src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
};

exports.styles = styles;

// Imagemin

const images = () => {
  return gulp
    .src("source/img/**/*.{jpg,png,svg}")
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo(),
      ])
    );
};

exports.images = images;

// Webp

const createWebp = () => {
  return gulp
    .src("source/img/**/*.{jpg,png}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("source/img"));
};

exports.createWebp = createWebp;

// Svg-sprite

const sprite = () => {
  return gulp
    .src("source/img/**/icon-*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
};

exports.sprite = sprite;

// Html

const html = () => {
  return gulp
    .src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
};

exports.html = html;

// Js

const jsmin = () => {
  return gulp.src("source/js/*.js").pipe(uglify()).pipe(gulp.dest("build/js"));
};

exports.jsmin = jsmin;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
};

exports.default = gulp.series(styles, server, watcher);

// build

const build = gulp.series(
  clean,
  copy,
  styles,
  images,
  createWebp,
  sprite,
  html,
  jsmin
);

exports.build = build;
