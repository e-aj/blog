const mysql = require("mysql")

// 创建数据库对象
const db = mysql.createPool({
    host: '127.0.0.1',
    user:'root',
    password:'123456',
    database:'blog_db'
})



module.exports = db