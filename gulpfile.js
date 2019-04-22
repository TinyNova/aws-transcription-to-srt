'use strict';

const _ = require('lodash');
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');

const REPORTS_DIR = './coverage/';

const codeDirs = [
    './index.js'
];

function test (target) {
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
        .once('end', () => process.exit());
}

gulp.task('lint', () => {
    return gulp
        .src(codeDirs)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('test', ['lint'], function () {
    return test(['./tests/**/*.js']);
});
