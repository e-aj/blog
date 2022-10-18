import { defineStore } from "pinia";
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
      },
      upArticleId:0
    }),
    actions:{
      // setToken
      // setToken(token:string) {
      //   this.token = token
      // }
    },
    getters:{
    },

    // 使用持久化插件
    persist:{
      enabled:true,
      strategies:[
        {
          key:'my_store',
          storage:localStorage
        }
      ]

    }
    
  })