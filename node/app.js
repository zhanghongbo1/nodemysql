const express = require('express')
const app = express()
const router = require('./router')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const path = require('path')
const expressJwt = require('express-jwt')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressJwt({
  secret: 'loveyou',  // 签名的密钥 或 PublicKey
  algorithms:['HS256'],
}).unless({
  path: ['/work/login']  // 指定路径不经过 Token 解析
}))
/**
 * @param
 */
app.all('*', function (req, res, next) {
  //设为指定的域
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");

  next()

});
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {   
    console.log(err)
    //  这个需要根据自己的业务逻辑来处理（ 具体的err值 请看下面）
  res.status(401).send('invalid token...');
}

});
app.use('/', router)


app.listen(3000, () => {
  console.log('服务运行在http://localhost:3000')
})