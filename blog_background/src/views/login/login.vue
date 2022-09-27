<template>
  <div class="register">
    <div class="title">管理系统登录</div>
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
        <a-input v-model:value="formState.username" placeholder="用户名" />
      </a-form-item>
      <a-form-item
        name="password"
        :rules="[{ required: true, message: '请输入你的密码!' }]"
      >
        <a-input-password v-model:value="formState.password" placeholder="密码" />
      </a-form-item>
      <span class="toRegister" @click="toRegister"> 没有账号，去注册</span>
      <a-form-item>
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { login } from "../../api/login";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useStore } from "../../stores/user";

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

    // 定义路由
    const router = useRouter();

    // 定义状态管理器
    const store = useStore();
    const storeData = storeToRefs(store);

    const onFinish = (values: any) => {
      login(formState).then((res) => {
        if (res.status === 0) {
          localStorage.setItem("token", res.token);
          store.$patch((storeData) => {
            storeData.token = res.token;
          });
          message.info("登录成功");
          setTimeout(() => {
            router.push("/");
          }, 2000);
        } else {
          message.warning(res.message);
        }
      });
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log(errorInfo);
    };

    //  去登录
    const toRegister = () => {
      router.push("/register");
    };

    return {
      formState,
      onFinish,
      onFinishFailed,
      toRegister,
    };
  },
});
</script>

<style lang="less" scoped>
.register {
  width: 100%;
  height: 100%;
  text-align: center;
  background: url("../../assets/bg.jpg");
  position: absolute;
  .title {
    margin-top: 10%;
    font-size: 30px;
    font-weight: bold;
    color: #666666;
  }
  .toRegister {
    display: inherit;
    color: #1890ff;
    text-align: right;
    cursor: pointer;
  }
  .ant-form {
    width: 20%;
    text-align: center;
    margin: 60px auto;
    .ant-input,
    .ant-input-password {
      height: 40px;
      border-radius: 5px;
    }
    .ant-btn {
      width: 200px;
      height: 40px;
      border-radius: 10px;
      margin-top: 20px;
    }
  }
}
</style>
