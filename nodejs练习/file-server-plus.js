//本例是同目录下的file-server.js的增强版.他们都实现了一个http服务器,区别是本例建立的服务器在浏览器端访问127.0.0.1:8080即可进入网页.而file-server.js则必须将详细的文件地址写明
//127.0.0.1:8080/index.html.否则就报错.改变是:增强版在访问路径判断上增加了,如果访问路径没有指明资源文件,而是目录的话,会自动在目录下搜索index.html文件,如果搜索到了就返回给浏览器
'use strict';
var fs=require('fs'),
http=require('http'),
path=require('path'),
url=require('url');
var root=path.resolve(process.argv[2]||'.');
var server=http.createServer(function(req,res){
var pathname=url.parse(req.url).pathname;
var filepath=path.join(root,pathname);
fs.stat(filepath,function(err,stat){
if(!err){
filepath=stat.isFile()?filepath:path.join(filepath,'/index.html')
console.log('200'+filepath);
res.writeHead(200);
fs.createReadStream(filepath).pipe(res);
}
}
)
}).listen(8080);
console.log('server is running at http://127.0.0.1:8080/')
