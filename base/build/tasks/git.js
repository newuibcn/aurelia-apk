/**
 * Created by Alex on 14/03/2016.
 */
var gulp = require('gulp');
var exec = require('child_process').exec;
var runSequence = require('run-sequence');
var paths = require('../paths');
var prompt = require('gulp-prompt');
var promptInput = {
    username: "avizcaino-newuibcn",
    password: "8SG.899,(+hc",
    email: "avizcaino@newuibcn.com",
    commitMessage: "First"
}

gulp.task('git-init', function(cb){
    exec('cd export && git init && git remote rm origin && git remote add origin https://' + promptInput.username + ':' + promptInput.password + '@github.com/' + promptInput.username + '/test.git', function(err, stdout, stderr){
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('git-fill-data', function(){
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
        },{
            type: 'input',
            name: 'commitMessage',
            message: 'Enter commit message'
        }/*,{
            type: 'checkbox',
            name: 'branch',
            message: 'Choose branch',
            choices: ['master', 'test', 'release']
        }*/], function(res){
            promptInput = res;
        }));
});

gulp.task('git-config', function(cb){
    exec('cd export && git config user.email ' + promptInput.email, function(err, stdout, stderr){
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('git-commit', function(cb){
    exec('cd export && git add * ' +
        ' && git commit -m "' + promptInput.commitMessage +
        '" && git push -u -f origin master', function(err, stdout, stderr){
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('git-create-branches', function(cb){
    exec('cd export && git checkout -b test && git push origin test && git checkout -b release && git push origin release', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('git-merge', function(cb){
    exec('cd export && git fetch && git pull origin master', function(err, stdout, stderr){
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('first-deploy'/*, ['git-fill-data']*/, function(callback){
    return runSequence(
        'export',
        'git-init',
        'git-config',
        'git-commit',
        'git-create-branches',
        callback
    )
});

gulp.task('deploy', ['git-fill-data'], function(callback){
    return runSequence(
        'export',
        'git-init',
        'git-config',
        'git-merge',
        'git-commit',
        callback
    )
});