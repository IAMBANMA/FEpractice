'use strict';
var fs=require('fs');
fs.readFile('11.jpg',function(err,data){
if(err){console.log(err)}
else{console.log(data);
console.log(data.length+'bytes')
}
})
//使用node命令运行
//本例读取的11.jpg是图片,属于二进制文件,没有传人文件编码,回调函数的data参数返回一个Buffer对象
//nodejs中,Buffer对象就是一个包含零个或任意个字节的数组,Buffer对象可以转换成字符串:var text=data.toString('utf-8');
//或者把一个字符串转换成Buffer:var buf=new Buffer(text,'utf-8')
