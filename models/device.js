const mongoose = require('mongoose')
const Schma = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/manager', { useNewUrlParser: true, useUnifiedTopology: true })

// 节目管理表
const deiceschma = new Schma({
    username:{
        type:String,
        default:''
    },
    adminname:{
        type:String,
        default:''
    },
    createtime:{
        type:Date,
        default:Date.now
    },
    detail:{
        type:String,
        default:''
    },
    devicename:{
        type:String,
        default:'H10000'
    },
    address:{
        type:String
    },
    endTime:{
        type:String,
        default:'10:00'
    },
    startTime:{
        type:String,
        default:'12:00'
    },
    status:{
        type: Number,
        enum:[0,1],
        default:0
    },
    label:{
        type:String,
        default:'',
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    Aphone:{
        type:String,
        default:''
    }
})

module.exports = mongoose.model('Device', deiceschma)