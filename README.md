# gulp-tobase64

A simple gulp plugin, used to convert image，audio，video into base64 string.

## Install

    npm install gulp-to－base64

## Usage

    var gulpBase64 = require("gulp-to-base64");
    gulpBase64(options);

### Example

    var tobase64 = require("gulp-to-base64");
    gulp.task('base64' , function(){
      return gulp.src("./images/*.{png,jpg,jpeg,mp3}")
		.pipe(gulpBase64({
			outPath:"./json.js"  //输出路径文件
		}))
		.pipe(gulp.dest('./test/'))
    });

## options API

outPath is filePath

