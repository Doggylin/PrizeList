const express = require('express')
const activity = require('../model/activityModel')
const router = express.Router()
router.get('/',async (req,res)=>{
    //var result = await activity.find({})
    res.render('home',{
        //'models':result
    })
  
})
module.exports = router