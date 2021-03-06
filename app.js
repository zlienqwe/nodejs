var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// 加载依赖库

var routes = require('./routes/index');
var users = require('./routes/users');
// 加载路由控制


var app = express();
// 创建项目实例

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 定义EJS模板引擎和模板文件位置，也可以使用jade或其他模型引擎

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// 定义icon图标

app.use(logger('dev'));
// 定义日志和输出级别

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// 定义数据解析器

app.use(cookieParser());
// 定义cookie解析器

app.use(express.static(path.join(__dirname, 'public')));
// 定义静态文件目录

app.use('/', routes);
app.use('/users', users);
// 匹配路径和路由

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// 404错误处理

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// 开发环境，500错误处理和错误堆栈跟踪

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
// 生产环境，500错误处理

module.exports = app;
// 输出模型app

