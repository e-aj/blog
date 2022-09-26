<template>
  <div class="user">
    <a-breadcrumb>
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>用户列表</a-breadcrumb-item>
    </a-breadcrumb>
    <a-table :columns="columns" :data-source="data" :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'avatar'">
          <img :src="record.avatar" alt="" v-if="record.avatar" />
          <span v-else>无头像</span>
        </template>
      </template>
    </a-table>
    <a-pagination
      v-model:current="current"
      :total="data.length"
      :pageSizeOptions="pageSize"
    />
  </div>
</template>
<script lang="ts">
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { getUserList } from "../../api/user";
export default defineComponent({
  components: {
    SmileOutlined,
    DownOutlined,
  },
  setup() {
    // 表头信息
    const columns = [
      {
        title: "Id",
        dataIndex: "id",
        width: 150,
      },
      {
        title: "用户名",
        dataIndex: "username",
        width: 150,
      },
      {
        title: "头像",
        dataIndex: "avatar",
      },
    ];

    // 用户数据
    interface DataItem {
      id: string;
      username: string;
      avatar: string;
    }
    let data = ref<DataItem[]>([]);

    // 分页
    const current = ref<number>(1);
    const pageSize = ["10", "20", "30", "40"];

    // 页面加载完成
    onMounted(() => {
      // 获取用户列表
      getUserList().then((res) => {
        data.value = res.result;
        console.log(data);
      });
    });

    return {
      columns,
      data,
      current,
      pageSize,
    };
  },
});
</script>
<style lang="less" scoped>
.user {
  height: 100%;
  position: relative;
  width: 100%;
  .ant-table-wrapper {
    margin-top: 10px;
    position: absolute;
    overflow-y: auto;
    overflow-x: hidden;
    height: 85%;
    width: 100%;
  }
  .ant-pagination {
    text-align: center;
    height: 5%;
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}
</style>
