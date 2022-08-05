<template>
  <a-layout>
    <a-layout-sider>
      <div class="title">管理系统</div>
      <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
      >
        <a-sub-menu key="sub1">
          <template #icon>
            <MailOutlined />
          </template>
          <template #title> 个人信息</template>
          <a-menu-item key="1">Option 5</a-menu-item>
          <a-menu-item key="2">Option 6</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <div class="info">
          <img :src="userInfo.avatar" alt="" />
          <div class="username" @mousemove="openUserInfo" @mouseleave="closeUserinfo">
            {{ userInfo.username }}
          </div>
        </div>
      </a-layout-header>
      <a-layout-content>Content</a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
    <div
      class="usernameInfo"
      v-show="showUserinfo"
      @mousemove="openUserInfo"
      @mouseleave="closeUserinfo"
    >
      <div class="changePassword" @click="changePassword">修改密码</div>
      <div class="logout" @click="logout">退出登录</div>
    </div>
    <!-- 退出弹框 -->
    <a-modal
      v-model:visible="visibleLogout"
      title="退出系统"
      @ok="logoutHandleOk"
      cancelText="取消"
      okText="确定退出"
    >
      <p>是否退出系统</p>
    </a-modal>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import img from "../../assets/1.jpg";
import { message } from "ant-design-vue";
export default defineComponent({
  setup() {
    // 定义router
    const router = useRouter();

    // 定义用户信息
    const userInfo = reactive({
      username: "admin",
      avatar: img,
    });

    // 定义userinfo显示
    const showUserinfo = ref<boolean>(false);

    // 退出弹框
    const visibleLogout = ref<boolean>(false);

    // 显示userinfo
    const openUserInfo = () => {
      showUserinfo.value = true;
    };

    // 关闭userinfo
    const closeUserinfo = () => {
      showUserinfo.value = false;
    };

    // 示退出弹框
    const logout = () => {
      visibleLogout.value = true;
    };

    // 展示退出弹框
    const logoutHandleOk = () => {
      visibleLogout.value = false;
      message.info("退出成功");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    };

    // 改变信息
    const changePassword = () => {
      console.log("changePassword");
    };

    return {
      userInfo,
      showUserinfo,
      visibleLogout,
      openUserInfo,
      closeUserinfo,
      logout,
      changePassword,
      logoutHandleOk,
    };
  },
});
</script>
<style lang="less">
.ant-layout {
  width: 100%;
  height: 100%;
  .ant-layout-sider {
    .title {
      color: #fff;
      text-align: center;
      font-size: 30px;
    }
  }
  .ant-layout-header {
    background: #f0f2f5;
    display: flex;
    justify-content: flex-end;
    .info {
      display: flex;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
        margin: 0 10px;
        border-radius: 50%;
      }
      .username {
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
  .usernameInfo {
    position: absolute;
    top: 65px;
    right: 50px;
    cursor: pointer;
    padding: 10px 0 20px 20px;
    .logout {
      margin-top: 10px;
    }
  }
}

#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}
</style>
