var through = require("through-gulp"); 
var fs = require('fs');
var path = require("path");
var gutil = require('gulp-util');
var sizeOf = require('image-size');

/**
 * [getFileBaseType 返回文件base64位类型值，如data:image/jpg;base64,]
 * @param  {[type]} pathurl [文件路径]
 */
function getFileBaseType(pathurl){
    var extName = path.extname(pathurl);
    var fileName = path.basename(pathurl,extName);  
    extName = extName.replace(".","").toLowerCase();
    if(/.*\.png|jpg|gif|bmp$/.test(pathurl)){
        var baseType = "data:image/"+extName+";base64,"
        return baseType;
    }else if(/.*\.mp3|m4a|ogg|wav|wma$/.test(pathurl)){
        var baseType = "data:audio/"+extName+";base64,"
        return baseType;        
    }else if(/.*\.mp4|webm$/.test(pathurl)){
        var baseType = "data:video/"+extName+";base64,"
        return baseType;       
    }else if(/.*\.ttf$/.test(pathurl)){
        var baseType = "data:application/x-font-ttf;base64,"
        return baseType;          
    }else if(/.*\.svg$/.test(pathurl)){
        var baseType = "data:image/svg+xml;base64,"
        return baseType; 
    }
    return false;  
}

/**
 * [base64_encode 读取文件转换为base64]
 */
function base64_encode(file) {
    // 读取二进制文件
    var bitmap = fs.readFileSync(file);
    // 转换为base64位
    return new Buffer(bitmap).toString('base64');
}

/**
 * [base64_decode base64转换为文件]
 */
function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
}


/**
 * [writeToFile 写入文件]
 * @param  {[type]} data [数组数据列表或对象列表]
 * @param  {[type]} path [写入的路径]
 */
function writeToFile(data,path,calllback){
    var data = JSON.stringify(data,null, "\t");
    fs.writeFile(path,data,"utf-8",function(err){
        if(err) throw err;
        calllback && calllback();
    });
}


function convertBase64(opts) {
  var fileList = {},i = 0;

  //通过through创建流stream
  var stream = through(function(file, encoding,callback) {

    //进程文件判断
    if (file.isNull()) {
         throw "NO Files,Please Check Files!"
    }

    if (file.isBuffer()) {
        //拿到单个文件buffer
        var content = file.contents;
        var extName = path.extname(file.path);
        var fileName = path.basename(file.path,extName);

        extName = extName.replace(".","").toLowerCase();

        var fileType = getFileBaseType(file.path);

        if(fileType){
            if(/^data:image\/(png|jpg|gif|bmp)/.test(fileType)){
              fileList[fileName] = {"base64": fileType+file.contents.toString('base64'), width: sizeOf(file.path).width, height: sizeOf(file.path).height};
            }else{
              fileList[fileName] = {"base64": fileType+file.contents.toString('base64')};
            } 
        }        
    }
    if (file.isStream()) {
        console.log(opts.size);
        var fileType = getFileBaseType(file.path);
 

        if(fileType){
            if(/^data:image\/(png|jpg|gif|bmp)/.test(fileType)){
              fileList[fileName] = {"base64": fileType+file.contents.toString('base64'), width: sizeOf(file.path).width, height: sizeOf(file.path).height};
            }else{
              fileList[fileName] = {"base64": fileType+file.contents.toString('base64')};
            } 
        }        

    }

      this.push(file);

      i++;

      callback();
    },function(callback) {
      if(!opts.size){
        for(var key in fileList){
            fileList[key] = fileList[key].base64
        }
      }
      writeToFile(fileList,opts.outPath,function(){
        gutil.log(gutil.colors.red(i)+gutil.colors.green("个文件已经处理完毕！"));
      })
      
      callback();
    });
  
  //返回这个流文件
  return stream;
};
  
module.exports = convertBase64;

