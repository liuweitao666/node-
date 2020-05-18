const express = require('express')
// 调用express.router方法
const router = express.Router()
// 引入文件模块
const fs = require('fs')
const request = require('request')
// TypeScript
// 支付宝沙箱模式
const AlipaySdk = require('alipay-sdk').default
const AlipayFormdata = require('alipay-sdk/lib/form').default

// console.log(AlipaySdk)
const alipaySdk = new AlipaySdk({
  // 参考下方 SDK 配置
  appId: '2016102400753259',
  privateKey: fs.readFileSync('./config/private-key.pem', 'ascii'),
  gateway:"https://openapi.alipaydev.com/gateway.do",
  signType:'RSA2',
  alipayPublicKey:fs.readFileSync('./config/alipay_public_key.pem','ascii')
});

const result =  alipaySdk.exec('alipay.system.oauth.token', {
    grantType: 'authorization_code',
    code: 'code',
    refreshToken: 'token'
});
// console.log(result)

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
                total:data.total,
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
    // console.log(body)
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
            console.log(e)
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
        if (data.code === 100) {
            return res.status(200).json({
                code: 100,
                msg: '超级管理员不可删除'
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
    const paydata = params.paydata
    const price = params.price
    // 查询当前用户所欠金额
    const { result: userinfo } = await find(users, { 'username': params.username })
    // 判断缴费是否大于最大金额
    // console.log(userinfo)
    const result = await alipaySdk.exec('alipay.trade.close', {
        notifyUrl: 'http://notify_url',
        appAuthToken: '',
        // 通过 bizContent 传递请求参数
        bizContent: {
          tradeNo: '',
          outTradeNo: '',
          operatorId: '',
        },
      });
      const formData = new AlipayFormdata()
      console.log(paydata)
      formData.setMethod('get')
      formData.addField('appID','2016102400753259')
      formData.addField('charset','utf-8')
      formData.addField('signType','RSA2')
      formData.addField('returnUrl', 'http://118.190.172.37/');
      formData.addField('bizContent',{
          outTradeNo:'TV'+paydata.number+parseInt(Math.random()*10000) ,
          productCode:'FAST_INSTANT_TRADE_PAY',
          totalAmount: price,
          subject:paydata.city+'电视用户缴费',
          body: '出账机构，'+paydata.organ,
      })
      const alires =await alipaySdk.exec('alipay.trade.page.pay',{},{ formData:formData})
      request(alires,function(error,response){
        //   console.log(response)
      })
      // 从官方文档看到，result 包含 tradeNo、outTradeNo 2 个 key
    //   console.log('tradeNo: %s, outTradeNo: %s', result.tradeNo, result.outTradeNo);
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
        msg: '正在生成订单，请稍后！',
        data:alires
    })
})

module.exports = router