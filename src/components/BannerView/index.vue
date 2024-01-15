<script lang="ts" setup>
import { ref } from "vue";
import BACKIMG from "../../assets/back.png";
import PLUSIMG from "../../assets/plus.png";
import XIALAIMG from "../../assets/xiala.png";
import RECALLIMG from "../../assets/recall.png";
import FORWARD from "../../assets/forward.png";

const showAdd = ref(false);
</script>

<template>
  <div class="banner">
    <div style="display: flex;align-items: center;">
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
      <div class="add_button" @click="showAdd = !showAdd">
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
    <div class="render_button">渲染</div>
  </div>
  <AddView v-if="showAdd" />
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
  justify-content: space-between;
  background-color: white;
  .back_title {
    font-size: 16px;
    font-weight: 600;
    color: #24252c;
  }
  .add_button {
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: 5px;
    margin-left: 15px;
    &:hover {
      cursor: pointer;
      background: #f6f6f6;
    }
  }
  .render_button {
    background: #ffda71;
    border-radius: 6px;
    padding: 6px 15px;
    font-size: 12px;
    font-weight: 600;
    color: #a2662a;
    user-select: none;
    margin-right: 20px;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
