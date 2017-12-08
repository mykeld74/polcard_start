var gulp = require('gulp'),
    connect = require('gulp-connect-php'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    del = require('del');

gulp.task('connect', function() {
    connect.server({}, function() {
        browserSync({
            proxy: 'localhost/polcard_start'
        });
    });
    gulp.watch('./scss/*.scss', ['styles']);
    gulp.watch(['css/style.min.css', '**/*.html', '!node_modules/**']).on('change', function() {
        browserSync.reload();
    });
});

gulp.task('styles', function() {
    return gulp.src('./scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            style: 'expanded'
        }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./css'));
});

// gulp.task('scripts', function() {
//     return gulp.src('js/*.js')
//         .pipe(concat('all.js'))
//         .pipe(gulp.dest('js'))
//         .pipe(rename({
//             suffix: '.min'
//         }))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist'));
// });

gulp.task('build_files', function(){
  return gulp.src(['*/*', '*.*', '*/*/*', '!gulpfile.js', '!package.json', '!scss/**' , '!node_modules/**',  '!dist'])
  .pipe(gulp.dest('dist'));
});

gulp.task('clean', function(cb) {
    del(['dist/**'], cb)
});

gulp.task('default', ['connect', 'styles'], function() {});
gulp.task('build', ['build_files'], function() {});

