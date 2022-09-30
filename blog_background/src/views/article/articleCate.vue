<template>
  <div>
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
    <a-button type="primary" size="middle" shape="round" @click="addArttCate">
      添加分类
    </a-button>
    <a-table :columns="columns" :pagination="false" :data-source="artCateList">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'edit'">
          <a-tag color="red" @click="deleteArttCate(record)">删除</a-tag>
          <a-tag color="green" @click="updateArtCate(record)">编辑</a-tag>
        </template>
      </template>
    </a-table>
  </div>
  <!-- 添加框 -->
  <a-modal
    v-model:visible="addVisible"
    title="添加分类"
    @ok="addHandleOk"
    cancelText="取消"
    okText="确定添加"
  >
    <a-form
      :model="addArtCateData"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
      autocomplete="off"
    >
      <a-form-item label="名称" name="name">
        <a-input v-model:value="addArtCateData.name" />
      </a-form-item>

      <a-form-item label="别名" name="alias">
        <a-input v-model:value="addArtCateData.alias" />
      </a-form-item>
    </a-form>
  </a-modal>
  <!-- 修改框 -->
  <a-modal
    v-model:visible="updateVisible"
    title="修改分类"
    @ok="updateHandleOk"
    cancelText="取消"
    okText="确定修改"
  >
    <a-form
      :model="updateArtCateData"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
      autocomplete="off"
    >
      <a-form-item label="名称" name="name">
        <a-input v-model:value="updateArtCateData.name" />
      </a-form-item>

      <a-form-item label="别名" name="alias">
        <a-input v-model:value="updateArtCateData.alias" />
      </a-form-item>
    </a-form>
  </a-modal>
  <!-- 删除确认 -->
  <a-modal
    v-model:visible="deleteVisible"
    title="删除分类"
    @ok="deleteHandleOk"
    cancelText="取消"
    okText="确定删除"
  >
    <p>确认删除？</p>
  </a-modal>
</template>
<script lang="ts">
import { message } from "ant-design-vue";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { number } from "vue-types";
import { getArticleCate, addCates, updateCate, deleteCate } from "../../api/artCate";
interface Route {
  path: string;
  breadcrumbName: string;
}
export default defineComponent({
  setup() {
    // 定义面包屑
    const routes = ref<Route[]>([
      {
        path: "",
        breadcrumbName: "首页",
      },
      {
        path: "articleCateList",
        breadcrumbName: "文章列表",
      },
    ]);

    // 表头信息
    const columns = [
      {
        title: "Id",
        dataIndex: "id",
        width: 150,
      },
      {
        title: "名称",
        dataIndex: "name",
        width: 150,
      },
      {
        title: "别名",
        dataIndex: "alias",
      },
      {
        title: "编辑",
        dataIndex: "edit",
      },
    ];

    // 定义文章分类列表
    interface artCateListType {
      id?: number;
      name: string;
      alias: string;
      is_delete?: number;
    }
    const artCateList = ref<artCateListType[]>([]);

    // 获取文章分类列表
    const getArtCateList = () => {
      getArticleCate().then((res) => {
        artCateList.value = res.data;
      });
    };

    // 定义模态框数据
    const addVisible = ref<boolean>(false);
    const updateVisible = ref<boolean>(false);
    const deleteVisible = ref<boolean>(false);

    // 添加分类
    const addArtCateData = reactive<artCateListType>({
      name: "",
      alias: "",
    });
    const addArttCate = () => {
      addVisible.value = true;
    };

    const addHandleOk = () => {
      addCates(addArtCateData).then((res) => {
        if (res.status === 0) {
          message.success("添加分类成功！");
          getArtCateList();
          addVisible.value = false;
        } else {
          message.warn(res.message);
        }
      });
    };

    // 修改文章分类
    const updateArtCateData = reactive<artCateListType>({
      id: 0,
      name: "",
      alias: "",
    });
    const updateArtCate = (e: any) => {
      updateArtCateData.id = e.id;
      updateArtCateData.name = e.name;
      updateArtCateData.alias = e.alias;
      updateVisible.value = true;
    };

    const updateHandleOk = () => {
      updateCate(updateArtCateData).then((res) => {
        if (res.status === 0) {
          message.success("修改分类成功！");
          updateVisible.value = false;
          getArtCateList();
        } else {
          message.warn(res.message);
        }
      });
    };

    // 删除文章分类
    const deleteId = ref<number>(0);
    const deleteArttCate = (e: any) => {
      deleteVisible.value = true;
      deleteId.value = e.id;
    };

    const deleteHandleOk = () => {
      deleteCate(deleteId.value).then((res) => {
        if (res.status === 0) {
          message.success("删除分类成功！");
          getArtCateList();
          deleteVisible.value = false;
        } else {
          message.warn(res.message);
        }
      });
    };

    onMounted(() => {
      getArtCateList();
    });
    return {
      basePath: "",
      routes,
      columns,
      artCateList,
      addVisible,
      updateVisible,
      deleteVisible,
      addArtCateData,
      updateArtCateData,
      addArttCate,
      addHandleOk,
      updateHandleOk,
      deleteHandleOk,
      deleteArttCate,
      updateArtCate,
    };
  },
});
</script>

<style lang="less" scoped>
.ant-btn {
  margin: 10px 0;
  left: 90%;
}
.ant-tag {
  cursor: pointer;
}
</style>
