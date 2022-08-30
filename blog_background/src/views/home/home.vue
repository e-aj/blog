<template>
  <a-layout>
    <a-layout-sider>
      <div class="title">管理系统</div>
      <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        theme="llight"
        @select="menuSelect"
      >
        <a-sub-menu key="sub1">
          <template #icon>
            <MailOutlined />
          </template>
          <template #title>个人信息</template>
          <a-menu-item key="userList">用户列表</a-menu-item>
          <a-menu-item key="2">权限管理</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <div class="info">
          <img :src="userInfo.avatar" alt="头像" @click="changeAvatar" />
          <div class="username" @mousemove="openUserInfo" @mouseleave="closeUserinfo">
            {{ userInfo.username }}
          </div>
        </div>
      </a-layout-header>
      <a-layout-content>
        <router-view />
      </a-layout-content>
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
    <!-- 更换头像 -->
    <a-modal
      v-model:visible="changeAvatarVisible"
      title="更换头像"
      @ok="changeAvatarHandleOk"
      class="changeAvatar"
    >
      <div class="now">
        <span>当前头像</span>
        <img :src="userInfo.avatar" alt="" />
      </div>
      <div class="change">
        <span>上传图片</span>
        <div class="upload">
          <div v-if="isUpload" class="img">
            <img src="" alt="" />
          </div>
          <div v-else class="add" @click="addAvatar">
            +
            <input type="file" />
          </div>
          <!-- <uploadAvatar></uploadAvatar> -->
        </div>
      </div>
    </a-modal>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { message, Upload } from "ant-design-vue";
import { getUserinfo, updateAvatar } from "../../api/user";
import type { UploadChangeParam } from "ant-design-vue";
import uploadAvatar from "../../components/uploadAvatar.vue";
export default defineComponent({
  components: {
    uploadAvatar,
  },
  setup() {
    // 定义router
    const router = useRouter();

    // 定义用户信息
    const userInfo = reactive({
      id: "",
      username: "",
      avatar: "",
    });

    // 定义userinfo显示
    const showUserinfo = ref<boolean>(false);
    const selectedKeys = ref<string[]>(["1"]);
    const openKeys = ref<string[]>(["sub1"]);

    // 退出弹框
    const visibleLogout = ref<boolean>(false);

    // 获取用户信息
    const userinfo = () => {
      getUserinfo().then((res) => {
        userInfo.id = res.data.id;
        userInfo.username = res.data.username;
        userInfo.avatar = res.data.avatar;
      });
    };
    userinfo();

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
      localStorage.clear();
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    };

    // 更换头像显示框
    const changeAvatarVisible = ref<boolean>(false);

    // 上传切换
    const isUpload = ref<boolean>(false);

    const fileList = ref([]);

    // 更换头像
    const changeAvatar = () => {
      console.log("1111");
      changeAvatarVisible.value = true;
    };

    // 更换头像确认
    const changeAvatarHandleOk = () => {
      console.log("111");
    };

    // 添加图片
    const addAvatar = () => {};
    // 改变信息
    const changePassword = () => {
      console.log("changePassword");
    };

    //切换路由
    const menuSelect = (item: any, key: any, selectedKeys: any) => {
      console.log(item, key, selectedKeys);
      router.push(item.key);
    };

    return {
      userInfo,
      showUserinfo,
      visibleLogout,
      selectedKeys,
      openKeys,
      changeAvatarVisible,
      isUpload,
      headers: {
        authorization: localStorage.getItem("token"),
      },
      fileList,
      openUserInfo,
      closeUserinfo,
      logout,
      changePassword,
      logoutHandleOk,
      menuSelect,
      changeAvatar,
      changeAvatarHandleOk,
      addAvatar,
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
    .ant-layout-sider-children {
      background-image: url("../../assets/sider_bg.jpg");
    }
  }
  .ant-layout-header {
    background: #f0f2f5;
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid #ccc;
    .info {
      display: flex;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
        margin: 0 10px;
        border-radius: 50%;
        cursor: pointer;
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
.changeAvatar {
  .now {
    margin: 5px 5px 20px;
    img {
      width: 100px;
      height: 100px;
      margin: 0 10px;
      border-radius: 50%;
    }
  }
  .change {
    margin: 50px 5px 20px;
    .upload {
      margin: 0 10px;
      display: inline-block;
      border: 1px solid #ccc;
      width: 100px;
      height: 100px;
      .add {
        line-height: 100px;
        text-align: center;
        font-size: 40px;
        color: #ccc;
        input {
          display: none;
        }
      }
    }
  }
}
</style>
