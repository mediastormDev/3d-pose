<script lang="ts" setup>
import { onMounted, ref } from "vue";
import UseTopView from "../../composables/useTopView";
import SaveImage from "../../assets/save.png";

const { init, animate } = UseTopView();

const canvasWidth = ref(160);
const canvasHeight = ref(160);

onMounted(() => {
  const canvasTopView = document.getElementById("canvasball");
  const context = canvasTopView.getContext("2d");
  const ratio = window.devicePixelRatio || 1;
  canvasTopView.width = canvasWidth.value * ratio; // 实际渲染像素
  canvasTopView.height = canvasHeight.value * ratio; // 实际渲染像素
  canvasTopView.style.width = `${canvasWidth.value}px`; // 控制显示大小
  canvasTopView.style.height = `${canvasHeight.value}px`; // 控制显示大小
  context.scale(ratio, ratio);

  init(canvasTopView, context);
  animate();
});
</script>

<template>
  <div style="width: 100%">
    <div
      style="display: flex; align-items: center; justify-content: space-between"
    >
      <div class="title2">全局模板</div>
      <img style="width: 18px; height: 18px" :src="SaveImage" alt="SaveImage" />
    </div>
    <div style="margin-top: 10px">
      <el-button>站立对话</el-button>
      <el-button style="margin-left: 7px">斗殴</el-button>
    </div>
  </div>
  <div style="border-bottom: 1px solid #eeeeee; padding-bottom: 20px;width: 100%;"></div>
  <div>
    <div class="title">方位</div>
    <canvas
      id="canvasball"
      :width="canvasWidth"
      :height="canvasHeight"
      style="border: 1px solid #eeeeee"
    >
      Your browser does not support the canvas element.
    </canvas>
  </div>
</template>

<style lang="less" scoped>
.title {
  font-size: 14px;
  font-weight: 600;
  color: #24252c;
  margin: 20px 0 10px 0;
}

.title2 {
  font-size: 14px;
  font-weight: 600;
  color: #24252c;
}

.el_button-view {
  display: flex;
  flex-wrap: wrap;
  row-gap: 7px;
  column-gap: 7px;
}
.el-button {
  height: 28px;
  background: #f4f6f7;
  border-radius: 6px;
  border: none;
  font-size: 12px;
  font-weight: 500;
  color: #24252c;
}

.el-button + .el-button {
  margin-left: 0;
}
</style>
