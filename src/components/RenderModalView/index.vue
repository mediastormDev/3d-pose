<script lang="ts" setup>
import { ref, inject } from "vue";
import CLOSEIMG from "../../assets/close@2x.png";
import XIALAIMG from "../../assets/xiala.png";
import XIALA2IMG from "../../assets/xiala@2x.png";

const setRenderViewStatus = inject("setRenderViewStatus");

const selectedList = ref(["杭州小潘", "咖啡厅"]);
</script>
<template>
  <div class="render_model">
    <div class="mask"></div>
    <div class="body body_view">
      <div class="header">
        <div class="title">分镜渲染</div>
        <img
          class="close_button"
          @click="setRenderViewStatus"
          :src="CLOSEIMG"
          alt=""
        />
      </div>
      <div style="display: flex">
        <div style="flex: 1; display: flex; flex-direction: column">
          <div style="margin-bottom: 25px">
            <div class="sub_title" style="margin-bottom: 5px">预设</div>
            <div class="multi_select">
              <div style="display: flex; align-items: center">
                <div
                  class="selected_item"
                  v-for="(selected, index) in selectedList"
                  :key="index"
                >
                  {{ selected }}
                </div>
              </div>
              <img class="icon" :src="XIALAIMG" alt="" />
            </div>
          </div>
          <div class="sub_title">正向描述词</div>
          <textarea
            rows="4"
            cols="50"
            class="input_view"
            style="margin-bottom: 30px"
          />
          <div class="sub_title">反向描述词</div>
          <textarea rows="4" cols="50" class="input_view" />
          <div class="export_button">导出</div>
        </div>
        <div
          style="
            flex: 1;
            margin-left: 30px;
            padding-left: 30px;
            border-left: 1px solid #eee;
            display: flex;
            flex-direction: column;
          "
        >
          <div class="sub_title">画面</div>
          <div
            style="
              border: 1px solid #eee;
              width: 100%;
              height: 100%;
              border-radius: 6px;
            "
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.close_button {
  width: 20px;
  height: 20px;
  &:hover {
    cursor: pointer;
  }
}

.selected_item {
  background: #f4f6f7;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #24252c;
  padding: 5px 10px;
}

.selected_item + .selected_item {
  margin-left: 5px;
}

.multi_select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  border-radius: 6px;
  border: 1px solid #eeeeee;
  padding: 5px;
  &:hover {
    cursor: pointer;
  }
  .title {
    font-size: 14px;
    font-weight: 600;
    color: #24252c;
  }
  .icon {
    width: 10px;
    height: 10px;
  }
}
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
    padding: 30px 20px 0 20px;
  }
  .export_button {
    margin-top: 30px;
    background: #ffda71;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    color: #a2662a;
    text-align: center;
    padding: 12px 0;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
