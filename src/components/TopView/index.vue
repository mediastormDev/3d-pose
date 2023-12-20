<script lang="ts" setup>
import { onMounted } from "vue";
import UseTopView from "../../composables/useTopView";

const { init, animate } = UseTopView();

onMounted(() => {
  let canvasTopView = document.getElementById("canvasball");
  let context = canvasTopView.getContext("2d");

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
