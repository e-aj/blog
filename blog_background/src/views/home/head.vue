<template>
  <div class="head">
    <div class="info">
      <img
        :src="userInfo.avatar"
        @click="changeAvatar"
        title="修改头像"
        v-if="userInfo.avatar"
      />
      <img src="../../assets/avatar.png" title="上传头像" v-else @click="changeAvatar" />
      <div class="username" @mousemove="openUserInfo" @mouseleave="closeUserinfo">
        {{ userInfo.username }}
      </div>
    </div>
    <div
      class="usernameInfo"
      v-show="showUserinfo"
      @mousemove="openUserInfo"
      @mouseleave="closeUserinfo"
    >
      <div class="changePassword" @click="changePassword">修改密码</div>
      <div class="logout" @click="logout">退出登录</div>
    </div>

    <!-- 退出弹框 -->
    <a-modal
      v-model:visible="visibleLogout"
      title="退出系统"
      @ok="logoutHandleOk"
      cancelText="取消"
      okText="确定退出"
    >
      <p>是否退出系统</p>
    </a-modal>

    <!-- 更换头像 -->
    <a-modal
      v-model:visible="changeAvatarVisible"
      title="更换头像"
      @ok="changeAvatarHandleOk"
      class="changeAvatar"
      cancelText="取消"
      okText="确定更改"
    >
      <div class="now">
        <span>当前头像</span>
        <img :src="userInfo.avatar" alt="" />
      </div>
      <div class="change">
        <span>上传图片</span>
        <div class="upload">
          <div v-if="isUpload" class="img">
            <img src="" alt="" />
          </div>
          <div v-else class="add" @click="addAvatar">
            +
            <img :src="addImg" alt="" v-show="addImg" />
            <input type="file" ref="file" @change="addChange" />
          </div>
        </div>
      </div>
    </a-modal>

    <!-- 修改密码 -->
    <a-modal
      v-model:visible="updatepwdVisible"
      title="修改密码"
      @ok="updatepwdHandleOk"
      cancelText="取消"
      okText="确定修改"
    >
      <a-form
        :model="pwdData"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        autocomplete="off"
      >
        <a-form-item label="旧密码" name="username">
          <a-input-password v-model:value="pwdData.oldPwd" />
        </a-form-item>

        <a-form-item label="新密码" name="password">
          <a-input-password v-model:value="pwdData.newPwd" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { getUserinfo, updateAvatar, updatepwd } from "../../api/user";
