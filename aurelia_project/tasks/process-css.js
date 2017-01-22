import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import merge from 'merge-stream';
import changedInPlace from 'gulp-changed-in-place';
import project from '../aurelia.json';
import {build} from 'aurelia-cli';

export default function processCSS() {
    var scss = gulp.src(project.cssProcessor.source)
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(build.bundle());

    var css = gulp.src("src/**/*.css")
        .pipe(changedInPlace({ firstPass: true }))
        .pipe(build.bundle());

    return merge(scss, css);
}