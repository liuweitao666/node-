const mongoose = require('mongoose')
const Schma = mongoose.Schema
// const path = require('path')

mongoose.connect('mongodb://localhost:27017/manager', { useNewUrlParser: true, useUnifiedTopology: true })

const videoSchma = new Schma({
    title: '',
    type: '',
    Src: [
        {
            title:{
                type:String
            },
            src: {
                type: String,
            }
        }
    ]
})

module.exports = mongoose.model('Video', videoSchma)