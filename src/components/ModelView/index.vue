<script lang="ts" setup>
import UseBodys from "../../composables/useModels";
const { bodys } = UseBodys();
</script>

<template>
  <div class="title">模型</div>
  <div v-for="(body, index) in bodys" :key="index">
    <div>{{ body.name }}-{{ body.type }}-{{ body.id }}</div>
    <div :style="{ background: body.color }">{{ body.color }}</div>
  </div>
</template>

<style lang="less" scoped>
.title {
  font-size: 14px;
  font-weight: 600;
  color: #24252c;
  margin: 20px;
}
</style>
