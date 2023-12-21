<script lang="ts" setup>
import UseBodys from "../../composables/useModels";
import { Avatar } from "@element-plus/icons-vue";
const { bodys } = UseBodys();
</script>

<template>
  <div class="title">模型</div>
  <div v-for="(body, index) in bodys" :key="index">
    <div class="model_body-view">
      <div class="name_view">
        <el-icon><Avatar /></el-icon>
        <div class="name_box">{{ body.type }}</div>
      </div>
      <div class="color_view" :style="{ background: body.color }"></div>
    </div>
    <!-- <div>{{ body.name }}-{{ body.type }}-{{ body.id }}</div>
    <div :style="{ background: body.color }">{{ body.color }}</div> -->
  </div>
</template>

<style lang="less" scoped>
.title {
  font-size: 14px;
  font-weight: 600;
  color: #24252c;
  margin: 20px 0 10px 0;
}
.model_body-view {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 7px;
  .name_view {
    display: flex;
    align-items: center;
    .name_box {
      margin-left: 8px;
      font-size: 12px;
      font-weight: 600;
      color: #24252c;
    }
  }
  .color_view {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
}
</style>
