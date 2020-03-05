const express = require('express')
const app = express()
const router = require('./router')
const rusers = require('./router/home/users')
const rprograms = require('./router/home/program')
const bodyParser = require('body-parser')
const session = require('express-session')

const expressJwt = require('express-jwt');//模块引入
const secret = 'manager'; //定义密钥 


app.use('/public',express.static('public'))

// 跨域处理
app.all('*', function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
    //可选，用来指定本次预检请求的有效期，单位为秒。在此期间，不用发出另一条预检请求。
    res.header('Access-Control-Max-Age', 1728000);//预请求缓存20天
    next();
});

app.use(expressJwt({
    secret
}).unless({
    path: ['/login','/registered']  //除了这些地址，其他的URL都需要验证
}));

app.engine('html', require('express-art-template'));
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded 
app.use(bodyParser.json())


app.use(session({
    secret: 'tvmaneger',
    resave: false,
    saveUninitialized: true,
}))

// 挂载路由
app.use(router)
app.use(rusers)
app.use(rprograms)

app.listen(3000, () => {
    console.log('serve is running... ')
})

