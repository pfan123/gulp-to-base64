# gulp-to-base64

A simple gulp plugin, used to convert image，audio，video into base64 string.

## Install

    npm install gulp-to-base64

## Usage

    var gulpBase64 = require("gulp-to-base64");
    gulpBase64(options);

## Example

    var tobase64 = require("gulp-to-base64");
    gulp.task('base64' , function(){
      return gulp.src("./images/*.{png,jpg,jpeg,mp3}")
		.pipe(gulpBase64({
			outPath:"./json.js"  //out file path
		}))
		.pipe(gulp.dest('./test/'))
    });

Generate json.js demo 

	{
		"file name":base64 encode
	}

## options API


outPath is file path.

