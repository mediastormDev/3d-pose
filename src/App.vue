<script setup lang="ts">
import { onMounted, ref, provide } from "vue";
import TopView from "./components/TopView/index.vue";
import BodyView from "./components/BodyView/index.vue";
import ModelView from "./components/ModelView/index.vue";
import OperationView from "./components/OperationView/index.vue";
import BannerView from "./components/BannerView/index.vue";
import GlobalPoseView from "./components/GlobalPoseView/index.vue";
import ButtonsView from "./components/ButtonsView/index.vue";
import PoseListView from "./components/PoseListView/index.vue";
import UseMannequin from "./composables/useMannequin";
import UseBodys from "./composables/useModels";
import ContentMenu from "./components/ContentMenu/index.vue";

const { init, showContentMenu } = UseMannequin();

const { bodys, addBody } = UseBodys();

const showRender = ref(false);

const setRenderViewStatus = () => {
  showRender.value = !showRender.value;
};

provide("setRenderViewStatus", setRenderViewStatus);

onMounted(() => {
  init();
  const id = "testId";
  addBody(id, "Male", "#3498db");
  addBody(id + "1", "Male", "#3498db");
  // addBody(id + "1", "Female", "#8e44ad");
});
</script>

<template>
  <div class="panel1">
    <BannerView />
  </div>
  <div class="panel">
    <TopView />
    <OperationView />
    <ButtonsView />
    <div style="width: 100%">
      <BodyView
        v-for="(body, index) in bodys"
        :key="index"
        :body="body"
        :index="index"
      />
    </div>
    <!-- <PoseListView /> -->
  </div>
  <div class="panel2">
    <div style="overflow: auto; height: 80vh">
      <ModelView />
      <GlobalPoseView />
    </div>
  </div>
  <ContentMenu v-if="showContentMenu" />
  <RenderModalView
    :style="{ visibility: showRender ? 'visible' : 'hidden' }"
    v-if="showRender"
    style="z-index: 11"
  />
</template>

<style lang="less" scoped>
.panel {
  padding: 20px;
  position: fixed;
  left: 0;
  top: 50px;
  bottom: 0;
  z-index: 10;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.panel1 {
  // width: 200px;
  position: fixed;
  top: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.panel2 {
  width: 318px;
  padding: 20px;
  position: fixed;
  top: 50px;
  bottom: 0;
  right: 0;
  z-index: 10;
  background-color: white;
  /* border-radius: 1em;
  background: rgba(0, 0, 0, 0.01);
  border: solid 1px rgba(0, 0, 0, 0.05);
  box-shadow: inset 0 0 0.1em rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(0.3em); */
}
</style>
