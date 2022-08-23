<template>
  <div class="user">
    <a-breadcrumb>
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>用户列表</a-breadcrumb-item>
    </a-breadcrumb>
    <a-table :columns="columns" :data-source="data" />
  </div>
</template>
<script lang="ts">
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    SmileOutlined,
    DownOutlined,
  },
  setup() {
    const columns = [
      {
        title: "Id",
        dataIndex: "id",
        width: 150,
      },
      {
        title: "Username",
        dataIndex: "username",
        width: 150,
      },
      {
        title: "Password",
        dataIndex: "password",
      },
    ];

    return {
      columns,
      data,
    };
  },
});
</script>
