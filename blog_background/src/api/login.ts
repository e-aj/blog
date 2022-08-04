import instence from './http'

// 注册
export function register(data: any) {
  console.log(data)
  return instence({
    url: "api/register",
    method: 'post',
    data,
  })
}

// 登录
export function login(data: any) {
  console.log(data)
  return instence({
    url: "api/login",
    method: 'post',
    data,
  })
}