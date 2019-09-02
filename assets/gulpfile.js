const gulp = require('gulp');
const sass = require('gulp-sass');
const browsersync = require('browser-sync').create();


function style(){
    return gulp.src("./css/*.scss")
    .pipe(sass())
    .pipe(gulp.dest('./css/style.css'))

    .pipe(browsersync.stream());
}


function watch (){

browsersync.init({
    server:{
        baseDir:'./'
    }
});
    gulp.watch("./css/*.scss",style);
    
}
exports.watch = watch;
exports.style = style;