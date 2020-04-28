const express = require('express')
const router = express.Router()
require('best-require')(process.cwd())

const device = require('~/models/device')
const { users } = require('../../models/users')

// 引入文件核心模块
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const upload = multer({ dest: './public/image/avatar' })

// 设备保修路由
router.post('/home/device', async (req, res) => {
    console.log(req.body)
    const data = await device.create(req.body)
    try {
        // 判断是否存入成功
        if (JSON.stringify(data) === '{}') return res.status(200).json({
            msg: '上报失败，请稍后再试',
            code: 0
        })
        return res.status(200).json({
            msg: '上报成功！',
            code: 1
        })
    } catch (e) {
        if (e) {
            console.log(e)
            return res.status(200).json({
                msg: '服务器崩溃，请稍后再试！',
                code: 500
            })
        }
    }

})

// 获取上报的设备信息
router.get('/home/device', async (req, res) => {
    const query = req.query
    // console.log(query)
    // 分页的字段，由字符串转换为数字
    const pagenum = parseInt(query.pagenum)
    const limit = parseInt(query.pagesize)
    let alldata
    let data
    try {
        // 根据id'获取对应信息
        if (query._id) {
            const databyid = await device.findOne(query)
            // 查询对应用户的头像
            if (query.username) {
                const avatardata = await users.findOne({$or:[{ 'username': query.username },{'email':query.username}]})
                if (!avatardata.avatar) return res.status(200).json({
                    msg: '获取数据失败！',
                    code: 5,
                })
                databyid.avatar = avatardata.avatar
            }
            if (JSON.stringify(databyid) === '{}') return res.status(200).json({
                msg: '获取数据失败！',
                code: 5,
            })
            return res.status(200).json({
                msg: '获取数据成功！',
                code: 1,
                data: databyid
            })
        }
        // 查询未处理用户
        if (query.query === '0') {
            data = await device.find({ 'status': 0 }).sort({ '_id': -1 }).skip((pagenum - 1) * limit).limit(limit)
            alldata = await device.find({ 'status': 0 })
        }
        // 搜索对应信息
        else if (query.query && query.query !== '0') {
            const Squery = JSON.parse(query.query)
            console.log(Squery)
            // 检查数据是否存在空值,有则删除
            for (index in Squery) {
                if (!Squery[index]) {
                    delete Squery[index]
                }
            }
            if(Squery.devicename){
                const reg = new RegExp(Squery.devicename,'i') 
                Squery.devicename = {$regex: reg }
             }
            console.log(Squery)
            // 根据用户的传参查询数据
            data = await device.find(Squery).sort({ '_id': -1 }).skip((pagenum - 1) * limit).limit(limit)
            if (data.length === 0) return res.status(200).json({
                msg: '没有查询到该数据!',
                code: 0
            })
            // 获取全部数据
            alldata = await device.find(Squery)
        }
        else if (query.username) {
            // 获取当前用户的预约信息
            alldata = await device.find({ 'username': query.username })
            data = await device.find({ 'username': query.username }).sort([['_id', -1]]).skip((pagenum - 1) * limit).limit(limit)
        } else {
            // 获取所有设备信息
            alldata = await device.find()
            //    对数据进行分页处理
            data = await device.find().sort([['_id', -1]]).skip((pagenum - 1) * limit).limit(limit)
        }
        // console.log(data)
        const total = alldata.length
        return res.status(200).json({
            code: 1,
            msg: '数据获取成功！',
            data,
            total
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            code: 500,
            msg: '服务器出错，请稍后再试！',
        })
    }
})

// 删除故障设备信息
router.delete('/home/device', async (req, res) => {
    const data = await device.deleteOne(req.query)

    if (data['ok'] === 1) {
        return res.status(200).json({
            code: 1,
            msg: '删除成功'
        })
    }
    return res.status(200).json({
        code: 0,
        msg: '删除失败！'
    })
})

// 修改设备信息
router.put('/home/device', async (req, res) => {
    // console.log(req.body)
    const body = req.body
    try {
        // 修改用户设备状态
        const data = await device.updateOne({ '_id': body._id }, body)
        if (!data.nModified) return res.status(200).json({
            msg: '数据未更改！',
            code: 0
        })
        return res.status(200).json({
            msg: '数据更新成功',
            code: 1,
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            code: 500,
            msg: '服务器出错，请稍后再试！！'
        })
    }

})

module.exports = router