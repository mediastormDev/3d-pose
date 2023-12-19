<script lang="ts" setup>
import UseBodys from "../../composables/useModels";
const { bodys } = UseBodys();
</script>

<template>
  <div v-for="(body, index) in bodys" :key="index">
    <div>{{ body.name }}-{{ body.type }}-{{ body.id }}</div>
    <div :style="{ background: body.color }">{{ body.color }}</div>
  </div>
</template>

<style lang="less" scoped></style>
