<script lang="ts" setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const list = ref([]);

const getList = async () => {
  const res = await axios.get("/api/humanpose");
  list.value = res.data;
  console.log("getList", list.value);
};

onMounted(() => {
  getList();
});
</script>
<template>
  <div>姿态解析数据列表</div>
  <div v-for="(item, index) in list" :key="index">
    {{ item.createdAt }}-{{ item._id }}
  </div>
</template>

<style lang="less" scoped></style>
