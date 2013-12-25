var gulp = require('gulp')
, uglify = require('gulp-uglify')
, coffee = require('gulp-coffee')
, less = require('gulp-less')
, csso = require('gulp-csso')
, clean = require('gulp-clean')
;
gulp.task('coffee', function() {
    gulp.src('public/coffee/**/*.coffee')
        .pipe(coffee())
        .pipe(gulp.dest('public/javascripts'));
});

gulp.task('js', function() {
    // Minify and copy all JavaScript (except vendor scripts)
    gulp.src(['public/javascripts/**/*.js', '!public/javascripts/vendor/**'])
        .pipe(uglify())
        .pipe(gulp.dest('build/javascripts'));

    // Copy vendor files
    gulp.src('public/javascripts/vendor/**')
        .pipe(gulp.dest('build/javascripts/vendor'));
});

gulp.task('less', function() {
    gulp.src('public/less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('css', function() {
    // Minify and copy all JavaScript (except vendor scripts)
    gulp.src(['public/stylesheets/**/*.css', '!public/javascripts/vendor/**'])
        .pipe(csso())
        .pipe(gulp.dest('build/stylesheets'));

    // Copy vendor files
    gulp.src('public/stylesheets/vendor/**')
        .pipe(gulp.dest('build/stylesheets/vendor'));
});

// Copy all static assets
gulp.task('copy', function() {
    gulp.src('public/images/**')
        .pipe(gulp.dest('build/images'));
    gulp.src('public/**/*.html')
        .pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
    gulp.watch('public/coffee/**', function(event) {
        gulp.run('coffee');
    });
    gulp.watch('public/less/**', function(event) {
        gulp.run('less');
    });
});

// The default task (called when you run `gulp`)
gulp.task('default', function() {
    gulp.run('coffee', 'js', 'less', 'css', 'copy');
});

gulp.task('clean', function() {
    gulp.src('build')
      .pipe(clean());
});
