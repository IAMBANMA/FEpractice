//在浏览器端向服务器端发送请求时的url需要指明文件名index.html.否则会请求失败.
'use strict';
var fs=require('fs'),
    url=require('url'),
    path=require('path'),
    http=require('http');
var root=path.resolve(process.argv[2]||'.');
console.log('static root dir :'+root);
var server=http.createServer(function(req,res){
var pathname=url.parse(req.url).pathname;
var filepath=path.join(root,pathname);
fs.stat(filepath,function(err,stat){
if(!err&&stat.isFile()){
console.log('200'+req.url);
res.writeHead(200);
fs.createReadStream(filepath).pipe(res);
}else{
console.log('404'+req.url);
res.writeHead(404);
res.end('404 NOT FOUND')
}

})

}).listen(8080);
console.log('server is running at http://127.0.0.1:8080');
















