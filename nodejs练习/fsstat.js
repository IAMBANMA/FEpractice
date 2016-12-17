'use strict';
var fs=require('fs');
fs.stat('output.txt',function(err,stat){
if(err){console.log(err)}
else{
console.log('output.txt is a file :'+stat.isFile());
console.log('output.txt size is :'+stat.size);
console.log('output.txt is birth at :'+stat.birthtime)
}
})
