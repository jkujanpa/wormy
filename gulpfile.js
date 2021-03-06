var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('default', function () {
    return gulp.src('*.ts')
        .pipe(ts({
            noImplicitAny: true,
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', ['default'], function() {
    gulp.watch('*.ts', ['default']);
});