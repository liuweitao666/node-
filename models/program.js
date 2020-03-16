const mongoose = require('mongoose')
const Schma = mongoose.Schema
// const path = require('path')

mongoose.connect('mongodb://localhost:27017/manager', { useNewUrlParser: true, useUnifiedTopology: true })

// 节目管理表
const programschma = new Schma({

    title: {
        type: String,
        required: true
    },
    data: [
        {
            title: '',
            createtime: {
                type: Date,
                default: Date.now
            },
            updatetime: {
                type: Date,
                default: Date.now
            },
            subtitle: '',
            director: '',
            writer: '',
            star: '',
            type: '',
            area: '',
            language: '',
            date: '',
            time: '',
            cover: '',
            banner: '',
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
            path: {
                type: String,
                default: 'pmovie'
            },
            hot: {
                type: Number,
                default: 0
            },
            Favorite: {
                type: Number,
                default: 0
            }
        },{
            timestamps: {
                createdAt: 'created',
                updatedAt: 'updated'
            }
        }
    ],
    // 用户评论消息
    comments: [
        {
            id:{
                type:String,
            },
            username: {
                type: String,
                required: true
            },
            createtime: {
                type: Date,
                default: Date.now
            },
            content: {
                type: String
            },
            avatar: {
                type: String,
            },
            thumbs:{
                type:Number,
                default:0
            },
            Nrecom:{
                type:Number,
                default:0
            }
        }

    ],
})
const programs = mongoose.model('Program', programschma)



exports.programs = programs