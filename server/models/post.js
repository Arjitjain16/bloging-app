const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema ({
    title : {
        type : String,
        require :true
    },
    body :{
        type : String,
        require : true,
    },
    createAt :{
        type :Date,
        default : Date.now()
    },
    updateAt :{
        type : Date,
        default : Date.now()
    }
})


module.exports = mongoose.model('post',PostSchema)