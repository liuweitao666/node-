const mongoose = require('mongoose')
const Schma = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/manager', { useNewUrlParser: true, useUnifiedTopology: true })

const commentsSchma = new Schma({
    username:{
        type:String,
        required:true
    },
    createtime:{
        type:Date,
        default:Date.now
    },
    content:{
        type:String
    },
    avatar:{
        type:String,
    }
})

module.exports = mongoose.model('Comment',commentsSchma)