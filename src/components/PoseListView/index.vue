<script lang="ts" setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import UseBodys from "../../composables/useModels";
import UseMannequin from "../../composables/useMannequin";
import { balls } from "../../composables/useTopView";
import appleqr from "../../assets/appleqr.svg";

const { setPosture } = UseMannequin();

const list = ref([]);

const { changePose3D, getModelById } = UseBodys();

const getList = async () => {
  const res = await axios.get("/api/humanpose");
  list.value =
    res.data.map((data: any) => {
      data.data.map((it: any, index: number) => {
        if (
          index === 1 ||
          index === 2 ||
          index === 3 ||
          index === 4 ||
          index === 5 ||
          index === 6 ||
          index == 11 ||
          index == 12 ||
          index == 13 ||
          index == 14 ||
          index == 15 ||
          index == 16
        ) {
          it[0] = -it[0];
        }
      });

      return data;
    }) || [];
};

const onClickData = (data: any) => {
  const target = balls.value.filter((it) => it.selected)[0];
  if (!target) {
    alert("请先选择模型");
    return;
  }

  const poseString = `{"version":7,"data":[[0,3.8,0],[0,-90,0],[0,0,-2],[0,0,5],[6,0,0],[0],[-6,-6,-0.6],[-6,0,0],[0],[6,6,-0.6],[7,-0.6,-5],[15],[5,0,0],[-90,70,75,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[-7,0.6,-5],[15],[-5,0,0],[90,-70,75,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10]]}`;

  const model = getModelById(target.id);
  setPosture(model, poseString);
  changePose3D(model, data);
};

onMounted(() => {
  getList();
});
</script>
<template>
  <div>姿态解析数据列表</div>
  <div style="display: flex; flex-direction: column; align-items: center">
    <img style="width: 100px" :src="appleqr" alt="" />
    <span style="color: red; margin-bottom: 20px; font-size: 12px"
      >扫我录入数据</span
    >
  </div>
  <div
    v-for="(item, index) in list"
    :key="index"
    @click="onClickData(item.data)"
  >
    数据{{ index }}
  </div>
</template>

<style lang="less" scoped></style>
