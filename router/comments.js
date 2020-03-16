const express = require('express')
const router = express.Router()

const comments = require('../models/comments')

// router获取用户评论
router.get('/comments',async (req, res) => {
    const data =await comments.find({})

    if(data.length===0) return res.status(200).json({
        code:0,
        msg:'获取失败！'
    })
    return res.status(200).json({
        code:1,
        data:data
    })
})
// 处理用户评论的请求
router.post('/comments', async (req, res) => {
    if (req.body.content === '') {
        return res.status(200).json({
            code: 0,
            msg: '输入内容不合法！'
        })
    }
    try {
        const data = await new comments(req.body).save()
        console.log(data)
        if (data.username) {
            return res.status(200).json({
                code:1,
                msg:'留言成功！'
            })
        }
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            code: 500,
            msg: "服务器崩溃，请稍后再试"
        })
    }

}
)



module.exports = router