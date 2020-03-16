const express = require('express')
// 调用express.router方法
const router = express.Router()

// 引入数据库model
const { users, navs } = require('./models/users')
const { programs } = require('./models/program')
// const history = require('./models/history')

// 引入文件核心模块
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const upload = multer({ dest: './public/image/avatar' })

// 引入md5加密包
const md5 = require('js-md5')
const Jwt = require('jsonwebtoken');//模块引入
const secret = 'manager'; //定义密钥 


// 删除文件的方法
function deleteFile(delPath, direct) {
    delPath = direct ? delPath : path.join(__dirname, delPath)
    try {
        /**
         * @des 判断文件或文件夹是否存在
         */
        if (fs.existsSync(delPath)) {
            fs.unlinkSync(delPath);
        } else {
            console.log('inexistence path：', delPath);
        }
    } catch (error) {
        console.log('del error', error);
    }
}
// deleteFile("/public/image/program/e82ba64544a1aec3480de4dd849f803905b7dbaa1eafa1e33ab485e8a0d7aece.jpg")
// users.updateOne({'username':'Asunat'},{'avatar':'/public/image/avatar/avatar.jpg'},function(err,doc){
//     if(err){
//         console.log(err)
//     }
//     return console.log(doc)
// })

// 处理home界面导航数据请求
router.get('/home/navs', async (req, res) => {
    try {
        const data = await navs.find()

        return res.status(200).json({
            code: 1,
            user: req.session.user,
            data: data
        })
    } catch (e) {
        return res.status(500).json({
            code: 500,
        })
    }
})
// 处理登录请求
router.post('/login', async (req, res) => {
    // 接受客户端发送发送过来的post数据
    try {
        const body = req.body
        body.password = md5(md5(body.password))
        // 从数据库中查询数据
        if (!(await users.findOne({ "username": body.username }))) {
            return res.status(200).json({
                error_code: -1,
                msg: '用户名错误或未注册'
            })
        }
        if (!(await users.findOne({ "password": body.password }))) {
            return res.status(200).json({
                error_code: 0,
                msg: '密码错误'
            })
        }
        // 将查询到的数据保存到session中
        const data = await users.findOne({ "username": body.username })
        req.session.islogin = true
        req.session.user = data
        // 设置验证token
        const token = Jwt.sign(Object.assign({}, data.username), secret, {
            expiresIn: 60 * 60 * 2 // 过期时间
        })
        // console.log(req.session.user)
        return res.status(200).json({
            error_code: 1,
            msg: '登录成功',
            token
        })
    } catch (e) {
        console.log(e)
    }
})
// 处理注册请求
router.post('/registered', (req, res) => {
    const body = req.body
    // console.log(body)
    // 使用$or查询用户名或者邮箱
    users.findOne({
        "$or": [{ "username": body.username },
        { "email": body.email }]
    })
        .then(result => {
            // console.log(result)
            // 如果可以查询到结果，则证明用户存在
            if (result) {
                return res.status(200).json({
                    error_code: 0,
                    msg: '用户名或者邮箱已存在'
                })
            } else {
                // 否则证明用户不存在，就往数据库里添加这条数据
                body.password = md5(md5(body.password))
                new users(body).save((err, data) => {
                    if (err) {
                        return res.status(500).json({
                            error_code: 500,
                            msg: '服务器繁忙，请稍后再试'
                        })
                    } else if (data) {
                        // 数据存入成功
                        return res.status(200).json({
                            error_code: 1,
                            msg: '用户注册成功'
                        })
                    }
                })
            }

        })
        .catch(err => {
            // 返回错误
            return res.status(500).json({
                error_code: 500,
                msg: '服务器繁忙。请稍后再试'
            })
        })

})

// 记录搜索历史记录的请求
router.put('/home/shistory', async (req, res) => {
    const body = req.body
    const value = req.body.value
    const username = req.body.username
    if (!body.value) return res.status(200).json({
        code: 0,
        msg: 'value为空！'
    })
    const val = await users.updateOne({
        'username': username,
        "history.value": { $ne: value }
    }, {
        $push: {
            'history': { 'value': value }
        }
    })
    if (!val.nModified) return res.status(200).json({
        code: 5,
        msg: '已存在'
    })
    return res.status(200).json({
        code: 1,
        msg: '添加记录成功！'
    })
})
// 处理删除用户搜索记录的请求
router.delete('/home/shistory', async (req, res) => {
    const id = req.query.id
    const username = req.query.username
    try {
        const data = await users.updateOne({ 'username': username }, { "$pull": { "history": { "_id": id } } })
        // console.log(data)
        if (data.nModified) {
            return res.status(200).json({
                code: 1,
                data: data,
                msg: '删除成功',
            })

        }
        return res.status(200).json({
            code: 0,
            msg: '删除失败！'
        })
    } catch (e) {
        console.log(e)
    }

})

// 上传用户头像
router.post('/home/upload/avatar', upload.single('avatar'), async (req, res) => {
    let oldfilename = req.file.destination + "/" + req.file.filename
    let newfilename = req.file.destination + '/' + req.file.filename + req.file.originalname
    console.log(req.body)
    try {
        let username = req.body.username
        const img = await users.findOne({ 'username': username })
        // 更新前删除对应图片
        deleteFile(img.avatar)
        // 更改头像
        fs.rename(oldfilename, newfilename, async (err) => {
            if (err) return res.status(200).json({
                code: 500,
                msg: '服务器出错！！！'
            })
            let curavatar = newfilename.slice(1)
            const data = await users.updateOne({ 'username': username }, { 'avatar': curavatar })
            if (!data.nModified) return res.status(200).json({
                code: 0,
                msg: '更新失败',
            })
            return res.status(200).json({
                code: 1,
                msg: '更新头像成功'
            })

        })
    } catch (e) {
        console.log(e)
    }

})



module.exports = router
