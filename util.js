// const { models } = require('./models/users')

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
            '$or':[
                { username: { $regex: reg } },
                { _id: query._id }
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
    data = await models.find().skip((pagenum - 1) * limit).limit(limit)
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