const config = require('../config/default')
const formidable = require('formidable')
const ActivityM = require('../model/activityModel')
const path = require('path')
const fs = require('fs')

class ActivityHandle{
    constructor(){
        
    }
    
    async activity_list(req,res,next){
        const form =  new formidable.IncomingForm()
        form.parse(req,async (err,fields,files)=>{
            if (err){
                res.send({
                    status:0,type:'FORM_DATA_ERR',msg:'formidable解析异常'
                })
                return
            }
            try {
                const activitys = await ActivityM.find({})
                const r = {
                    status : 1,
                    result : activitys,
                    error : null
                }
                let resJson = JSON.stringify(r)
                console.log(resJson)
                res.send(resJson)
            } catch (error) {
                res.send(JSON.stringify({
                    status : 0,
                    type:'ERROR_GET_ACTIVITY_LIST',
                    msg:"获取活动列表失败"
                }))
            }
            
        })
        
        
    }
    async activity_add(req,res,next){

        const form = new formidable.IncomingForm()

        form.parse(req,async (err,fields,files)=>{
            if (err){
                res.send(JSON.stringify({
                    status:0,type:'FORM_DATA_ERR',msg:'formidable解析异常'
                }))
                return
            }
             
            const {title,detail} = fields
            try {
                if (!title){
                    throw new Error('标题为空')
                }
                if (!detail){
                    throw new Error('内容详情链接为空')
                }
                if (files.img.size === 0){
                    throw new Error('图片为空')
                }
            
            } catch (err) {
                res.send(JSON.stringify({
                    status:0,
                    type:'PARA_ERR',
                    msg:err.message
                }))
                return
            }
            var time = (new Date()).valueOf()
            form.uploadDir = path.normalize(__dirname + '/../temp/')
            var oldPath = files.img.path
            var imgName = time + '.jpg'
            var newPath = path.normalize(__dirname + '/../uploaded/'+ imgName)
            
            try {
                fs.rename(oldPath,newPath,async (err)=>{
                    if (err){
                        console.log('图片上传失败',err)
                        return
                    }
                    const new_activity = {
                        'uploadtime' : time,
                        'title' : title,
                        'detail' : detail,
                        'uploadpath' : "http://localhost:" + config.port + '/banner/' + imgName
                    }
                    await ActivityM.create(new_activity)
                    console.log('活动添加成功')
                    res.send(JSON.stringify({
                        status : 1,
                        msg:'添加活动成功'
                    }))
                })
                
            } catch (err) {
                console.log(err)
                res.send(JSON.stringify({
                    status : 0,
                    type:'ADD_ACTIVITY_ERR',
                    msg:'添加活动失败'
                }))
            }
        })
    }
    async activity_modify(req,res,next){
        res.end('修改活动')
        
    }



}
module.exports = new ActivityHandle()
