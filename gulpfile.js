const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageResize = require('gulp-image-resize');

gulp.task('default', () =>{
    gulp.src('assets/img/bg/**/*')
        .pipe(imageResize({
          width : 1920,
          height : 1080,
          crop : true,
          upscale : false,
          quality: 0.85
        }))
        .pipe(imagemin())
        .pipe(gulp.dest('static/bg/'))

        gulp.src('assets/img/bg/**/*')
            .pipe(imageResize({
              width : 768,
              height : 1024,
              crop : true,
              upscale : false,
              quality: 0.85
            }))
            .pipe(imagemin())
            .pipe(gulp.dest('static/bg-mobile/'))
});
