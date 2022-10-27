<template>
  <div class="works">
    <!-- 面包屑 -->
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
    <!-- 添加按钮 -->
    <a-button type="primary" size="middle" shape="round" @click="addworks">
      添加作品
    </a-button>
    <!-- 列表表格 -->
    <a-table :columns="columns" :pagination="false" :data-source="worksList">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'edit'">
          <a-tag color="red" @click="deleteBtn(record)">删除</a-tag>
          <a-tag color="green" @click="updateBtn(record)">修改</a-tag>
        </template>
      </template>
    </a-table>
    <!-- 分页 -->
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
    <a-form
      :model="addWorksData"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
      autocomplete="off"
    >
      <a-form-item label="作品名称" name="name">
        <a-input v-model:value="addWorksData.name" />
      </a-form-item>
      <a-form-item has-feedback label="作品图片" name="cover_img">
        <div class="uploadImg" @click="addAvatar">
          <img :src="addWorksData.cover_img" alt="" v-show="addWorksData.cover_img" />
          <div class="add" v-show="!addWorksData.cover_img">
            +
            <input type="file" ref="uploadFile" @change="addChange" />
          </div>
        </div>
      </a-form-item>
      <a-form-item label="作品连接" name="link">
        <a-input v-model:value="addWorksData.link" />
      </a-form-item>
      <a-form-item label="介绍" name="intro">
        <a-input v-model:value="addWorksData.intro" />
      </a-form-item>
    </a-form>
  </a-modal>
  <!-- 删除确认框 -->
  <a-modal
    v-model:visible="deleteVisible"
    title="删除分类"
    @ok="deleteHandleOk"
    cancelText="取消"
    okText="确定删除"
  >
    <p>确认删除此作品？</p>
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
      :model="updateWorksData"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
      autocomplete="off"
    >
      <a-form-item label="ID" name="id">
        <a-input v-model:value="updateWorksData.id" disabled />
      </a-form-item>
      <a-form-item label="作品名称" name="name">
        <a-input v-model:value="updateWorksData.name" />
      </a-form-item>
      <a-form-item has-feedback label="作品图片" name="cover_img">
        <div class="uploadImg" @click="addAvatar">
          <img
            :src="updateWorksData.cover_img"
            alt=""
            v-show="updateWorksData.cover_img"
          />
          <div class="add" v-show="!updateWorksData.cover_img">
            +
            <input type="file" ref="uploadFile" @change="addChange" />
          </div>
        </div>
      </a-form-item>
      <a-form-item label="作品连接" name="link">
        <a-input v-model:value="updateWorksData.link" />
      </a-form-item>
      <a-form-item label="介绍" name="intro">
        <a-input v-model:value="updateWorksData.intro" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { message } from "ant-design-vue";
import { defineComponent, onMounted, reactive, ref } from "vue";
import {
  getWorksList,
  deleteWorks,
  updateWorks,
  addWorks,
  getWorksDetail,
} from "../../api/works";
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

    // 信息对象类型
    interface worksListType {
      id?: number;
      name?: string;
      cover_img?: File;
      link?: string;
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

    // 上传封面
    // const isUpload = ref<boolean>(false);
    //input file dom
    const uploadFile = ref(null);
    const addAvatar = () => {
      uploadFile.value.dispatchEvent(new MouseEvent("click"));
    };

    // 更新的图片
    // input change 事件
    let formData = new FormData();
    const addChange = (e: any) => {
      let img = e.target.files[0]; //获取到上传文件的对象
      formData.append("file", img);
      var reader = new FileReader();
      reader.readAsDataURL(img); //参数为上传的文件对象 传值进去就会触发以下onload方法
      reader.onload = (i: any) => {
        updateWorksData.cover_img = i.target.result;
        addWorksData.cover_img = i.target.result;
      };
      isUpload.value = true;
    };

    // 添加作品信息
    const addWorksData = reactive<worksListType>({});

    // 添加作品
    const addworks = () => {
      addVisible.value = true;
    };

    const addHandleOk = () => {
      formData.append("name", String(addWorksData.name));
      formData.append("link", String(addWorksData.link));
      formData.append("intro", String(addWorksData.intro));
      addWorks(formData).then((res) => {
        if (res.status === 0) {
          message.success(res.message);
          setTimeout(() => {
            addVisible.value = false;
            getWorkList();
          }, 2000);
        } else {
          message.warn(res.message);
        }
      });
    };

    // 修改对象信息
    const updateWorksData = reactive<worksListType>({});

    // 修改数据对象
    // 查看修改作品
    const updateBtn = (record: any) => {
      updateVisible.value = true;
      updateWorksData.id = record.id;
      getWorksDetail(record.id).then((res) => {
        if (res.status === 0) {
          updateWorksData.name = res.data.name;
          updateWorksData.link = res.data.link;
          updateWorksData.cover_img = res.data.cover_img;
          updateWorksData.intro = res.data.intro;
        } else {
          message.warn(res.message);
        }
      });
      console.log(updateWorksData.cover_img);
    };

    // 确认修改
    const updateHandleOk = () => {
      formData.append("id", String(updateWorksData.id));
      formData.append("name", String(updateWorksData.name));
      formData.append("link", String(updateWorksData.link));
      formData.append("intro", String(updateWorksData.intro));
      updateWorks(formData).then((res) => {
        formData = new FormData();
        if (res.status === 0) {
          message.success(res.message);
          setTimeout(() => {
            updateVisible.value = false;
            getWorkList();
          }, 2000);
        } else {
          message.warning(res.message);
        }
      });
    };

    // 删除作品
    const deleteId = ref<number>();
    // 删除框显示
    const deleteBtn = (record: any) => {
      deleteVisible.value = true;
      deleteId.value = record.id;
    };
    // 删除确定
    const deleteHandleOk = () => {
      deleteWorks(deleteId.value).then((res) => {
        if (res.status === 0) {
          message.success(res.message);
          setTimeout(() => {
            deleteVisible.value = false;
            getWorkList();
          }, 1000);
        } else {
          message.warn(res.message);
        }
      });
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
      addWorksData,
      updateVisible,
      updateWorksData,
      updateHandleOk,
      addworks,
      changePage,
      deleteBtn,
      updateBtn,
      deleteHandleOk,
      addAvatar,
      addChange,
      uploadFile,
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
.uploadImg {
  border: 1px solid red;
  width: 150px;
  height: 150px;
  margin: 0 10px;
  display: inline-block;
  border: 1px solid #ccc;
  cursor: pointer;
  img {
    width: 150px;
    height: 150px;
    position: absolute;
  }
  .add {
    line-height: 150px;
    text-align: center;
    font-size: 40px;
    color: #ccc;
    cursor: pointer;
    position: relative;

    input {
      display: none;
    }
  }
}
</style>
