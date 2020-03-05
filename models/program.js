const mongoose = require('mongoose')
const Schma = mongoose.Schema
// const path = require('path')

mongoose.connect('mongodb://localhost:27017/manager', { useNewUrlParser: true, useUnifiedTopology: true })

// 节目管理表
const programschma = new Schma({

        title:{
            type:String,
            required:true
        },
        data:[
            {
                title:'',
                director:'',
                writer:'',
                star:'',
                type:'',
                area:'',
                language:'',
                date:'',
                time:'',
                cover:'',
                bio:{
                    type:String,
                    default:'请填写简介'
                },
                src:{
                    type:String,
                    default:'//player.yapi.xyz/p2p.php?url=https://youku.cdn3-okzy.com/20200228/7082_6a32ab80/index.m3u8'
                },
                price:{
                    type:Number,
                    default:0
                },
                hot:{
                    type:Number,
                    default:0
                },
                Favorite:{
                    type:Number,
                    default:0
                }
            }
        ],    
})
const programs = mongoose.model('Program', programschma)



exports.programs = programs