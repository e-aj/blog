import instance from "./http";

export function getArticleList() {
    return instance({
        url:'api/getArticleList',
        method:'post'
    })
    
}


export function getWorksList() {
    return instance({
        url:'api/getWorksList',
        method:'post'
    })
    
}