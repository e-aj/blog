import instance from './http'

// 获取作品列表
export function getWorksList(date:any){
    return instance({
        url:'my/getWorksList',
        data:date,
        method:"post"
    })
}

// 添加作品
export function addWorks(date:any){
    return instance({
        url:'my/addWorks',
        data:date,
        method:"post"
    })
}

// 删除作品
export function deleteWorks(date:any){
    return instance({
        url:'my/deleteWorks',
        data:date,
        method:"post"
    })
}


// 添加作品
export function updateWorks(date:any){
    return instance({
        url:'my/updateWorks',
        data:date,
        method:"post"
    })
}

