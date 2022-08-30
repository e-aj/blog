import instance from './http'


// 获取用户信息
export function getUserinfo(){
  return instance({
    url:'my/userinfo',
    method:'get'
  })
}

// 更换头像
export function updateAvatar(data:any){
  return instance({
    url:'my/update/avatar',
    method:'post',
    data
  })
}

// 用户列表
export function userList(data: any) {
    return instance({
      url: "api/register",
      method: 'post',
      data,
    })
  }