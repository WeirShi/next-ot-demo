const url = require('url');
const path = require('path');
const fs = require('fs');

function getErrorInfo(errorType) {
  // 省略代码
}

function writeErrorPage(response, errorType) {
  // 省略代码
}

exports.register = function(request, response, mapping) {
  // 解析请求路径
  var pathName = url.parse(request.url).pathname;
  console.log('pathName', pathName)
  // 执行相应请求路径的回调函数
  for(let i = 0, len = mapping.length;i < len;i++) {
    if(mapping[i].url === pathName) {
      mapping[i].handler(request, response);
      return;
    }
  }

  // 请求路径为文件返回文件内容
  var file = path.join(__dirname, '..' + pathName);
  console.log('file', file)
  fs.exists(file, function(exists) {
    // 请求路径不存在返回404页面
    console.log('exists', exists)
    if(!exists) {
      writeErrorPage(response, 'NOT_FOUND');
    }
    else {
      var stat = fs.statSync(file);
      // 请求路径为目录返回403页面
      if(stat.isDirectory()) {
        writeErrorPage(response, 'FORBIDDEN');
      }
      else {
        response.writeHeader(200, {
          "Content-Type" : "text/html"
        });
        response.end(
          fs.readFileSync(file, 'utf-8')
        );
      }
    }
  });
}
