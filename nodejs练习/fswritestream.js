'use strict';
var fs=require('fs');
var ws=fs.createWriteStream('output.txt','utf-8');
ws.write('使用stream写入文本数据....\n');
ws.end();
 
