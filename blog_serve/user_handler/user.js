// 处理函数

// 导入数据库
const db = require('../db/index')

// 导入密码处理
const bcrypt = require('bcryptjs')

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
    res.send('ok')
}