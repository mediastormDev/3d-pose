<script lang="ts" setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import UseBodys from "../../composables/useModels";
import UseMannequin from "../../composables/useMannequin";
import { balls } from "../../composables/useTopView";

const { setPosture } = UseMannequin();

const list = ref([]);

const { changePose3D, getModelById } = UseBodys();

const getList = async () => {
  const res = await axios.get("/api/humanpose");
  list.value = res.data;
  console.log("getList", list.value);
};

const onClickData = (data: any) => {
  const target = balls.value.filter((it) => it.selected)[0];

  const poseString = `{"version":7,"data":[[0,3.8,0],[0,-90,0],[0,0,-2],[0,0,5],[6,0,0],[0],[-6,-6,-0.6],[-6,0,0],[0],[6,6,-0.6],[7,-0.6,-5],[15],[5,0,0],[-90,70,75,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[-7,0.6,-5],[15],[-5,0,0],[90,-70,75,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10]]}`;

  console.log("target", target);
  const model = getModelById(target.id);
  setPosture(model, poseString);
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
