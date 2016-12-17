'use strict';
var fs=require('fs');
var rs=fs.createReadStream('hello.txt','utf-8');
rs.on('data',function(chunk){
console.log('DATA:');
console.log(chunk)
});
rs.on('end',function(){
console.log('the end');
});
rs.on('error',function(err){
console.log('ERR:'+err)
});
//在nodejs中,流也是一个对象,我们只需要响应流的事件就可以啦.
//流的事件有:data事件表示流的数据已经可以读取了
//end事件表示这个流已经到末尾了,没有数据可以读取了
//error事件表示出错了

//要注意,data事件可能会有多次,每次传递的chunk是流的一部分数据

//所有可以读取数据的流都继承自stream.Readable







