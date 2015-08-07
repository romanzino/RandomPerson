var gulp = require('gulp'),
	uglify = require('gulp-uglify');


gulp.task('build', function() {
	gulp.src('./js/personGenerator.js')
		.pipe(uglify())
		.pipe(gulp.dest('./build'))
});

gulp.task('default', ['build']);