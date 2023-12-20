<script lang="ts" setup>
import { onMounted } from "vue";
import UseTopView from "../../composables/useTopView";

const { init, animate } = UseTopView();

onMounted(() => {
  const canvasTopView = document.getElementById("canvasball");
  const context = canvasTopView.getContext("2d");
  const ratio = window.devicePixelRatio || 1;
  canvasTopView.width = 160 * ratio; // 实际渲染像素
  canvasTopView.height = 160 * ratio; // 实际渲染像素
  canvasTopView.style.width = `${160}px`; // 控制显示大小
  canvasTopView.style.height = `${160}px`; // 控制显示大小

  context.scale(ratio, ratio);

  init(canvasTopView, context);
  animate();
});
</script>

<template>
  <div>
    <div class="title">方位</div>
    <canvas
      id="canvasball"
      width="160"
      height="160"
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
</style>
