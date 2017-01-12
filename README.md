# gulp-to-base64

A simple gulp plugin, used to convert image(png|jpg|gif)，audio(mp3|m4a|ogg|wav|wma)，video(mp4|webm), font(ttf|svg) into base64 string.

## Install

    npm install gulp-to-base64

## Usage

```
    var gulpBase64 = require("gulp-to-base64");
    gulpBase64(options);
```

## Example

```
    var gulpBase64 = require("gulp-to-base64");
    gulp.task('base64' , function(){
      return gulp.src("./images/*.{png,jpg,jpeg,mp3,svg,ttf}")
		.pipe(gulpBase64({
			size: true  // false by default  , if true , write the width height
			outPath:"./json.js"  //output file path
		}))
    });
```

## Generate Structures
	
If size is false

```
	{
		file name : base64 encode
	}
```	

to true

```
	{
		file name : {base64: base64 encode, width: xx, height: xx}, //image
		file name : {base64: base64 encode}  //xx.ttf,xx.svg,mp3,mp4  
	}
```	

## Interface Options


`outPath` is file path.
