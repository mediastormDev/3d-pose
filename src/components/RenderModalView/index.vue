<script lang="ts" setup>
import { ref, inject } from "vue";
import CLOSEIMG from "../../assets/close@2x.png";
import XIALAIMG from "../../assets/xiala.png";
import XIALA2IMG from "../../assets/xiala@2x.png";
import PLUS2IMG from "../../assets/plus_2.png";

const setRenderViewStatus = inject("setRenderViewStatus");

const showModal = ref(false);
const showVideo = ref(false);
const videoRef = ref(null);

const selectedList = ref(["杭州小潘", "咖啡厅"]);
const selected2List = ref(["少女A", "成年男性A", "杭州小潘"]);
const selected3List = ref(["咖啡厅", "教室", "办公室"]);

const start = () => {
  showVideo.value = true;
  if (videoRef.value.paused) {
    videoRef.value.play();
  } else {
    videoRef.value.pause();
  }
};
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
          <div style="margin-bottom: 25px; position: relative">
            <div class="sub_title" style="margin-bottom: 5px">预设</div>
            <div class="multi_select" @click="showModal = !showModal">
              <div style="display: flex; align-items: center">
                <div
                  class="selected_item"
                  v-for="(selected, index) in selectedList"
                  :key="index"
                >
                  {{ selected }}
                </div>
              </div>
              <img
                class="icon"
                :src="showModal ? XIALA2IMG : XIALAIMG"
                alt=""
              />
            </div>
            <div v-if="showModal" class="pop_menu">
              <div class="title">外型预设</div>
              <div style="display: flex; align-items: center; margin-top: 10px">
                <div
                  class="selected_item"
                  :class="{ selected: index == 2 }"
                  v-for="(selected, index) in selected2List"
                  :key="index"
                >
                  {{ selected }}
                </div>
                <div
                  style="
                    background-color: #f4f6f7;
                    padding: 2px 6px;
                    border-radius: 6px;
                    margin-left: 5px;
                  "
                >
                  <img style="width: 14px" :src="PLUS2IMG" alt="" />
                </div>
              </div>

              <div class="title" style="margin-top: 20px">场地预设</div>
              <div style="display: flex; align-items: center; margin-top: 10px">
                <div
                  class="selected_item"
                  :class="{ selected: index == 0 }"
                  v-for="(selected, index) in selected3List"
                  :key="index"
                >
                  {{ selected }}
                </div>
              </div>
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
          <div class="export_button" @click="start">导出</div>
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
          >
            <video
              :style="{ visibility: showVideo ? 'visible' : 'hidden' }"
              ref="videoRef"
              playsinline
              muted
              class="container_box"
              src="https://www.runoob.com/try/demo_source/mov_bbb.mp4"
            >
              <object
                data="https://www.runoob.com/try/demo_source/mov_bbb.mp4"
                width="100%"
                height="100%"
              >
                <embed
                  width="100%"
                  height="100%"
                  src="https://www.runoob.com/try/demo_source/mov_bbb.mp4"
                />
              </object>
            </video>
          </div>
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
  user-select: none;
  &:hover {
    cursor: pointer;
  }
  &.selected {
    background-color: #fffbf0;
    color: #ffaf00;
  }
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

.pop_menu {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translateY(100% + 5px);

  background: #ffffff;
  border-radius: 6px;
  border: 1px solid #eeeeee;
  padding: 10px;
}

.title {
  font-size: 16px;
  font-weight: 500;
  color: #24252c;
}
.body_view {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
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

.container_box {
  width: 100%;
  height: 100%;
}
</style>
