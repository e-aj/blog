// 导入数据库操作模块
const db = require("../db/index")

// 根据用户的 id，查询用户的基本信息
// 注意：为了防止用户的密码泄露，需要排除 password 字段
const sql = `select id,username from blog_user where id=?`

// 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
db.query(sql,req.user.id,(err,result)=>{
    // sql执行失败
    if(err) return result.send(err)

    // 执行成功，但查询的数据条不等于1
    if(result.length !==1) return result.send({
        status:1,
        message:'获取用户信息失败'
    })

    // 返回信息
    result.send({
        status:0,
        message:'获取用户列表成功',
        data:result[0]
    })
})