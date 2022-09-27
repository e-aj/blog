import { defineStore } from "pinia";
// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useStore = defineStore({
    // id 必须的  在所有的store唯一
    id:'user',
    // state：返回对象的函数
    state:()=>({
      token:'',
      userinfo:{
        id:"",
        username:"",
        avatar:""
      }
    }),
    actions:{
      // setToken
      // setToken(token:string) {
      //   this.token = token
      // }
    },
    getters:{
    }
    
  })