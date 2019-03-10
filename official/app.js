/**
 * app.user() ----在指定的路径上安装指定的中间件函数：当请求的路径的基数匹配时，执行中间件函数path
 * app.set() ----应用程序设置
 * 
 */
var http = require('http')
var createError = require('http-errors')
const express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

const app = express()

// Application（应用程序设置）
// views: 应用程序视图的目录或目录数组。如果是数组，则按照它们在数组中出现的顺序查找视图。
// view engine: 试图引擎设置
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

//log only 4xx and 5xx responses to console
app.use(logger('dev'))
app.use(express.json()) // express.json() 此中间件在Express v4.16.0及更高版本中可用。
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

app.use('/', indexRouter)
app.use('/users', usersRouter)

// 由于path默认为“/”，因此对应用程序的每个请求都将执行没有路径安装的中间件
// 例如，对应用程序的每个请求都将执行此中间件功能
// 中间件功能按顺序执行，因此中间件包含的顺序很重要
// this middleware will not allow the request to go beyond it
// app.use(function(req, res, next) {
//   res.send('Hello World');
// });

// // requests will never reach this route
// app.get('/', function (req, res) {
//   res.send('Welcome');
// });
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404))
})

app.use(function(err, req, res, next) {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    res.status(err.status || 500)
    res.render('error')
})
// app.get('/', (req, res) => res.send('Hello World!'))

// var server = http.createServer(app)
app.listen(3000, () => console.log('Example app listening on port 3000!'))