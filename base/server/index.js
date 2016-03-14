/**
 * Created by Alex on 14/03/2016.
 */
var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('pull', function(cb){
    exec('git pull', function(err, stdout, stderr){
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('test', function(cb){
    exec('git checkout test && git reset --hard origin/master', function(err, stdout, stderr){
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('release', function(cb){
    exec('git checkout release && git reset --hard origin/test', function(err, stdout, stderr){
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});