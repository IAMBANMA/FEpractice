var http = require("http");
var url=require("url");
function star(router){
http.createServer(function(req, res) {
	var pathname=url.parse(req.url).pathname;
	router.route(pathname);
    res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
    res.write("hello world");
    res.end();

}).listen(8888);
console.log("server is running...");
}
exports.star=star;