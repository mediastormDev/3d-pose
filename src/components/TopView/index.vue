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
    <canvas id="canvasball" width="200" height="200" style="border: 1px solid">
      Your browser does not support the canvas element.
    </canvas>
  </div>
</template>

<style lang="scss" scoped></style>