import { useStore } from "../../stores/user";
import { storeToRefs } from "pinia";
export default {
  setup() {
    // 定义router
    const router = useRouter();

    // 定义store
    const store = useStore();
    const storeData = storeToRefs(store);

    // 定义用户信息类型
    interface userInfoType {
      id: string;
      username: string;
      avatar: string;
    }

    // 定义用户信息
    const userInfo = reactive<userInfoType>({
      id: "",
      username: "admin",
      avatar: "",
    });

    // 获取用户信息
    const userinfo = () => {
      getUserinfo().then((res) => {
        userInfo.id = res.data.id;
        userInfo.username = res.data.username;
        userInfo.avatar = res.data.avatar;
        storeData.userinfo = userInfo;
      });
    };

    // 定义userinfo显示
    const showUserinfo = ref<boolean>(false);
    const selectedKeys = ref<string[]>(["1"]);
    const openKeys = ref<string[]>(["sub1"]);

    // 退出弹框
    const visibleLogout = ref<boolean>(false);

    // 显示userinfo
    const openUserInfo = () => {
      showUserinfo.value = true;
    };

    // 关闭userinfo
    const closeUserinfo = () => {
      showUserinfo.value = false;
    };

    // 示退出弹框
    const logout = () => {
      visibleLogout.value = true;
    };

    // 展示退出弹框
    const logoutHandleOk = () => {
      visibleLogout.value = false;
      message.info("退出成功");
      localStorage.clear("token");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    };

    // 更换头像显示框
    const changeAvatarVisible = ref<boolean>(false);

    // 上传切换
    const isUpload = ref<boolean>(false);

    const fileList = ref([]);

    // 更换头像
    const changeAvatar = () => {
      changeAvatarVisible.value = true;
    };

    // 更新的图片
    const addImg = ref("");

    //input file dom
    const file = ref(null);

    // 点击触发添加事件
    const addAvatar = () => {
      file.value.dispatchEvent(new MouseEvent("click"));
    };

    // input change 事件
    const addChange = (e) => {
      // getBase64(e.target.files[0]);
      let img = e.target.files[0]; //获取到上传文件的对象
      compressImg(img);
      // console.log(img);
      // var reader = new FileReader();
      // reader.readAsDataURL(img); //参数为上传的文件对象 传值进去就会触发以下onload方法
      // reader.onload = (i) => {
      //   // e.target.result为转换成的base64编码
      //   // console.log(i.target.result)
      //   addImg.value = i.target.result;
      // };
    };

    // 更换头像确认
    const changeAvatarHandleOk = () => {
      let data = {
        avatar: addImg.value,
        id: userInfo.id,
      };
      updateAvatar(data).then((res) => {
        if (res.status == 0) {
          message.info("更新成功！");
          setTimeout(() => {
            changeAvatarVisible.value = false;
          }, 500);
          userinfo();
          addImg.value = "";
        }
      });
    };

    // 图片压缩函数
    const compressImg = (file: any) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = (e) => {
        // 新建一个img标签
        let image = new Image();
        image.src = e.target.result; //将图片的路径设为file路径
        image.onload = () => {
          //压缩的思路是创建一个图片，将file等于这个图片，然后创建一个canvas图层 ，将canvas等比例缩放，然后用canvas的drawImage将图片与canvas合起来，然后在转成吧canvas的base64转成file即可
          let canvas = document.createElement("canvas");
          let context = canvas.getContext("2d");
          let imageWidth = image.width / 3;
          let imageHeight = image.height / 3;
          let data = "";
          canvas.width = imageWidth;
          canvas.height = imageHeight;

          context.drawImage(image, 0, 0, imageWidth, imageHeight);
          data = canvas.toDataURL("image/jpeg");
          addImg.value = data;
        };
      };
    };

    // 修改密码
    // 定义密码框
    const updatepwdVisible = ref<boolean>(false);

    // 定义密码数据
    const pwdData = reactive({
      oldPwd: "",
      newPwd: "",
    });

    // 改变信息
    const changePassword = () => {
      updatepwdVisible.value = true;
    };

    const updatepwdHandleOk = () => {
      updatepwd(pwdData).then((res) => {
        if (res.status === 0) {
          message.success("修改密码成功！请重新登录！");
          updatepwdVisible.value = false;
          router.push("/login");
        } else {
          message.warn(res.message);
        }
      });
    };

    onMounted(() => {
      userinfo();
    });

    return {
      userInfo,
      showUserinfo,
      visibleLogout,
      selectedKeys,
      openKeys,
      changeAvatarVisible,
      isUpload,
      addImg,
      fileList,
      file,
      updatepwdVisible,
      pwdData,
      openUserInfo,
      closeUserinfo,
      logout,
      changePassword,
      logoutHandleOk,
      changeAvatar,
      changeAvatarHandleOk,
      addAvatar,
      addChange,
      updatepwdHandleOk,
    };
  },
};
</script>

<style lang="less">
.head {
  background: #f0f2f5;
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid #ccc;
  .info {
    display: flex;
    align-items: center;
    img {
      width: 30px;
      height: 30px;
      margin: 0 10px;
      border-radius: 50%;
      cursor: pointer;
    }
    .username {
      font-size: 20px;
      cursor: pointer;
    }
  }
  .usernameInfo {
    background-color: #fff;
    position: absolute;
    top: 65px;
    right: 50px;
    z-index: 9;
    cursor: pointer;
    width: 100px;
    text-align: center;
    div:hover {
      color: #1890ff;
    }
    .logout {
      margin-top: 5px;
    }
  }
}
</style>
