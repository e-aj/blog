import instance from './http'

// 获取作品列表
export function getWorksList(data:any){
    return instance({
        url:'my/getWorksList',
        method:'post',
        data,
    })
}

// 添加作品
export function addWorks(formData:any){
    return instance({
        url:'my/addWorks',
        method:'post',
        data:formData,
        headers:{
            'Content-Type': 'multipart/form-data',
        },
    })
}


// 删除作品
export function deleteWorks(id:any){
    return instance({
        url:'my/deleteWorks',
        method:'post',
        data:{"id":id}
    })
}

// 修改作品
export function updateWorks(formData:any){
    return instance({
        url:'my/updateWorks',
        method:'post',
        data:formData,
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })
}




// 获取作品详情
export function getWorksDetail(id:any){
    return instance({
        url:'my/getWorksDetail',
        method:'post',
        data:{"id":id}
    })
}
