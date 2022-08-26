const db = require('../db/index')

exports.getUserinfo = (req,res)=>{
    const sql = `select id,username from blog_user where id=?`
    db.query(sql,req.user.id,(err,result)=>{
        if (err) return res.send({status:1,message:err.message})

        if(result.length !== 1) return res.send({status:1,message:'获取用户信息失败！'})

        res.send({
            status:1,
            message:'获取用户信息成功！',
            data:result[0]
        })
    })
}

// 更新用户信息
exports.postUserinfo = (req,res) =>{
    const sql =    `update blog_user set ? where id=?`

    db.query(sql,[req.body,req.body.id],(err,result) =>{
        if (err) return res.send({status:1,message:err.message})

        if(result.affectedRows !==1 ) return res.send({status:1,message:'修改用户信息失败！'})

        // 成功
        res.send({status:0,message:'修改用户信息成功！'})
    })

}