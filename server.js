var settings = require('./settings');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var multer  = require('multer');

// 静态资源加载目录
app.use(express.static(__dirname));

// 使用上传文件中间件
app.use(multer({ dest: './uploads/'}));

// 根路由
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// 上传文件路由
app.post('/', function(req, res){
    //llog(Object.keys(req.body)); // form fields
    //llog(Object.keys(req.files.onixfile)); // form files
    for (var keys in req.files) {
        console.log(keys + ': ' + req.files[keys])
    }
    //var sendback = {
    //    name: req.files.onixfile.name,
    //    path: req.files.onixfile.path
    //};
    res.send(req.files);
});


// 打开 HTTP 监听
http.listen(settings.port, function() {
    lllog('Listening on ' + settings.host + ':' + settings.port);
});

// 日志输出函数
function llog(msg) {
    console.log((new Date()).toTimeString() + ' ### ' + msg);
}

function lllog(msg) {
    console.log('====================== START UP! ======================');
    llog(msg);
}