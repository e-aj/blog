<template>
  <a-layout>
    <a-layout-sider>
      <div class="title" @click="toIndex">管理系统</div>
      <a-menu mode="inline" theme="llight" @select="menuSelect">
        <a-sub-menu key="sub1">
          <template #icon>
            <MailOutlined />
          </template>
          <template #title>个人信息</template>
          <a-menu-item key="userList">用户列表</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #icon>
            <MailOutlined />
          </template>
          <template #title>文章信息</template>
          <a-menu-item key="articleCateList">分类列表</a-menu-item>
          <a-menu-item key="articleList">文章列表</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <template #icon>
            <MailOutlined />
          </template>
          <template #title>作品管理</template>
          <a-menu-item key="worksList">作品列表</a-menu-item>
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
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Head from "./head.vue";
export default defineComponent({
  components: {
    Head,
  },
  setup() {
    // 定义router
    const router = useRouter();

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
          width: 100px;
          height: 100px;
        }
        input {
          display: none;
        }
      }
    }
  }
}
</style>
