const db = require('../db/index')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const config = require('../config')

// 注册
exports.register = (req,res) =>{
    const userinfo = req.body

    // 判断用户是否为空
    if(!userinfo.username || !userinfo.password){
        return res.send({
            status:1,
            message:'用户名或密码不能为空！'
        })
    }

    // 定义sql
    const sql = `select * from blog_user  where username=?`

    db.query(sql,[userinfo.username],(err,result)=>{
        if(err){
            return res.send({
                status:1,
                message:err.message
            })
        }

        // 用户名存在
        if(result.length>0){
            return res.send({
                status:1,
                message:'用户名被占用，请更换其他用户名！'
            })
        }

        userinfo.password = bcrypt.hashSync(userinfo.password,10)


        const insertSql = 'insert into blog_user set ?'

        db.query(insertSql,{username:userinfo.username,password:userinfo.password},(err,insertResult)=>{
            if(err){
                return res.send({
                    status:1,
                    message:err.message
                })
            }
            if (insertResult.affectedRows !== 1){
                return res.send({
                    status:1,
                    message:"注册用户失败，请稍后重试"
                })
            }
            res.send({
                status:0,
                message:"注册成功"
            })
        })
        
    })


}

// 登录
exports.login = (req,res)=>{
    const userinfo = req.body

    const sql = `select * from blog_user where username=?`

    db.query(sql,userinfo.username,(err,result)=>{
        if(err) return(
            res.send({
                status:1,
                message:err.message
            })
        )
        if(result.length !==1) return(
            {
                status:1,
                message:'登录失败'
            }
        )

        // 拿密码与储存的相对比
        const compareResult = bcrypt.compareSync(userinfo.password,result[0].password)

        // 如果对比为false  则密码错误
        if(!compareResult){
            return res.send({
                status:1,
                message:'密码错误'
            })
        }
        // 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
        const user = { ...result[0], password: '' }


        const tokenStr = jwt.sign(user,config.jwtSecretKey,{
            expiresIn:'10h'
        })

        res.send({
            status:0,
            message:'登录成功',
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token:'Bearer ' + tokenStr
        })



    })
}