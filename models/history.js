const mongoose = require('mongoose')
const Schma = mongoose.Schema
// const path = require('path')

mongoose.connect('mongodb://localhost:27017/manager', { useNewUrlParser: true, useUnifiedTopology: true })

const hisSchma = new Schma({
    createtime:{
        type:Date,
        default:Date.now
    },
    value:{
        type:String
    }
})

module.exports = mongoose.model('History',hisSchma)