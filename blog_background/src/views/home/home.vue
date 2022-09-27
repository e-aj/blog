<template>
  <a-layout>
    <a-layout-sider>
      <div class="title" @click="toIndex">管理系统</div>
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
        <a-sub-menu key="sub2">
          <template #icon>
            <MailOutlined />
          </template>
          <template #title>文章信息</template>
          <a-menu-item key="articleList">文章列表</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <Head></Head>
      </a-layout-header>
      <a-layout-content>
        <router-view />
      </a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { message, Upload } from "ant-design-vue";
import { getUserinfo, updateAvatar } from "../../api/user";
import type { UploadChangeParam } from "ant-design-vue";
import uploadAvatar from "../../components/uploadAvatar.vue";
import { storeToRefs } from "pinia";
import { useStore } from "../../stores/user";
import Head from "./head.vue";
export default defineComponent({
  components: {
    uploadAvatar,
    Head,
  },
  setup() {
    // 定义router
    const router = useRouter();

    // 定义状态管理器
    const store = useStore();
    const storeData = storeToRefs(store);

    // 跳转首页
    const toIndex = () => {
      router.push("/");
    };

    //切换路由
    const menuSelect = (item: any, key: any, selectedKeys: any) => {
      router.push(item.key);
    };

    return {
      toIndex,
      menuSelect,
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
      cursor: pointer;
    }
    .ant-layout-sider-children {
      background-image: url("../../assets/sider_bg.jpg");
    }
  }
  .ant-layout-header {
    background: #f0f2f5;
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
        cursor: pointer;
        position: relative;
        img {
          position: absolute;
          left: 0;
        }
        input {
          display: none;
        }
      }
    }
  }
}
</style>
