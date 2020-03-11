const express = require('express')
// 调用express.router方法
const router = express.Router()
const { programs } = require('../../models/program')
const { users } = require('../../models/users')
const Video = require('../../models/video')
const { find, updated, findOne } = require('../../util')


// 处理获取/搜索节目信息请求
router.get('/home/program', async (req, res) => {
    if(JSON.stringify(req.query)=='{}'){
     const alldata = await programs.find({})

     return res.status(200).json({
         code:0,
         data:alldata,
         msg:'获取数据成功！'
     })
    }
    const query = req.query
    const type = req.query.sort
    // console.log(query)
    let result
    try {
        const program = await programs.findOne({ 'title': query.title })
        // console.log(program)
        // 根据传过来的id查询指定的数据,视频名称来查询对应数据
        if (query.id || query.name) {
            let index
            let finddata
            if (query.id) {
                index = program.data.findIndex((item) => {
                    return item._id == query.id
                })

            } else {
                // 模糊查询
                // console.log(query.name)
                const reg = new RegExp(query.name, 'i')
                // console.log(program.data)
                finddata = program.data.filter((item) => {
                    return reg.test(item.title)
                })
                if (finddata.length === 0) return res.status(200).json({
                    code: 500,
                    msg: '查询失败,没有收录该视频!'
                })
                return res.status(200).json({
                    code: 1,
                    msg: '查询成功',
                    data: finddata
                })
            }
            // moogoose查询数据内嵌数组数据方法
            finddata = await programs.findOne({ title: query.title }, { data: { $slice: [index, 1] } })
            if (finddata.data.length === 0) return res.status(200).json({
                code: 0,
                msg: '查询失败'
            })
            return res.status(200).json({
                code: 1,
                msg: '查询成功',
                data: finddata.data
            })
        }
        // 获取全部数据
        const total = program.data.length

        // 根据type对数据进行排序
        if (type === 'new') {
            result = program.data.slice(0, query.pagesize).reverse()
        } else if (type === 'hot') {

            result = program.data.slice(0, query.pagesize).sort((a, b) => {
                return b.hot - a.hot
            })
            // result = program.data
        } else if (type === 'recommend') {
            result = program.data.slice(0, query.pagesize).sort((a, b) => {
                // console.log(a.Favorite,b.Favorite)
                return b.Favorite - a.Favorite
            })
        }
        if (result.length === 0) return res.status(200).json({
            code: 0,
            msg: '获取电影数据失败'
        })
        res.status(200).json({
            code: 1,
            data: result,
            msg: '获取数据成功',
            total
        })
    } catch (e) {
        if (e) {
            res.status(200).json({
                code: 500,
                msg: '服务器错误请稍后再试'
            })
        }
        console.log(e)
    }

})
// 处理添加节目信息请求
router.post('/home/program', async (req, res) => {
    // 拿到请求体
    const body = req.body
    // console.log(body)
    try {
        const data = await programs.update({ 'title': body.title }, {
            '$push': {
                data: body.data
            }
        })
        if (data.ok !== 1) {
            return res.status(200).json({
                code: 0,
                msg: '添加节目信息失败'
            })
        }
        return res.status(200).json({
            code: 1,
            msg: '添加节目信息成功'
        })
    } catch (e) {
        if (e) {
            console.log(e)
            res.status(200).json({
                code: 500,
                msg: '服务器异常，请稍后再试试！'
            })
        }
    }

})
// 处理删除节目信息请求
router.delete('/home/program', async (req, res) => {
    const params = req.query
    console.log(params)
    if (params.title === '' || params.id === '')
        return res.status(200).json({
            code: 5,
            msg: '数据格式不正确'
        })
    try {
        const data = await programs.updateOne({ 'title': params.title }, {
            '$pull': {
                data: { '_id': params.id }
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
        // const movie = await programs.findOne({'title':query.title})
        // console.log(movie)
        // const result = movie.data.slice(0,query.pagesize)
        // if(result.length===0) return res.status(200).json({
        //     code:0,
        //     msg:'获取电影数据失败'
        // })  

    } catch (e) {
        if (e) {
            console.log(e)
            res.status(200).json({
                code: 500,
                msg: '服务器异常，请稍后再试试！'
            })
        }
    }

})
// 处理更新节目信息请求
router.put('/home/program', async (req, res) => {
    const body = req.body
    const id = body.data._id
    try {
        // 修改数据中指定信息
        const swhere = { title: body.title, "data._id": id };
        const supdate = { $set: { "data.$": body.data } }

        // console.log(supdate)
        const data = await programs.updateOne(swhere, supdate)
        console.log(data)
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
}
)
// 处理更新用户节目播放和收藏请求
router.put('/home/program/hot', async (req, res) => {
    // 接受参数
    const body = req.body
    const id = body.id
    // 要更新的字段名称
    let keys = []
    // 要更新的数据
    let supdate
    for (key in body) {
        keys.push(key)
    }
    let value = parseInt(body[keys[1]])
    // return console.log(value)
    let newval = value + 1
    // return console.log(keys)
    try {
        // 根据特定的id修改指定的值
        const swhere = { 'data._id': id };
        if (keys[1] === 'hot') {
            supdate = { $set: { 'data.$.hot': newval } }

        } else {
            supdate = { $set: { 'data.$.Favorite': newval } }
        }
        const data = await programs.updateOne(swhere, supdate)
        if (!data.nModified) return res.status(200).json({
            code: 0,
            msg: '数据更新失败',
        })
        return res.status(200).json({
            code: 1,
            msg: '数据更新成功',
        })
    } catch (e) {
        console.log(e)
    }
})

// 监听用户使用费用
router.post('/home/program/expense', async (req, res) => {
    const body = req.body
    // console.log(body)
    // 查询当前用户信息
    const { result: curuser } = await find(users, { '_id': body._id })
    // 用户最新观看时间，单位/秒
    const newminute = curuser[0].minute + parseInt(body.minute)
    // 查询当前节目的信息
    const result = await findOne(programs, body)
    result.data.forEach(item => {
        item.path = body.title
    });
    let curprogram = result.data[0]
    console.log(curprogram)
    // 往用户节目数组里添加数据,如果存在则不添加
    const userprogram = await users.updateOne({
        '_id': body._id,
        "program._id": { $ne: curprogram._id }
    }, {
        $push: {
            'program': curprogram
        }
    });
    const minute = await users.updateOne({ '_id': body._id }, { 'minute': newminute, 'minutes': newminute })

    console.log(minute)
    // console.log(userprogram)
    if (!minute.nModified) return res.status(200).json({
        code: 0,
        msg: '数据已存在'
    })
    return res.status(200).json({
        code: 1,
        msg: '记录成功'
    })
})

module.exports = router

