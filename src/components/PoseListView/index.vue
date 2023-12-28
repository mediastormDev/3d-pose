<script lang="ts" setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import UseBodys from "../../composables/useModels";
import { balls } from "../../composables/useTopView";

const list = ref([]);

const { changePose3D, getModelById } = UseBodys();

const getList = async () => {
  const res = await axios.get("/api/humanpose");
  list.value = res.data;
  console.log("getList", list.value);
};

const onClickData = (data: any) => {
  const target = balls.value.filter((it) => it.selected)[0];
  console.log("target", target);
  const model = getModelById(target.id);
  console.log("model", model);
  changePose3D(model, data);
};

onMounted(() => {
  getList();
});
</script>
<template>
  <div>姿态解析数据列表</div>
  <div
    v-for="(item, index) in list"
    :key="index"
    @click="onClickData(item.data)"
  >
    {{ item._id }}
  </div>
</template>

<style lang="less" scoped></style>
