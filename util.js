// const { models } = require('./models/users')

const nodemailer = require("nodemailer");

// 查询方法
exports.find = async (models, req) => {
    // console.log(req)
    // 查询数据
    let data
    const alluser = await models.find()
    const total = alluser.length
    if (req.type === 'total') {
        return {
            result: alluser,
            total,
            code: 200,
            msg: '数据获取成功'
        }
    }
    const query = req.username || req._id ? req : JSON.parse(req.query)
    // 对query的键值进行分离
    let key
    for (let k in query) {
        key = k
        value = query[k]
    }
    const limit = parseInt(req.limit)
    const pagenum = req.pagenum
    const reg = new RegExp(query[key], 'i')
    // console.log(query)
    if (query[key]) {
        data = await models.find({
            '$or': [
                { username: { $regex: reg } },
                { _id: query._id },
                { email: query.username }
            ]
        }
        )
        // console.log(data)
        if (data.length === 0) return {
            code: 0,
            msg: '查询失败，数据不存在'
        }
        return {
            result: data,
            code: 1,
            msg: '查询成功'
        }
    }

    // 获取当前users表的全部数据

    // console.log(alluser)
    // 限制查询
    if (req.type === 'common') {
        data = await models.find({ 'status': 0 }).skip((pagenum - 1) * limit).limit(limit)
    } else {
        data = await models.find().skip((pagenum - 1) * limit).limit(limit)
    }
    if (data.length === 0) return {
        code: 0,
        msg: '数据获取失败'
    }
    // 返回查询的数据
    return {
        result: data,
        total,
        code: 200,
        msg: '数据获取成功'
    }
}

// 删除方法
exports.deleted = async (models, params) => {
    const user = await models.find({ '_id': params._id })
    if (user[0].username && user[0].username === 'Asunat') {
        return {
            code: 100
        }
    }
    const data = await models.deleteOne(params)
    // console.log(data)
    if (!data) return {
        code: 0
    }
    return {
        code: 1,
        result: data
    }
}

// 修改方法
exports.updated = async (models, body) => {
    const id = body._id
    try {
        const data = await models.updateOne({ '_id': id }, body)
        // console.log(data)
        if (data.ok !== 1) return {
            code: 0,
            msg: '数据更新失败'
        }
        return {
            code: 1,
            msg: '数据更新成功'
        }
    } catch (e) {
        console.log(e)
    }

}
// 查询指定数组中的数据
exports.findOne = async (models, body) => {
    const program = await models.findOne({ 'title': body.title })
    console.log(program)
    let index = program.data.findIndex((item) => {
        return item._id == body.id
    })
    if (index === -1) return {
        code: 500,
        msg: '查询失败,没有收录该视频!'
    }
    // moogoose查询数据内嵌数组数据方法
    const finddata = await models.findOne({ title: body.title }, { data: { $slice: [index, 1] } })
    return finddata
}

// 发送邮箱验证码的方法
exports.sendCode = async (code, mail) => {
    "use strict";
    //   let testAccount = await nodemailer.createTestAccount();
    console.log(code)
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'qq',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: '1352819275@qq.com', // generated ethereal user
            pass: 'fgzlafpsdpzzjacj' // generated ethereal password
        }
    });
    let mailoptions = {
        from: '"我是你的乖乖 👻" <1352819275@qq.com>', // sender address
        to: mail, // list of receivers
        subject: "欢迎注册TV管理系统！", // Subject line
        // text: "Hello world?", // plain text body
        html: `<b>您的验证码是${code},有效时间为3分钟！</b>` // html body
    }
    // send mail with defined transport object 发送邮件
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailoptions, (err) => {
            if (err) {
                return reject({
                    code: 500,
                    msg: '发送验证码失败，请稍后再试！'
                })
            }
            return resolve({
                code: 200,
                msg: '发送验证码成功，请前往邮箱查看！'
            })
        });

    })

    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}