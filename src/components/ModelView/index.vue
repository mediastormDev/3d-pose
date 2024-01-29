<script lang="ts" setup>
import UseBodys from "../../composables/useModels";
import InvisiableIMG from "../../assets/s_invisiable.png";
import VisiableIMG from "../../assets/s_visiable.png";
import CUBEIMG from "../../assets/cube.png";
import RENOUIMG from "../../assets/renou.png";
const { bodys } = UseBodys();
</script>

<template>
  <div class="title">模型</div>
  <div v-for="(body, index) in bodys" :key="index">
    <div class="model_body-view">
      <div class="name_view">
        <img style="width: 16px" :src="RENOUIMG" alt="" />
        <div class="name_box">
          {{ body.type === "Female" ? "女" : "男" }}演员
        </div>
      </div>
      <div class="color_view" :style="{ background: body.color }"></div>
    </div>
  </div>
  <div>
    <div class="model_body-view">
      <div class="name_view">
        <img style="width: 16px" :src="CUBEIMG" alt="" />
        <div class="name_box">几何体</div>
      </div>
      <div style="display: flex; align-items: center">
        <img
          style="height: 12px; width: 12px; margin-right: 13px"
          :src="InvisiableIMG"
          alt=""
        />
        <div class="color_view" style="background: #9eedec"></div>
      </div>
    </div>
  </div>
  <div style="border-bottom: 1px solid #eeeeee; margin-top: 20px"></div>
</template>

<style lang="less" scoped>
.title {
  font-size: 14px;
  font-weight: 600;
  color: #24252c;
  margin: 0 0 10px 0;
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
