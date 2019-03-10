var express = require('express');
var router = express.Router();

/* GET home page. */
// res.render() 函数
// res.render（view [，locals] [，callback]）
// 该view参数是一个字符串，它是视图文件来渲染的文件路径。这可以是绝对路径，也可以是相对于views设置的路径。如果路径不包含文件扩展名，则该view engine设置将确定文件扩展名。如果路径确实包含文件扩展名，则Express将为指定的模板引擎（via require()）加载模块，并使用加载的模块__express函数进行渲染。
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
