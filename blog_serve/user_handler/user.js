// 处理函数
const path = require("path");
const fs = require("fs");
// 导入数据库
const db = require('../db/index')

// 导入密码处理
const bcrypt = require('bcryptjs')

// 导入配置文件
const config = require('../config')

// 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken')

// 注册用户的处理函数 
exports.register = (req,res)=>{

    // 接收表单数据
    const userinfo = req.body

    // 判断数据是否合法
    if (!userinfo.username || !userinfo.password){
        return res.send({
            status:1,
            message:'用户名或密码不能为空'
        })
    }

    // sql语句
    const sql = `select * from blog_user where username=?`

    const insertSql = `insert into blog_user set ?`

    // 执行sql
    db.query(sql,[userinfo.username],(err,result) =>{
        // 执行失败
        if(err) return res.send({status:1,message:err.message})

        // 用户名被占用
        if(result.length>0){
            return res.send({status:1,message:"用户名已存在"})
        }

        // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
        userinfo.password = bcrypt.hashSync(userinfo.password,10)

        db.query(insertSql,{username:userinfo.username,password:userinfo.password},(err,results)=>{
            if(err) return res.send({status:1,message:err.message})

            if(results.affectedRows !==1){
                return res.send({status:1,message:"注册用户失败"})
            }

            // 注册成功
            res.send({status:0,message:'注册成功！'})
        })
    })
}

// 登录的处理函数
exports.login = (req,res)=>{
     // 接收表单数据
     const userinfo = req.body

    const sql = `select * from blog_user where username=?`

    db.query(sql,userinfo.username,(err,result)=>{

        // sql执行失败
        if(err) return res.send({status:1,message:err.message})

        // 执行成功，查询数据不等于1
        if(result.length !==1) return res.send({status:1,message:'此用户还未注册！'})

        // 输入密码是否一致
        const comparResult = bcrypt.compareSync(userinfo.password,result[0].password)

        // 如果对比结果为false 密码错误
        if(!comparResult) {
            return res.send({status:1,message:'密码错误！'})
        }

        const user = {...result[0],password:'',avatar:''}

        // 生成token
        const tokenStr = jwt.sign(user,config.jwtSecretKey,{
            expiresIn:'10h'
        })

        res.send({
            status:0,
            message:'登录成功！',
            token:'Bearer ' + tokenStr
        })


    })
}

// 上传文章图片
exports.uploadImage = (req,res)=>{
    const readFileFun = (i) => {
        return new Promise((resolve, reject) => {
          fs.readFile(i, (err, data) => {
            if (err) {
              console.log(err);
            }
            var base64Img = `data:image/jpeg;base64,${data.toString("base64")}`;
            resolve(base64Img);
          });
        });
      };



      readFileFun(req.file.path)
        .then((base64Img) => {
            res.send({
      
                // errno 即错误代码，0 表示没有错误。
                //       如果有错误，errno != 0，可通过下文中的监听函数 fail 拿到该错误码进行自定义处理
                "error": 0,
                // data 是一个数组，返回若干图片的线上地址
                "data": {
                    "url": base64Img, // 图片 src ，必须
                    "alt": req.file.filedname, // 图片描述文字，非必须
                    "href": "zzz" // 图片的链接，非必须
                }
            
            })
        })
        .catch((err) => {
          console.log(err);
        });
   
  }


