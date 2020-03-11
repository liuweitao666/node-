const express = require('express')
// 调用express.router方法
const router = express.Router()

const Video = require('../../models/video')

// 处理Src视频链接
router.post('/home/video', async (req, res) => {

    const body = req.body
    // 找到src视频链接
    const src = body.src
    // console.log(src)
    try {
        const reap = await Video.find({ 'title': body.title })

        if (reap[0] && reap[0].title === body.title) {
            return res.status(200).json({
                code: 500,
                msg: '该视频已存在'
            })
        }
        // const data = await new Video(body).save()
        // console.log(data)
        const data = await Video.create({
            title: body.title,
            type: body.type,
            Src: src
        })

        if (data.Src === 0) return res.status(200).json({
            code: 0,
            msg: '视频添加失败！'
        })
        return res.status(200).json({
            code: 1,
            msg: '视频添加成功'
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            code: 505,
            msg: '服务器出错，请稍后再试！'
        })

    }

})

// 获取视频链接
router.get('/home/video', async (req, res) => {
    const params = req.query
    // console.log(params)

    try {
        // 找到对应标题得src，视频路径
        const data = await Video.find({ title: params.title })
        // console.log(data)
        const src = data[0].Src
        // 盘点是否获得了数据
        if (src.length === 0) {
            return res.status(200).json({
                code: 0,
                msg: '获取数据失败'
            })
        }
        return res.status(200).json({
            code: 1,
            msg: '获取数据成功',
            data: src
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            code: 500,
            msg: '服务器崩溃了，请稍后再试！'
        })
    }

})

// 编辑视频链接
router.put('/home/video', async (req, res) => {
    const body = req.body
    const data = await Video.find({ title: body.title })
    // 判断数据库中是否存在该数据，没有则添加
    if (data.length === 0) {
        const updata = await Video.create({
            title: body.title,
            type: body.type,
        })
    }
    console.log(body)
    const updatesrc = await Video.updateOne({ title: body.title }, { "$push": { "Src": { 'src': body.Src } } })
    if (!updatesrc.nModified) return res.status(200).json({
        code: 0,
        msg: '数据未更改！'
    })
    return res.status(200).json({
        code: 1,
        msg: '更新成功！'
    })
})
// 删除视频链接
router.delete('/home/video', async (req, res) => {
    // 获取参数
    const params = req.query
    try {
        const data = await Video.updateOne({ 'title': params.title }, {
            '$pull': {
                Src: { '_id': params.id }
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
        console.log(e)
    }

})

// 更新视频链接
router.put('/home/videoById', async (req, res) => {
    const body = req.body
    const id = body.id
    // console.log(body)
    try {
        // 修改数据中指定信息
        const  swhere = { 'Src._id': id };
        const  supdate = { $set: { 'Src.$.src': body.src } }
        
        // console.log(supdate)
        const data = await Video.updateOne(swhere, supdate)
        if (!data.nModified) return res.status(200).json({
            code: 0,
            msg: '基本信息未更改！',
        })
        return res.status(200).json({
            code: 1,
            msg: '数据更新成功'
        })
    } catch (e) {
        if (e) {
            res.status(200).json({
                code: 500,
                msg: '数据未更改'
            })
        }
    }
})

module.exports = router