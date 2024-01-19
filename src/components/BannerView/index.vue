<script lang="ts" setup>
import { ref, inject } from "vue";
import BACKIMG from "../../assets/back.png";
import PLUSIMG from "../../assets/plus.png";
import XIALAIMG from "../../assets/xiala.png";
import RECALLIMG from "../../assets/recall.png";
import FORWARD from "../../assets/forward.png";
import useMannequin from "../../composables/useMannequin";

const { setSceneBg } = useMannequin();

const showAdd = ref(false);
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const handleChange = (e) => {
  const target = e.target as HTMLInputElement;
  const files = Array.from(target.files); // 注意这里取得的是一个类数组
  if (files) {
    // 取得文件
    const uploadedFile = files[0];
    console.log("uploadedFile", uploadedFile);
    // 创建对象
    const img = new Image();

    // 改变图片的src
    img.src = window.URL.createObjectURL(uploadedFile);
    img.onload = async function () {
      const base64 = await toBase64(uploadedFile);
      setSceneBg(base64, img.width / img.height);
      console.log("img.width", img.width);
      console.log("img.height", img.height);
    };
  }
};

const setRenderViewStatus = inject("setRenderViewStatus");
</script>

<template>
  <div class="banner">
    <div style="display: flex; align-items: center">
      <div style="display: flex; align-items: center; margin-left: 30px">
        <img style="width: 20px; height: 20px" :src="BACKIMG" />
        <div class="back_title">保存并退出</div>
      </div>
      <div
        style="
          height: 10px;
          background-color: #d8d8d8;
          width: 1px;
          margin-left: 65px;
        "
      ></div>
      <div class="add_button" @click="showAdd = !showAdd">
        <img style="width: 20px; height: 20px" :src="PLUSIMG" alt="" />
        <img
          style="width: 8px; height: 8px; margin-left: 5px"
          :src="XIALAIMG"
          alt=""
        />
      </div>
      <div style="display: flex; align-items: center; margin-left: 15px">
        <img style="width: 20px; height: 20px" :src="RECALLIMG" alt="" />
        <img
          style="width: 20px; height: 20px; margin-left: 15px"
          :src="FORWARD"
          alt=""
        />
      </div>
    </div>
    <div style="display: flex; align-items: center">
      <input
        style="display: none"
        type="file"
        id="myFile"
        @change="handleChange"
        name="filename"
        accept="image/*"
      />
      <label class="render_button sub_button" for="myFile"> 上传背景 </label>
      <div @click="setRenderViewStatus" class="render_button">渲染</div>
    </div>
  </div>
  <AddView v-if="showAdd" />
</template>

<style lang="less" scoped>
.banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  .back_title {
    font-size: 16px;
    font-weight: 600;
    color: #24252c;
  }
  .add_button {
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: 5px;
    margin-left: 15px;
    &:hover {
      cursor: pointer;
      background: #f6f6f6;
    }
  }
  .render_button {
    background: #ffda71;
    border-radius: 6px;
    padding: 6px 15px;
    font-size: 12px;
    font-weight: 600;
    color: #a2662a;
    user-select: none;
    margin-right: 20px;

    &:hover {
      cursor: pointer;
    }
  }
}

.sub_button {
  background-color: white !important;
  border: 1px solid #eee !important;
  color: #24252c !important;
}
</style>
