<script lang="ts" setup>
import ARROWIMG from "../../assets/right_1.png";
import RENOUIMG from "../../assets/renou.png";
import CUBEIMG from "../../assets/cube.png";
import ITEMIMG from "../../assets/item.png";
</script>

<template>
  <div class="add_view">
    <div class="item">
      <div style="display: flex; align-items: center">
        <img :src="RENOUIMG" style="width: 16px; height: 16px" alt="" />
        <div class="title">人偶</div>
      </div>
      <img :src="ARROWIMG" style="width: 20px; height: 20px" alt="" />
    </div>
    <div class="item">
      <div style="display: flex; align-items: center">
        <img :src="CUBEIMG" style="width: 16px; height: 16px" alt="" />
        <div class="title">几何体</div>
      </div>
      <img :src="ARROWIMG" style="width: 20px; height: 20px" alt="" />
    </div>
    <div class="item">
      <div style="display: flex; align-items: center">
        <img :src="ITEMIMG" style="width: 16px; height: 16px" alt="" />
        <div class="title">道具</div>
      </div>
      <img :src="ARROWIMG" style="width: 20px; height: 20px" alt="" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.add_view {
  position: fixed;
  top: 60px;
  left: 290px;
  padding: 10px;
  border-radius: 6px;
  background: #ffffff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.07);
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-radius: 6px;
    width: 180px;
    .title {
      font-size: 13px;
      font-weight: 600;
      color: #24252c;
      margin-left: 10px;
    }
    &:hover {
      background-color: #f4f6f7;
      cursor: pointer;
    }
  }
}
</style>
