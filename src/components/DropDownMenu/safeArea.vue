<script lang="ts" setup>
import { ref, Ref, computed, watch } from "vue";
import { useMouse } from "@vueuse/core";

const { x: mouseX, y: mouseY } = useMouse();

const props = defineProps<{ menuRef?: Ref<HTMLElement>[]; index: number }>();

const submenuWidth = ref(0);
const submenuHeight = ref(0);
const submenuX = ref(0);
const submenuY = ref(0);

watch(
  () => props.menuRef,
  (currentRef) => {
    if (currentRef) {
      console.log("currentRef :>> ", currentRef);
      const { width, height, x, y } =
        currentRef[props.index].getBoundingClientRect();
      console.log(width, height, x, y);
      submenuWidth.value = width;
      submenuHeight.value = Math.max(height, 32.5);
      submenuX.value = x;
      submenuY.value = y;
    }
  },
  { deep: true }
);

const svgWidth = computed(() => {
  return submenuX.value - mouseX.value + 4;
});
const svgHeight = computed(() => submenuHeight.value);
</script>
<template>
  <svg
    style="position: fixed; pointer-events: none; z-index: 2"
    :style="{
      width: svgWidth,
      height: submenuHeight,
      top: submenuY,
      left: mouseX - 2,
    }"
    id="svg-safe-area"
  >
    <path
      style="pointer-events: auto"
      fill="rgba(114,140,89,0)"
      :d="`M 0 ${mouseY - submenuY},
          L ${svgWidth},${svgHeight}, 
          L ${svgWidth} 0 z`"
    />
  </svg>
</template>

<style lang="less" scoped></style>
