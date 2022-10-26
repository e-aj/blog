<template>
  <div class="works">
    <a-breadcrumb :routes="routes">
      <template #itemRender="{ route, paths }">
        <span v-if="routes.indexOf(route) === routes.length - 1">
          {{ route.breadcrumbName }}
        </span>
        <router-link v-else :to="`${basePath}/${paths.join('/')}`">
          {{ route.breadcrumbName }}
        </router-link>
      </template>
    </a-breadcrumb>

    <a-button type="primary" size="middle" shape="round" @click="addworks">
      添加作品
    </a-button>

    <a-table :columns="columns" :pagination="false" :data-source="worksList">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'edit'">
          <a-tag color="red" @click="deleteArt(record)">删除</a-tag>
          <a-tag color="green" @click="updateArt(record)">修改</a-tag>
        </template>
      </template>
    </a-table>

    <a-config-provider :locale="locale">
      <a-pagination
        v-model:current="currentPage"
        show-quick-jumper
        :total="total"
        :defaultPageSize="pageSize"
        @change="changePage"
      />
    </a-config-provider>
  </div>

  <!-- 添加框 -->
  <a-modal
    v-model:visible="addVisible"
    title="添加分类"
    @ok="addHandleOk"
    cancelText="取消"
    okText="确定添加"
  >
  </a-modal>

  <!-- 删除确认 -->
  <a-modal
    v-model:visible="deleteVisible"
    title="删除分类"
    @ok="deleteHandleOk"
    cancelText="取消"
    okText="确定删除"
  >
    <p>确认删除此作品？</p>
  </a-modal>
</template>
<script lang="ts">
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { message } from "ant-design-vue";
import { defineComponent, onMounted, ref } from "vue";
import { getWorksList, deleteWorks } from "../../api/works";
import { useRouter } from "vue-router";
interface Route {
  path: string;
  breadcrumbName: string;
}
export default defineComponent({
  setup() {
    // 定义路由
    const router = useRouter();
    // 定义面包屑
    const routes = ref<Route[]>([
      {
        path: "",
        breadcrumbName: "首页",
      },
      {
        path: "worksList",
        breadcrumbName: "作品列表",
      },
    ]);

    // 表头信息
    const columns = [
      {
        title: "id",
        dataIndex: "id",
        width: 150,
      },
      {
        title: "作品名称",
        dataIndex: "name",
      },
      {
        title: "作品连接",
        dataIndex: "link",
      },
      {
        title: "介绍",
        dataIndex: "intro",
      },
      {
        title: "最后编辑时间",
        dataIndex: "last_date",
      },

      {
        title: "作者",
        dataIndex: "author_id",
      },
      {
        title: "操作",
        dataIndex: "edit",
      },
    ];

    interface worksListType {
      id?: number;
      name?: string;
      cover_img?: File;
      pub_date?: string;
      last_date?: string;
      intro?: string;
      is_delete?: number;
      author_id?: number;
    }
    // 定义作品列表
    const worksList = ref<worksListType[]>([]);

    // 定义模态框数据
    const addVisible = ref<boolean>(false);
    const updateVisible = ref<boolean>(false);
    const deleteVisible = ref<boolean>(false);

    const addHandleOk = ref<boolean>(false);
    // const updateHandleOk = ref<boolean>(false);
    // const deleteHandleOk = ref<boolean>(false);

    // 添加作品
    const addworks = () => {
      router.push("/addworks");
      // addVisible.value = true;
    };

    // 定义分页
    const currentPage = ref<number>(1);
    const pageSize = ref<number>(10);
    const total = ref<number>();

    // 获取作品列表
    const getWorkList = () => {
      let data = {
        currentPage: currentPage.value,
        pageSize: pageSize.value,
      };
      getWorksList(data).then((res) => {
        console.log(res);
        if (res.status === 0) {
          total.value = res.total;
          worksList.value = res.data;
        } else {
          worksList.value = res.data;
          message.warning(res.message);
        }
      });
    };

    // 删除作品
    const deleteId = ref<number>();
    // 删除框显示
    const deleteArt = (record: any) => {
      deleteVisible.value = true;
      deleteId.value = record.id;
    };
    // 删除确定
    const deleteHandleOk = () => {
      deleteworks(deleteId.value).then((res) => {
        if (res.status === 0) {
          message.success(res.message);
          deleteVisible.value = false;
          setTimeout(() => {
            getWorkList();
          }, 1000);
        } else {
          message.warn(res.message);
        }
      });
    };

    // 查看修改作品
    const updateArt = (record: any) => {
      // router.push({ name: "/updateworks", params: { id: record.id } });
      router.push(`updateworks/${record.id}`);
    };

    // 切换页码
    const changePage = (page: number, pageSize: number) => {
      currentPage.value = page;
      getWorkList();
    };

    onMounted(() => {
      getWorkList();
    });

    return {
      basePath: "",
      routes,
      columns,
      worksList,
      currentPage,
      total,
      pageSize,
      locale: zhCN,
      addVisible,
      addHandleOk,
      deleteVisible,
      addworks,
      changePage,
      deleteArt,
      updateArt,
      deleteHandleOk,
    };
  },
});
</script>

<style lang="less" scoped>
.works {
  height: 100%;
  position: relative;
  width: 100%;
  .ant-btn {
    margin: 10px 0;
    left: 90%;
  }
  .ant-tag {
    cursor: pointer;
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
