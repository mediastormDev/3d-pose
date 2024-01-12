<script lang="ts" setup>
import BACKIMG from "../../assets/back.png";
import PLUSIMG from "../../assets/plus.png";
import XIALAIMG from "../../assets/xiala.png";
import RECALLIMG from "../../assets/recall.png";
import FORWARD from "../../assets/forward.png";
</script>

<template>
  <div class="banner">
    <div style="display: flex; align-items: center; margin-left: 30px">
      <img style="width: 20px; height: 20px" :src="BACKIMG" />
      <div class="back_title">保存并退出</div>
    </div>
    <div
      style="
        height: 10px;
        background-color: #d8d8d8;
        width: 1px;
        margin-left: 65px;
      "
    ></div>
    <div class="add_button">
      <img style="width: 20px; height: 20px" :src="PLUSIMG" alt="" />
      <img
        style="width: 8px; height: 8px; margin-left: 5px"
        :src="XIALAIMG"
        alt=""
      />
    </div>
    <div style="display: flex; align-items: center; margin-left: 15px">
      <img style="width: 20px; height: 20px" :src="RECALLIMG" alt="" />
      <img
        style="width: 20px; height: 20px; margin-left: 15px"
        :src="FORWARD"
        alt=""
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-height: 50px;
  display: flex;
  align-items: center;
  background-color: white;
  .back_title {
    font-size: 16px;
    font-weight: 600;
    color: #24252c;
  }
  .add_button {
    display: flex;
    align-items: center;
    background: #f6f6f6;
    padding: 5px;
    border-radius: 5px;
    margin-left: 15px;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
