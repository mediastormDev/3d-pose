<script lang="ts" setup>
import { computed } from "vue";
import { useMouse } from "@vueuse/core";

const { x: mouseX, y: mouseY } = useMouse();

const props = defineProps<{ menuBounding?: any; index: number }>();

const svgWidth = computed(() => {
  return props.menuBounding.x - mouseX.value + 4;
});
const svgHeight = computed(() => props.menuBounding.height);
</script>
<template>
  <svg
    style="position: fixed; pointer-events: none; z-index: 2"
    :style="{
      width: svgWidth,
      height: menuBounding.height,
      top: menuBounding.y,
      left: mouseX - 2,
    }"
    id="svg-safe-area"
  >
    <!-- 矩形区域 -->
    <path
      style="pointer-events: none"
      width="100%"
      height="100%"
      fill="rgba(187,39,38,0.05)"
      :d="`M 0,0 L ${svgWidth},0 L ${svgWidth},${svgHeight} L 0,${svgHeight} z`"
    />
    <!-- 三角安全区域 -->
    <path
      style="pointer-events: auto"
      stroke="red"
      strokeWidth="0.4"
      fill="rgba(114,140,89,0.3)"
      :d="`M 0, ${mouseY - menuBounding.y}
          L ${svgWidth},${svgHeight}
          L ${svgWidth},0 z`"
    />
  </svg>
</template>

<style lang="less" scoped></style>
