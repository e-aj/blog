<template>
  <div class="uploadImg">
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
</template>
<script></script>
