<script lang="ts" setup>
import { computed } from "vue";
import { balls } from "../../composables/useTopView";
import UseBodys from "../../composables/useModels";
const { face2face, back2back, face2back } = UseBodys();

const selectedTwoMore = computed(() => {
  return balls.value.filter((ball) => ball.selected).length < 2;
});
</script>

<template>
  <el-row style="margin-top: 10px; margin-bottom: 20px">
    <el-button
      :disabled="selectedTwoMore"
      class="action_button"
      @click="face2face"
      >面对</el-button
    >
    <el-button
      :disabled="selectedTwoMore"
      class="action_button"
      @click="back2back"
      >背对</el-button
    >
    <el-button
      :disabled="selectedTwoMore"
      class="action_button"
      @click="face2back"
      >面背</el-button
    >
  </el-row>
</template>

<style lang="less" scoped>
.action_button {
  width: 50px;
  height: 28px;
  background: #f4f6f7;
  border-radius: 6px;
  border: none;
}
</style>
