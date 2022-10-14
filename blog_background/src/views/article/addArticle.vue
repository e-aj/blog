<template>
  <div class="addArticle">
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
    <div class="container">
      <a-form :model="articleData" :wrapper-col="{ span: 10 }">
        <a-form-item has-feedback label="标题" name="title">
          <a-input v-model:value="articleData.title" type="text" />
        </a-form-item>
        <a-form-item has-feedback label="封面" name="title">
          <!-- <a-input v-model:value="articleData.title" type="text" /> -->
          <!-- <input type="file" /> -->
          <div class="uploadImg">
            <div v-if="isUpload" class="img">
              <img src="" alt="" />
            </div>
            <div v-else class="add" @click="addAvatar">
              +
              <img :src="addImg" alt="" v-show="addImg" />
              <input type="file" ref="file" @change="addChange" />
            </div>
          </div>
        </a-form-item>
        <a-form-item has-feedback label="分类" name="title">
          <a-select
            v-model:value="value"
            style="width: 100%"
            placeholder="请选择分类"
            :options="cateOption.map((item) => ({ value: item.id, label: item.name }))"
            @select="selectOk"
          ></a-select>
        </a-form-item>
      </a-form>
      <div style="border: 1px solid #ccc; margin-top: 10px">
        <Toolbar
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"
          style="border-bottom: 1px solid #ccc"
        />
        <Editor
          :defaultConfig="editorConfig"
          :mode="mode"
          v-model="articleData.content"
          style="height: 400px; overflow-y: hidden"
          @onCreated="handleCreated"
          @onChange="handleChange"
          @onDestroyed="handleDestroyed"
          @onFocus="handleFocus"
          @onBlur="handleBlur"
          @customAlert="customAlert"
          @customPaste="customPaste"
        />
      </div>
    </div>
    <div class="save">
      <a-button type="primary" @click="saveArticle">保存</a-button>
      <a-button type="primary">取消</a-button>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  onBeforeUnmount,
  shallowRef,
  onMounted,
  reactive,
} from "vue";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { addArticle } from "../../api/article";
import { message } from "ant-design-vue";
import { getArticleCate } from "../../api/artCate";
interface Route {
  path: string;
  breadcrumbName: string;
}
export default defineComponent({
  components: { Editor, Toolbar },
  setup() {
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
      {
        path: "addArticle",
        breadcrumbName: "添加文章",
      },
    ]);

    // 编辑器实例，必须用 shallowRef，重要！
    const editorRef = shallowRef();

    // 内容 HTML
    const valueHtml = ref("");

    // 模拟 ajax 异步获取内容
    onMounted(() => {
      setTimeout(() => {
        articleData.content = "";
      }, 1500);
    });

    const toolbarConfig = {};
    const editorConfig = { placeholder: "请输入内容..." };

    // 组件销毁时，也及时销毁编辑器，重要！
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    // 编辑器回调函数
    const handleCreated = (editor: any) => {
      console.log("created", editor);
      editorRef.value = editor; // 记录 editor 实例，重要！
    };
    const handleChange = (editor: any) => {
      console.log("change:", editor.getHtml());
    };
    const handleDestroyed = (editor: any) => {
      console.log("destroyed", editor);
    };
    const handleFocus = (editor: any) => {
      console.log("focus", editor);
    };
    const handleBlur = (editor: any) => {
      console.log("blur", editor);
    };
    const customAlert = (info: any, type: any) => {
      alert(`【自定义提示】${type} - ${info}`);
    };
    const customPaste = (editor: any, event: any, callback: any) => {
      console.log("ClipboardEvent 粘贴事件对象", event);

      // 自定义插入内容
      editor.insertText("xxx");

      // 返回值（注意，vue 事件的返回值，不能用 return）
      callback(false); // 返回 false ，阻止默认粘贴行为
      // callback(true) // 返回 true ，继续默认的粘贴行为
    };

    const insertText = () => {
      const editor = editorRef.value;
      if (editor == null) return;

      editor.insertText("hello world");
    };

    const printHtml = () => {
      const editor = editorRef.value;
      if (editor == null) return;
      console.log(editor.getHtml());
    };

    const disable = () => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.disable();
    };

    // 数据类型
    interface articleDataType {
      title: string;
      content: string;
      cate_id?: number;
    }

    // 文章信息
    const articleData = reactive<articleDataType>({
      title: "",
      content: valueHtml.value,
      cate_id: undefined,
    });

    // 分类信息
    // const cateOption = reactive([]);
    const cateOption = ref([]);
    getArticleCate().then((res) => {
      cateOption.value = res.data;
    });

    // 分类选择完成
    const selectOk = (value: number) => {
      articleData.cate_id = value;
    };

    // 上传封面
    const isUpload = ref<boolean>(false);
    //input file dom
    const file = ref(null);
    const addAvatar = () => {
      file.value.dispatchEvent(new MouseEvent("click"));
    };
    // 更新的图片
    const addImg = ref<string>("");
    // input change 事件
    let formData = new FormData();
    const addChange = (e) => {
      let img = e.target.files[0]; //获取到上传文件的对象
      // articleData.cover_img = img;
      formData.append("file", img);
      addImg.value = URL.createObjectURL(img);
    };

    // 保存
    const saveArticle = () => {
      formData.append("cate_id", String(articleData.cate_id));
      formData.append("title", String(articleData.title));
      formData.append("content", String(articleData.content));
      addArticle(formData).then((res) => {
        if (res.status === 0) {
          message.success(res.message);
          formData = new FormData();
        } else {
          message.success(res.message);
        }
      });
    };

    return {
      basePath: "",
      routes,
      editorRef,
      mode: "default",
      valueHtml,
      toolbarConfig,
      editorConfig,
      articleData,
      cateOption,
      isUpload,
      addImg,
      file,
      handleCreated,
      handleChange,
      handleDestroyed,
      handleFocus,
      handleBlur,
      customAlert,
      customPaste,
      insertText,
      printHtml,
      disable,
      saveArticle,
      selectOk,
      addAvatar,
      addChange,
    };
  },
});
</script>

<style lang="less" scoped>
.addArticle {
  .container {
    width: 98%;
    margin: 20px auto 0;
    .uploadImg {
      border: 1px solid red;
      width: 150px;
      height: 150px;
      margin: 0 10px;
      display: inline-block;
      border: 1px solid #ccc;
      .add {
        line-height: 150px;
        text-align: center;
        font-size: 40px;
        color: #ccc;
        cursor: pointer;
        position: relative;
        img {
          width: 150px;
          height: 150px;
          position: absolute;
          left: 0;
        }
        input {
          display: none;
        }
      }
    }
  }
  .save {
    display: flex;
    justify-content: center;
    .ant-btn {
      margin: 20px 50px;
      width: 100px;
      height: 40px;
      border-radius: 10px;
    }
  }
}
</style>
