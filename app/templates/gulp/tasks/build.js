var gulp = require('gulp'),
  runSequence = require('run-sequence').use(gulp);

/**
 * Build task.
 */
gulp.task('build:js', function(done) {
  runSequence(
    ['copy:js'],
    ['html2js'],
    ['concat:js'],
    ['wrap:js'],
    ['uglify'],
    done
  );
});

gulp.task('build:css', function(done) {
  runSequence(
<% if (styles === 'css') { -%>
    ['copy:css'],
<% } else { -%>
    ['<%= styles %>'],
<% } -%>
    ['concat:css'],
    ['wrap:css'],
    done
  );
});

gulp.task('build', function(done) {
  runSequence(
    ['clean:index', 'clean:tmp', 'clean:dist'],
    ['build:js', 'build:css'],
    ['inject:app'],
    done
  );
});
