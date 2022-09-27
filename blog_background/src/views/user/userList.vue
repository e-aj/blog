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
      v-model:current="page.currentPage"
      :total="total"
      v-model:pageSize="page.pageSize"
      @change="changepage"
    />
  </div>
</template>
<script lang="ts">
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { userList } from "../../api/user";
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
    // const currentPage = ref<number>(0);
    // const sizePage = ref<number>(5);
    interface pageTyep {
      currentPage: number;
      pageSize: number;
    }
    const page = reactive<pageTyep>({
      currentPage: 1,
      pageSize: 5,
    });
    const total = ref<number>(0);

    // 获取用户列表
    const getUserList = () => {
      userList(page).then((res) => {
        data.value = res.result;
        total.value = res.total;
      });
    };

    //改变页码
    const changepage = (page: number, pageSize: number) => {
      page = {
        currentPage: page,
        pageSize: pageSize,
      };
      getUserList();
    };

    // 页面加载完成
    onMounted(() => {
      // 获取用户列表
      getUserList();
    });

    return {
      columns,
      data,
      page,
      total,
      changepage,
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
