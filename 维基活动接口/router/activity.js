const express = require('express')
const router = express.Router()
const activity_c = require('../controller/activityC')

router.get('/list',activity_c.activity_list)
router.post('/modify',activity_c.activity_modify)
router.post('/add',activity_c.activity_add)

module.exports = router