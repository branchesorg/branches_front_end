var fs = require('fs')
var exec = require('child_process').exec;
var gulp = require('gulp');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var run = require('gulp-run')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var concat = require('gulp-concat')
var pump = require('pump')
var gzip = require('gulp-gzip')
var babel = require('gulp-babel')
var mocha = require('gulp-mocha')
var typescript = require('gulp-typescript')
var webpack = require('webpack-stream')
var runSequence = require('run-sequence')
var sourcemaps = require('gulp-sourcemaps')
var CodeAndTestConfig = require('./webpack.config.productionandtest.rules.js')
var tslint = require("gulp-tslint");

var sourcemaps = require('gulp-sourcemaps');
var istanbul = require('gulp-istanbul');
var remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');
var del = require('del');
var ts = require('gulp-typescript');

var __coverageThreshold = 60;

//for the files that error out when used in ./vendor.js
gulp.task("build-funny-modules", function(){
    const jsDest = 'dist/funny/'
    const paths = ["./other_imports/taggle/jquery-1.10.1.js",  "./other_imports/taggle/taggle.js"/**/]
    return pump([
        gulp.src(paths),
        concat('funny.js'),
        gulp.dest(jsDest),
        rename('funny.min.js'),
        uglify(),
        gzip(),
        gulp.dest(jsDest),
        ]
    )
})

gulp.task("build-funny-modules2", function(){
    const jsDest = 'dist/build2/'
    const paths = ["./other_imports/taggle/jquery-1.10.1.js",  "./other_imports/taggle/taggle.js",/* "/dist/regenerator.js", "/dist/vendor.js", "/dist/build.js"*/]
    return  gulp.src(paths)
            .pipe(babel({presets: ['env']}))
            .pipe(concat('build2.js'))
            .pipe(gulp.dest(jsDest))
            .pipe(rename('build2.min.js'))
            .pipe(uglify())
            .pipe(gzip())
            .pipe(gulp.dest(jsDest))
})

gulp.task('build:clean', function() {
    return del([
        './transpiled',
        './coverage',
        './coverage-report'
    ]);
});

gulp.task("build-css", function(){
    const dest = 'dist/css/'
        // <link rel="stylesheet" type="text/css" href="app/static/css/taggle.css">
        // <link rel="stylesheet" type="text/css" href="other_imports/semantic/semantic-ui.min.css">
        // <link rel="stylesheet" type="text/css" href="other_imports/font-awesome.min.css" >
    const paths = ["app/static/css/taggle.css",/*"app/static/css/taggle.css",*/"other_imports/semantic/semantic-ui.min.css",/*"other_imports/font-awesome.min.css"/*  "./other_imports/taggle/taggle.js"*/]
    return pump([
            gulp.src(paths),
            concat('import.css'),
            gulp.dest(dest),
            rename('import.min.css'),
            uglify(),
            gzip(),
            gulp.dest(dest),
        ]
    )
})

function handleError(err) {
    console.log(err.toString())
    this.emit('end')
}

const paths = ['./*.ts', './**/*.ts', './**/**/*.ts', './**/**/**/*.ts', './**/**/**/**/*.ts']
// const paths = {
//     scripts: './app/**/*.ts',
//     tests: './test/*.ts',
gulp.task('coverage', function() {
    coverage()
    watch(paths, function(){
        console.log('file change detected!')
        coverage()
    })
})
gulp.task('test', function() {
    test()
})

gulp.task('build', function() {
    build()
})
gulp.task('build-and-test', function(done) {
    console.log('build and test!')
    runSequence('build','test', function() {
        done()
    })
})
// NOTE: the below cannot be run through npm. npm makes it use a local version of mocha or something which causes the typescript to not be compiled without errors
function coverage() {
    console.log('compute test coverage called')
    exec('nyc npm t', function(err, stdout, stderr){
        err && console.error(err)
        console.log(stdout)
        stderr && console.error(stderr)
    })
}
function build() {
    var tsProject = typescript.createProject('./tsconfig.json')
    console.log('building!')
    return gulp.src(paths.scripts, {base: '.'})
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write())
        /*flush to disk*/ // necessary or else mocha won't be able to find the files
        .pipe(gulp.dest('.'))
}
gulp.task("build:lint", function() {
    return gulp.src(["./**/*.ts", "!./node_modules/**/*", "!./typings/**/*"])
        .pipe(tslint({
            configuration:  {
                rules: {
                    "variable-name": true,
                    "quotemark": [true, "single"]
                }
            }
        }))
        .pipe(tslint.report("verbose", {
            emitError: true
        }));
});


gulp.task('build:clean', function() {
    return del([
        './transpiled',
        './coverage',
        './coverage-report'
    ]);
});

gulp.task('build', ['build:clean'], function() {
    var tsProject = typescript.createProject('./tsconfig.json')
    return gulp.src([
        './src/**/*.ts',
        './test/**/*.ts',
    ], { base: '.'})
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./transpiled'));
})
