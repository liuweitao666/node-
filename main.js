const express = require('express')
const app = express()
// 引入路由
const router = require('./router')
const rusers = require('./router/home/users')
const rprograms = require('./router/home/program')
const rvideo = require('./router/home/videos')
const rcomment = require('./router/comments')
const rdevice= require('./router/home/device')

// 
const bodyParser = require('body-parser')
const session = require('express-session')

const expressJwt = require('express-jwt');//jwt模块引入
const secret = 'manager'; //定义密钥 


// 暴露静态资源
app.use('/public',express.static('public'))
app.use(express.static('dist'))

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


// jwt错误处理
// app.use((ctx, next) => {
//     return next().catch((err) => {
//         if(err.status === 401){
//             ctx.status = 401;
//             ctx.body = 'Protected resource, use Authorization header to get access\n';
//         }else{
//             throw err;
//         }
//     })
// })

// 验证token
app.use(expressJwt({
    secret
}).unless({
    path: ['/login','/registered','/sendmCode','/login/mail']  //除了这些地址，其他的URL都需要验证
}));

app.engine('html', require('express-art-template'));
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded 
app.use(bodyParser.json())

// session，虽然没用到
app.use(session({
    secret: 'tvmaneger',
    resave: false,
    saveUninitialized: true,
}))

// 挂载路由
app.use(router)
app.use(rusers)
app.use(rprograms)
app.use(rvideo)
app.use(rcomment)
app.use(rdevice)

app.listen(3000, () => {
    console.log('serve is running... ')
})

