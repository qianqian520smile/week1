var gulp = require('gulp');
var sass = require('gulp-sass'); //编译scss
var clean = require('gulp-clean-css'); //压缩css
var concat = require('gulp-concat'); //合并文件
var uglify = require('gulp-uglify'); //压缩js
var server = require('gulp-webserver'); //起服务

gulp.task('devSass', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass()) //编译scss
        .pipe(gulp.dest('./src/css/'))
})

//监听
gulp.task('watch', function() {
    return gulp.watch('./src/scss/**/*.scss', gulp.series('devSass'))
})

//启服务
gulp.task('browserSync', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090,
            open: true,
            liveonloade: true
        }));
})


//默认执行
gulp.task('default', gulp.series('devSass', 'browserSync', 'watch'))



//压缩css
gulp.task('bSass', function() {
    return gulp.src('./src/css/**/*.css')
        .pipe(clean()) //压缩css
        .pipe(gulp.dest('./dist/css/'))
})

gulp.task('bJs', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(uglify()) //压缩js
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/js/'))
})

gulp.task('bulid', gulp.series('bSass', 'bJs'))