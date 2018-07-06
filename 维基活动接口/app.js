const express = require('express')
const router = require('./router/index.js')
const config = require('./config/default')
const db = require('./mongodb/db')
const app = express()

app.use('/banner',express.static('./uploaded'))
app.set('view engine','ejs')
router.index(app)

app.listen(config.port,()=>{
    console.log('server is running')
})