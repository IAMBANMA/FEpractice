//同步读取文件,就不需要回调函数了,直接返回结果.
'use strict';
var fs=require('fs');
var data=fs.readFileSync('hello.txt','utf-8');
console.log(data);
//如果同步读取文件发生错误,则需要使用try...catch捕获错误
//try{
//var data=fs.readFileSync('hello.txt','utf-8');
//console.log(data)
//}
