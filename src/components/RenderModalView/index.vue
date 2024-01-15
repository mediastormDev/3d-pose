<script lang="ts" setup>
import { ref, inject } from "vue";
const setRenderViewStatus = inject("setRenderViewStatus");
</script>
<template>
  <div class="render_model">
    <div class="mask"></div>
    <div class="body body_view">
      <div class="header">
        <div class="title">分镜渲染</div>
        <div @click="setRenderViewStatus">X</div>
      </div>
      <div style="display: flex">
        <div>
          <div class="sub_title" style="margin-bottom: 5px">预设</div>
          <input style="margin-bottom: 25px" type="text" />
          <div class="sub_title">正向描述词</div>
          <textarea
            rows="4"
            cols="50"
            class="input_view"
            style="margin-bottom: 30px"
          />
          <div class="sub_title">反向描述词</div>
          <textarea rows="4" cols="50" class="input_view" />
        </div>
        <div>
          <div class="sub_title">画面</div>
          <input type="text" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.body_view {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    .title {
      font-size: 16px;
      font-weight: 500;
      color: #24252c;
    }
  }
  .sub_title {
    font-size: 14px;
    font-weight: 600;
    color: #24252c;
    margin-bottom: 10px;
  }

  .input_view {
    height: 158px;
    border-radius: 6px;
    border: 1px solid #eeeeee;
    padding: 7px 10px;
    resize: none;
  }
}
.render_model {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.1);
  }
  .body {
    background-color: white;
    z-index: 11;
    width: 1188px;
    height: 700px;
    background: #ffffff;
    border-radius: 20px;
    padding: 30px 20px;
  }
}
</style>
