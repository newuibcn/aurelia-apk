/**
 * Created by Alex on 14/03/2016.
 */
var gulp = require('gulp');
var exec = require('child_process').exec;
var prompt = require('gulp-prompt');
var promptInput;

gulp.task('fill-data', function(){
    return gulp.src(paths.exportSrv)
        .pipe(prompt.prompt([{
            type: 'input',
            name: 'username',
            message: 'Enter git username'
        },{
            type: 'input',
            name: 'email',
            message: 'Enter git email'
        },{
            type: 'password',
            name: 'password',
            message: 'Enter git password'
        }], function(res){
            promptInput = res;
        }));
});

gulp.task('config', function(cb){
    exec('cd export && git config user.email ' + promptInput.email, function(err, stdout, stderr){
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('pull', function(cb){
    exec('git fetch --all && git reset --hard origin/master', function(err, stdout, stderr){
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('prompt-tag', function(){
    return gulp.src('./')
        .pipe(prompt.prompt([{
            type: 'input',
            name: 'tagVersion',
            message: 'Enter tag version'
        },{
            type: 'input',
            name: 'tagAnnotation',
            message: 'Enter tag annotation'
        }], function(res){
            promptInput['tag-version'] = res.tagVersion;
            promptInput['tag-annotation'] = res.tagAnnotation;
        }))
})

gulp.task('tag', ['prompt-tag'], function(cb){
    exec('git tag -a ' + promptInput.tagVersion + ' -m ' + promptInput.tagAnnotation +
        'git push origin ' + promptInput.tagVersion, function(err, stdout, stderr){
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('test', ['fill-data'], function(cb){
    exec('git push origin --delete test && git checkout -b test && git push origin test', function(err, stdout, stderr){
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('release', ['fill-data'], function(cb){
    exec('git push origin --delete release && git checkout -b release && git push origin release', function(err, stdout, stderr){
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});