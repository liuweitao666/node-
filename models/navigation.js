const mongoose = require('mongoose')
const Schma = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/manager', { useNewUrlParser: true, useUnifiedTopology: true })

// 导航数据
const navigation = [
    {
        title:'信息管理',
        children:[
            {name:'用户管理',path:'/info//users'},
        ],
    },
    {
        title:'节目管理',
        children:[
            {name:'电影类',path:'/program/movie'},
            {name:'电视剧类',path:'/program/tvseries'},
            {name:'综艺类',path:'/program/variety'},
            {name:'搞笑类',path:'/program/funny'}
        ]
    },
    {
        title:'报表管理',
        children:[
            {name:'用户报表',path:'/report/users'},
            {name:'节目报表',path:'/report/program'}
        ]
    },
    {
        title:'设备管理',
        children:[
            {name:'电视设备',path:'/device/tv'},
            {name:'电脑设备',path:'/device/computer'}
        ],
    },
    {
        title:'收费管理',
        children:[
            {name:'用户费用',path:'/toll/user'},
            {name:'缴费',path:'/toll/pay'}
        ],
    }
]
// 插入导航数据
navs.insertMany(navigation,function(err){
    console.log(err);
  });

const navs = mongoose.model('Nav',navSchma)

// new navs(
//     {
//         title:'信息管理',
//     }
// ).save()

module.exports = navs