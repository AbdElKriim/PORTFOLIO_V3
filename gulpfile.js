const { src } = require("gulp");
var gulp = require("gulp"),
    html_package = require("gulp-pug"),
    sass_package = require("gulp-sass"),
    minified     = require("gulp-minify"),
    concat       = require("gulp-concat"),
    mapping      = require("gulp-sourcemaps"),
    prefixer     = require("gulp-autoprefixer"),
    notification = require("gulp-notify"),
    liveReload   = require("gulp-livereload");

gulp.task("html" , function(){
    return gulp.src("project/pugFiles/*.pug")
            .pipe(html_package({pretty: true}))
            .pipe(gulp.dest("dist"))
            .pipe(liveReload())
});
gulp.task("sass" , function(){
    return gulp.src(["project/sassFiles/**/*.scss" , "project/sassFiles/**/*.css"])
            .pipe(mapping.init())
            .pipe(sass_package({outputStyle: "compact"}).on("error" , sass_package.logError))
            .pipe(prefixer())
            .pipe(concat("style.css"))
            .pipe(mapping.write("."))
            .pipe(gulp.dest("dist/css"))
            .pipe(liveReload())
});
gulp.task("script" , function(){
    return gulp.src("project/scriptFiles/*.js")
            .pipe(concat("script.js"))
            .pipe(minified())
            .pipe(gulp.dest("dist/js"))
            .pipe(liveReload())
})
gulp.task("watch" , function(){
    require("./server"); 
    liveReload.listen();
    gulp.watch("project/pugFiles/*.pug" , gulp.series("html"));
    gulp.watch(["project/sassFiles/**/*.scss" , "project/sassFiles/**/*.css"] , gulp.series("sass"));
    gulp.watch("project/scriptFiles/*.js" , gulp.series("script"));
});