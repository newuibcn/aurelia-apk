/**
 * Created by alexvizcaino on 10/3/16.
 */
var gulp = require('gulp');
var args = require('../args');
var paths = require('../paths');
var del = require('del');
var runSequence = require('run-sequence');
var exec = require('gulp-exec');

gulp.task('cordova-clean', function(){
    return del(paths.apkRoot + 'www/', {force: true});
});

gulp.task('prepare-apk', function(){
    // Copy export to apk root folder (www)
    return gulp.src(paths.exportSrv + '**/*')
        .pipe(gulp.dest(paths.apkRoot + 'www/'));
});

gulp.task('run-device', function(){

    var reportOptions = {
        err: true, // default = true, false means don't write err
        stderr: true, // default = true, false means don't write stderr
        stdout: true // default = true, false means don't write stdout
    };

    console.log(args.platform);

    return gulp.src('../apk/')
        .pipe(exec('cd ../apk/ && cordova run ' + args.platform))
        .pipe(exec.reporter(reportOptions));
});

gulp.task('cordova-run', function(callback){
    return runSequence(
        'cordova-clean',
        'export',
        'prepare-apk',
        'run-device',
        callback
    )
});