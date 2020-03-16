const mongoose = require('mongoose')
const Schma = mongoose.Schema
// const path = require('path')

mongoose.connect('mongodb://localhost:27017/manager', { useNewUrlParser: true, useUnifiedTopology: true })

// 信息管理表
const usersSchma = new Schma({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdate: {
        type: Date,
        default: Date.now
    },
    phone: {
        type: String,
        required: true,
    },
    gender: {
        type: Number,
        enum: [-1, 0, 1],
        default: -1
    },
    birthday: {
        type: String,
    },
    status: {
        type: Number,
        // 0 没有权限限制
        // 1 不可以评论
        // 2 不可以登录
        enum: [0, 1, 2],
        default: 0
    },
    avatar: {
        type: String,
        default: '/public/image/avatar-default.png'
    },
    // 地区
    region: {
        type: String,
        default: '请输入居住地'
    },
    // device
    device: String,
    // 节目历史记录
    // 价格
    minute: {
        type: Number,
        default: 1,
    },
    // 时间
    minutes: {
        type: Number,
        default: 0
    },
    program: [{
        title: '',
        director: '',
        writer: '',
        star: '',
        type: '',
        area: '',
        language: '',
        date: '',
        time: '',
        cover: '',
        path: {
            type: String,
            default: 'pmovie'
        },
        bio: {
            type: String,
            default: '请填写简介'
        },
        src: {
            type: String,
            default: '//player.yapi.xyz/p2p.php?url=https://youku.cdn3-okzy.com/20200228/7082_6a32ab80/index.m3u8'
        },
        price: {
            type: Number,
            default: 0
        },
        hot: {
            type: Number,
            default: 0
        },
        Favorite: {
            type: Number,
            default: 0
        }
    }],
    bio: {
        type: String,
        default: '请填写简介'
    },
    toll: [
        {
            createtime: {
                type: Date,
                default: Date.now
            },
            price: {
                type: Number,
                default: 0,
            }
        }

    ],
    history: [{
        createtime: {
            type: Date,
            default: Date.now
        },
        value: {
            type: String
        }
    }]
})
exports.users = mongoose.model('User', usersSchma)

// nav导航栏
const navSchma = new Schma({
    title: {
        type: String,
    },
    children: {
        type: Array,
        default: []
    },
    status: {
        type: Number,
        enum: [0, 1, 2],
        default: 1
    },
    children: {
        type: Array,
        default: undefined
    }
})
const navs = mongoose.model('Nav', navSchma)


// 导航数据
// const navigation = [
//     {
//         title:'信息管理',
//         children:[
//             {name:'用户管理',path:'infousers'},
//         ],
//     },
//     {
//         title:'节目管理',
//         children:[
//             {name:'电影类',path:'pmovie'},
//             {name:'电视剧类',path:'ptvseries'},
//             {name:'综艺类',path:'pvariety'},
//             {name:'搞笑类',path:'pfunny'}
//         ]
//     },
//     {
//         title:'报表管理',
//         children:[
//             {name:'用户报表',path:'repusers'},
//             {name:'节目报表',path:'reprogram'}
//         ]
//     },
//     {
//         title:'设备管理',
//         children:[
//             {name:'电视设备',path:'devicetv'},
//             {name:'电脑设备',path:'devicepc'}
//         ],
//     },
//     {
//         title:'收费管理',
//         children:[
//             {name:'用户费用',path:'tolluser'},
//             {name:'缴费',path:'tolluay'}
//         ],
//     }
// ]
// // 插入导航数据
// navs.insertMany(navigation,function(err){
//     console.log(err);
//   });

// 导出导航model
exports.navs = navs


// const admin = new users({
//     username:'lwt',
//     password:'123456'
// })
// admin.save((err,res)=>{
//     if(err){
//        return console.log(err)
//     }
//     console.log(res)
// })

