var fs=require('fs');
var data='hello nodejs';
fs.writeFile('output.txt',data,function(err){
if(err){console.log(err)}
else(console.log('write file success!'))
})
//writeFile()的参数依次为文件名,数据和回调函数.如果传入的是string,默认按utf-8编码写入文本文件,如果传入的是Buffer,则写入的是二进制文件.
//回调函数只关心成功与否,因此只需要一个err参数
