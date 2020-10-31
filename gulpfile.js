'use strict';

const _ = require('lodash');
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');

const REPORTS_DIR = './coverage/';

const codeDirs = [
    './index.js'
];

function test (target, done) {
    return gulp
        .src(target)
        .pipe(mocha({reporter : 'spec', timeout: 200000}))
        .once('error', (error) => {
            console.log(error);
            process.exit(1);
        })
        .once('error', (error) => {
            console.log(error);
            process.exit(1);
        })
        .once('end', () => {
            done();
            process.exit()
        });
}

gulp.task('lint', () => {
    return gulp
        .src(codeDirs)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('test', gulp.series('lint', function (done) {
    return test(['./tests/**/*.js'], done);
}));
