<template>
<div class="register">
  <div class="title">
    管理系统注册
  </div>
   <a-form
    :model="formState"
    name="basic"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      name="username"
      :rules="[{ required: true, message: '请输入你的用户名!' }]"
    >
      <a-input v-model:value="formState.username"  placeholder="用户名"/>
    </a-form-item>
    

    <a-form-item
      name="password"
      :rules="[{ required: true, message: '请输入你的密码!' }]"
    >
      <a-input-password v-model:value="formState.password" placeholder="密码"/>
    </a-form-item>
      <span class="toLogin" @click="toLogin"> 去登录</span>
    <a-form-item>
      <a-button type="primary" html-type="submit">注册</a-button>
    </a-form-item>
  </a-form>
</div>
 
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { register } from "../../api/login";
import { message } from "ant-design-vue";
import {useRouter} from 'vue-router'

interface FormState {
  username: string;
  password: string;
}

export default defineComponent({
  setup() {
    const formState = reactive<FormState>({
      username: "",
      password: "",
    });

    const router = useRouter()

    const onFinish = (values: any) => {
      register(formState).then((res) => {
        if (res.status === 0) {
          message.info("注册成功");
          setTimeout(()=>{
            router.push('/login')
          },2000)
        } else {
          message.warning(res.message);
        }
      });
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log(errorInfo);
    };
   
  //  去登录
  const toLogin = ()=>{
    router.push('/login')
  }

    return {
      formState,
      onFinish,
      onFinishFailed,
      toLogin,
    };
  },
});
</script>

<style lang="less" scoped>
.register{
  width: 100%;
  height: 100%;
  text-align: center;
  background: url('../../assets/bg.jpg');
  position: absolute;
  .title{
    margin-top: 10%;
    font-size: 30px;
    font-weight: bold;
    color: #666666;
  }
  .toLogin{
    display: inherit;
    color: #1890FF;
    text-align: right;
    cursor: pointer;
  }
.ant-form{
  width: 20%;
  text-align: center;
  margin: 60px  auto;
  .ant-input,.ant-input-password{
    height: 40px;
    border-radius: 5px;
  }
  .ant-btn{
    width: 200px;
    height: 40px;
    border-radius: 10px;
    margin-top: 20px;
  }
}
}


</style>