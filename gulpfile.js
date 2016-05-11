'use strict'

const gulp = require('gulp')
const electron = require('electron-connect').server.create()



var source = require('vinyl-source-stream'); // Used to stream bundle for further handling etc.
var browserify = require('browserify');
var watchify = require('watchify');
var watch = require('gulp-watch');
var reactify = require('reactify');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');


gulp.task('electron', () => {
    electron.start()
    gulp.watch('main.js', electron.restart);
    gulp.watch('./css/**/*.css', ['buildCSS']);
    gulp.watch('./app/**/*.js', ['browserify']);
    gulp.watch(['./app/index.html'], () => {
        electron.reload()
    })
})


gulp.task('browserify', function() {
    var bundler = browserify({
        entries: ['./app/index.js'], // Only need initial file, browserify finds the deps
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });
    var watcher = watchify(bundler);

    return watcher
        .on('update', function () { // When any files update
            var updateStart = Date.now();
            console.log('Updating!');

            watcher.bundle() // Create new bundle that uses the cache for high performance
                .pipe(source('bundle.js'))
                // This is where you add uglifying etc.
                .pipe(gulp.dest('./build/'));
            console.log('Updated!', (Date.now() - updateStart) + 'ms');
        })
        .bundle() // Create the initial bundle when starting the task
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./build/'));
});
gulp.task('buildCSS', function () {
    return gulp.src('./css/**/*.css')
        .pipe(concatCss("bundle.css"))
        .pipe(gulp.dest('./build/'));
});

gulp.task('buildJS', function() {
    return browserify('./app/index.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./build/'));
});


// Just running the two tasks
gulp.task('default', ['electron']);

gulp.task('build', ['buildJS', 'buildCSS']);
