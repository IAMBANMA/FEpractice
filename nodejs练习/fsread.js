'use strict';
var fs=require('fs');
fs.readFile('hello.txt','utf-8',function(err,data){//异步IO
if(err){console.log(err)}
else{console.log(data)}
})
//请注意hello.txt文件必须在当前目录下,且文件编码为utf-8
//使用node命令执行此文件
