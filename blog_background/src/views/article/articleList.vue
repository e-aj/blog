<template>
  <div class="article">
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

    <a-button type="primary" size="middle" shape="round" @click="addArticle">
      添加文章
    </a-button>

    <a-table :columns="columns" :pagination="false" :data-source="articleList">
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
    <p>确认删除此文章？</p>
  </a-modal>
</template>
<script lang="ts">
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { message } from "ant-design-vue";
import { defineComponent, onMounted, ref } from "vue";
import { getArticleList, deleteArticle } from "../../api/article";
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
        path: "articleList",
        breadcrumbName: "文章列表",
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
        title: "标题",
        dataIndex: "title",
      },
      {
        title: "创建时间",
        dataIndex: "pub_date",
      },
      {
        title: "最后编辑时间",
        dataIndex: "last_date",
      },
      {
        title: "分类",
        dataIndex: "cate_id",
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

    interface articleListType {
      id?: number;
      title?: string;
      cover_img?: File;
      pub_date?: string;
      last_date?: string;
      state?: string;
      is_delete?: number;
      cate_id?: number;
      author_id?: number;
    }
    // 定义文章列表
    const articleList = ref<articleListType[]>([]);

    // 定义模态框数据
    const addVisible = ref<boolean>(false);
    const updateVisible = ref<boolean>(false);
    const deleteVisible = ref<boolean>(false);

    const addHandleOk = ref<boolean>(false);
    // const updateHandleOk = ref<boolean>(false);
    // const deleteHandleOk = ref<boolean>(false);

    // 添加文章
    const addArticle = () => {
      router.push("/addArticle");
      // addVisible.value = true;
    };

    // 定义分页
    const currentPage = ref<number>(1);
    const pageSize = ref<number>(10);
    const total = ref<number>();

    // 获取文章列表
    const getArtList = () => {
      let data = {
        currentPage: currentPage.value,
        pageSize: pageSize.value,
      };
      getArticleList(data).then((res: any) => {
        if (res.status === 0) {
          total.value = res.total;
          articleList.value = res.data;
        } else {
          articleList.value = res.data;
          message.warning(res.message);
        }
      });
    };

    // 删除文章
    const deleteId = ref<number>();
    // 删除框显示
    const deleteArt = (record: any) => {
      deleteVisible.value = true;
      deleteId.value = record.id;
    };
    // 删除确定
    const deleteHandleOk = () => {
      deleteArticle(deleteId.value).then((res) => {
        if (res.status === 0) {
          message.success(res.message);
          deleteVisible.value = false;
          setTimeout(() => {
            getArtList();
          }, 1000);
        } else {
          message.warn(res.message);
        }
      });
    };

    // 查看修改文章
    const updateArt = (record: any) => {
      // router.push({ name: "/updateArticle", params: { id: record.id } });
      router.push(`updateArticle/${record.id}`);
    };

    // 切换页码
    const changePage = (page: number, pageSize: number) => {
      currentPage.value = page;
      getArtList();
    };

    onMounted(() => {
      getArtList();
    });

    return {
      basePath: "",
      routes,
      columns,
      articleList,
      currentPage,
      total,
      pageSize,
      locale: zhCN,
      addVisible,
      addHandleOk,
      deleteVisible,
      addArticle,
      changePage,
      deleteArt,
      updateArt,
      deleteHandleOk,
    };
  },
});
</script>

<style lang="less" scoped>
.article {
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
