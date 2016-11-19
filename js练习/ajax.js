var http=require("http");
var server=http.createServer();
server.on("request",function(req,res){
	console.log("我是有请求时,在控制台显示的文本");
res.writeHead(200,{"Content-Type":"text/plain;charset=utf-8"});
res.write("我是服务器响应的文字");
res.end();

})
server.listen(8000);
console.log("server is running ...");
