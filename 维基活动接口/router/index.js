
const activity = require('./activity.js')
const home = require('./home')
exports.index = app =>{
    app.use('/activity',activity)
    app.use('/index.html',home)
}