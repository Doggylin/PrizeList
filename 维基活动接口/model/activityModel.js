const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const activitySchema = new Schema({
    'uploadtime' : Number,
    'title' : String,
    'detail' : String,
    'uploadpath' : String
})

activitySchema.index({index:1})

const ActivityM = mongoose.model('ActivityM',activitySchema)
module.exports = ActivityM