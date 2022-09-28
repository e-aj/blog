import instance from "./http";

// 获取分类列表
export  function getArticleCate(){
    return instance({
        url:'my/cates',
        method:'get'
    })
}

// 添加分类
export function addCates(data:any){
    return instance({
        url:'my/addCates',
        method:'post',
        data
    })
}

// 更新分类
export function updateCate(data:any){
    return instance({
        url:'my/updateCate',
        method:'post',
        data
    })
}

// 删除分类
export function deleteCate(id:number){
    return instance({
        url:`my/deleteCate/${id}`,
        method:'post',
    })
}