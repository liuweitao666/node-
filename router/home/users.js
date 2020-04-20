const express = require('express')
// 调用express.router方法
const router = express.Router()

// 引入数据库model
const { users } = require('../../models/users')

const { find, deleted, updated } = require('../../util')

// 处理获取用户表单请求
router.get('/home/users', async (req, res) => {
    // console.log(req.query)
    try {
        // 定义变量存储查询到的数据
        let data
        // 查询数据
        data = await find(users, req.query)
        // console.log(data)
        if (data.code === 0) {
            return res.status(200).json({
                code: 5,
                msg: data.msg
            })
        }
        if (data.code === 1) {
            return res.status(200).json({
                code: 1,
                data: data.result,
                msg: data.msg
            })
        }
        // 获取当前所有数据
        if (data.length === 0) return res.status(200).json({
            code: 0,
            msg: '数据获取失败',
        })
        res.status(200).json({
            code: 1,
            data: data.result,
            total: data.total,
            msg: data.msg
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            code: 0,
            msg: '服务器异常，请稍后再试！！'
        })
    }
})
// 处理编辑表单的请求
router.post('/home/users', async (req, res) => {
    const body = req.body
    console.log(body)
    try {
        // 更新用户的方法
        const data = await updated(users, body)
        console.log(data)
        // 返回用户的消息
        const msg = data.msg
        if (data.code === 1) {
            res.status(200).json({
                code: 1,
                msg
            })
        } else {
            res.status(200).json({
                code: 0,
                msg
            })
        }
    } catch (e) {
        if (e) {
            res.status(200).json({
                code: 500,
                msg: '请修改用户权限！！'
            })
        }
    }
})
// 处理删除用户的请求
router.delete('/home/users', async (req, res) => {
    const params = req.query
    try {
        const data = await deleted(users, params)
        console.log(data)
        if (data.code === 100) {
            return res.status(200).json({
                code: 100,
                msg: '管理员不可删除'
            })
        }
        if (data.code === 0) return res.status(200).json({
            code: 0,
            msg: '删除失败'
        })
        res.status(200).json({
            code: 1,
            data: data.result,
            msg: '删除成功'
        })
    } catch (e) {
        if (!e) {
            res.status(200).json({
                code: 500,
                msg: '服务器忙，请稍后再试！'
            })
        }
    }
})
// 处理删除历史记录
router.delete('/home/rehistory', async (req, res) => {
    const params = req.query
    // let data
    try {
        if(params.type){
            const data = await users.updateOne({ '_id': params.id }, {
                '$pull': {
                    'program': {}
                }
            })
            if(data.nModified!==1) return res.status(200).json({
                code:0,
                msg:'删除失败！'
            })
            return res.status(200).json({
                code:1,
                msg:'删除成功！'
            })
        }
        const data = await users.updateOne({ '_id': params.id }, {
            '$pull': {
                'program': { '_id': params._id }
            }
        })
        if (data.nModified !== 1) {
            return res.status(200).json({
                code: 0,
                msg: '删除失败'
            })
        }
        return res.status(200).json({
            code: 1,
            msg: '删除成功'
        })
    } catch (e) {
        if (e) {
            res.status(500)
        }
    }

})
// 处理支付请求
router.put('/home/pay', async (req, res) => {
    const params = req.body
    const price = params.price
    // 查询当前用户所欠金额
    const { result: userinfo } = await find(users, { 'username': params.username })
    // 判断缴费是否大于最大金额
    if (price > userinfo[0].minute) {
        return res.status(200).json({
            code: 200,
            msg: "超出最大欠费金额！"
        })
    }
    if (price == 0) {
        return res.status(200).json({
            code: 201,
            msg: "请输入金额！"
        })
    }
    if (price < 0) {
        return res.status(200).json({
            code: 500,
            msg: "请不要给自己增加负担！"
        })
    }
    // 消减金额，修改数据
    const newprice = userinfo[0].minute - price
    const data = await users.updateOne({'username':params.username}, {'minute':newprice})
    if(data.nModified!==1){
        return res.status(200).json({
            code:0,
            msg:"服务器出错，请稍后再试！"
        })
    }
    // 添加缴费记录
    const paymsg = await users.updateOne({
        'username':params.username,
    }, {
        $push: {
            'toll': {'price':price}
        }
    });
    return res.status(200).json({
        code: 1,
        msg: '缴费成功！！'
    })
})

module.exports = router