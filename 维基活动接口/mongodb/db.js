const mongoose = require('mongoose')
const config = require('../config/default')

mongoose.connect(config.url);
mongoose.Promise = global.Promise
const db = mongoose.connection

db.once('open',()=>{
    console.log('数据库已连接')
})
db.once('error',(err)=>{
    console.log('数据库连接失败',err)
})
db.once('close',function(){
    console.log('数据库断开')
})
module.exports = db