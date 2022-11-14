<template>
  <div class="updateArticle">
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
        <a-form-item has-feedback label="封面" name="cover_img">
          <div class="uploadImg" @click="addAvatar">
            <img :src="articleData.cover_img" alt="" v-show="isUpload" />
            <div class="add" v-show="!isUpload">
              +
              <input type="file" ref="uploadFile" @change="addChange" />
            </div>
          </div>
        </a-form-item>
        <a-form-item has-feedback label="分类" name="title">
          <a-select
            v-model:value="articleData.cate_id"
            style="width: 100%"
            placeholder="请选择分类"
            :options="cateOption.map((item:any) => ({ value: item.id, label: item.name }))"
            @select="selectOk"
          ></a-select>
        </a-form-item>
      </a-form>
      <div style="border: 1px solid #ccc; margin-top: 10px">
        <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"
        />
        <Editor
          style="height: 500px; overflow-y: hidden"
          v-model="articleData.content"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
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
import { defineComponent, ref, onBeforeUnmount, shallowRef, reactive } from "vue";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { getArticle, updateArticle } from "../../api/article";
import { message } from "ant-design-vue";
import { getArticleCate } from "../../api/artCate";
import { useRoute, useRouter } from "vue-router";

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
        breadcrumbName: "修改文章",
      },
    ]);

    // 定义router
    const router = useRouter();
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();

    const toolbarConfig = {};

    // 自定义校验链接
    function customCheckLinkFn(text: string, url: string): string | boolean | undefined {
      // TS 语法
      // function customCheckLinkFn(text, url) {                                              // JS 语法

      if (!url) {
        return;
      }
      if (url.indexOf("http") !== 0) {
        return "链接必须以 http/https 开头";
      }
      return true;

      // 返回值有三种选择：
      // 1. 返回 true ，说明检查通过，编辑器将正常插入链接
      // 2. 返回一个字符串，说明检查未通过，编辑器会阻止插入。会 alert 出错误信息（即返回的字符串）
      // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止插入。但不会提示任何信息
    }

    // 自定义转换链接 url
    function customParseLinkUrl(url: string): string {
      // TS 语法
      // function customParseLinkUrl(url) {                // JS 语法

      if (url.indexOf("http") !== 0) {
        return `http://${url}`;
      }
      return url;
    }

    // 自定义校验视频
    function customCheckVideoFn(
      src: string,
      poster: string
    ): boolean | string | undefined {
      // TS 语法
      // function customCheckVideoFn(src, poster) {                                             // JS 语法
      if (!src) {
        return;
      }
      if (src.indexOf("http") !== 0) {
        return "视频地址必须以 http/https 开头";
      }
      return true;

      // 返回值有三种选择：
      // 1. 返回 true ，说明检查通过，编辑器将正常插入视频
      // 2. 返回一个字符串，说明检查未通过，编辑器会阻止插入。会 alert 出错误信息（即返回的字符串）
      // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止插入。但不会提示任何信息
    }

    // 自定义转换视频
    function customParseVideoSrc(src: string): string {
      // TS 语法
      // function customParseVideoSrc(src) {               // JS 语法
      if (src.includes(".bilibili.com")) {
        // 转换 bilibili url 为 iframe （仅作为示例，不保证代码正确和完整）
        const arr = location.pathname.split("/");
        const vid = arr[arr.length - 1];
        return `<iframe src="//player.bilibili.com/player.html?bvid=${vid}" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>`;
      }
      return src;
    }

    const editorConfig = {
      placeholder: "请输入内容...",
      MENU_CONF: {
        insertLink: {
          checkLink: customCheckLinkFn, // 也支持 async 函数
          parseLinkUrl: customParseLinkUrl, // 也支持 async 函数
        },
        editLink: {
          checkLink: customCheckLinkFn, // 也支持 async 函数
          parseLinkUrl: customParseLinkUrl, // 也支持 async 函数
        },
        uploadImage: {
          // 请求路径
          server: "http://192.168.12.62:3333/api/uploadImage",
          // 后端接收的文件名称
          fieldName: "file",
          maxFileSize: 1 * 1024 * 1024, // 1M
          // 上传的图片类型
          allowedFileTypes: ["image/*"],

          // 小于该值就插入 base64 格式（而不上传），默认为 0
          base64LimitSize: 10 * 1024, // 10MB
          // 自定义插入返回格式【后端返回的格式】
          customInsert(res: any, insertFn: any) {
            if (res.code != 200 && res.success == false) {
              message.error("上传文件失败，" + res.message);
              return;
            }
            insertFn(res.data.url, res.data.alt);
          },
          // 将 meta 拼接到 url 参数中，默认 false
          metaWithUrl: true,
          // 单个文件上传成功之后
          onSuccess(file: any, res: any) {
            console.log(res);
            if (res.error === 0) {
              message.success(`${file.name} 上传成功`);
              return;
            } else {
              message.warning(`${file.name} 上传出了点异常`);
              return;
            }
            // console.log(`${file.name} 上传成功`, res)
            //ElMessage.success(`${file.name} 上传成功`, res)
          },
          // 单个文件上传失败
          onFailed(file: any, res: any) {
            console.log(res);
            message.error(`${file.name} 上传失败`);
          },
          // 上传错误，或者触发 timeout 超时
          onError(file: any, err: any, res: any) {
            console.log(err, res);
            message.error(`${file.name} 上传超时`);
          },
        },
        insertVideo: {
          onInsertedVideo(videoNode: null) {
            // TS 语法
            // onInsertedVideo(videoNode) {                    // JS 语法
            if (videoNode == null) return;

            const { src } = videoNode;
            console.log("inserted video", src);
          },
          checkVideo: customCheckVideoFn, // 也支持 async 函数
          parseVideoSrc: customParseVideoSrc, // 也支持 async 函数
        },
      },
    };

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    const handleCreated = (editor: any) => {
      editorRef.value = editor; // 记录 editor 实例，重要！
    };

    // 数据类型
    interface articleDataType {
      id: number;
      title: string;
      content: string;
      cate_id?: number;
      cover_img?: string;
    }

    // 文章信息
    const articleData = reactive<articleDataType>({
      id: 0,
      title: "",
      content: "",
      cate_id: undefined,
      cover_img: undefined,
    });

    // 接收路由传的参数
    articleData.id = Number(useRoute().params.id);

    // 获取文章信息
    const getArt = () => {
      getArticle(articleData.id).then((res) => {
        if (res.status === 0) {
          articleData.title = res.data.title;
          articleData.cate_id = res.data.cate_id;
          articleData.content = res.data.content;
          articleData.cover_img = res.data.cover_img;
          isUpload.value = articleData.cover_img ? true : false;
        } else {
          message.warn(res.message);
        }
      });
    };
    getArt();

    // 分类信息
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
    const uploadFile = ref<HTMLElement>();
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
        // e.target.result为转换成的base64编码
        // console.log(i.target.result)
        articleData.cover_img = i.target.result;
      };
      isUpload.value = true;
    };

    // 保存
    const saveArticle = () => {
      formData.append("id", String(articleData.id));
      formData.append("cate_id", String(articleData.cate_id));
      formData.append("title", String(articleData.title));
      formData.append("content", String(articleData.content));
      updateArticle(formData).then((res) => {
        formData = new FormData();
        if (res.status === 0) {
          message.success(res.message);
          setTimeout(() => {
            router.push("/articleList");
          }, 1000);
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
      toolbarConfig,
      editorConfig,
      articleData,
      cateOption,
      isUpload,
      uploadFile,
      handleCreated,
      saveArticle,
      selectOk,
      addAvatar,
      addChange,
    };
  },
});
</script>

<style lang="less" scoped>
.updateArticle {
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
