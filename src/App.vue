<script setup lang="ts">
import { onMounted } from "vue";
import TopView from "./components/TopView/index.vue";
import BodyView from "./components/BodyView/index.vue";
import ModelView from "./components/ModelView/index.vue";
import OperationView from "./components/OperationView/index.vue";
import BannerView from "./components/BannerView/index.vue";
import GlobalPoseView from "./components/GlobalPoseView/index.vue";
import ButtonsView from "./components/ButtonsView/index.vue";
import ListView from "./components/PoseListView/index.vue";
import UseMannequin from "./composables/useMannequin";
import UseBodys from "./composables/useModels";

const { init } = UseMannequin();

const { bodys, addBody } = UseBodys();

onMounted(() => {
  init();
  const id = "testId";
  // addBody(id, "Male", "#3498db");
  addBody(id + "1", "Female", "#8e44ad");
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
    <div>
      <BodyView
        v-for="(body, index) in bodys"
        :key="index"
        :body="body"
        :index="index"
      />
    </div>
    <ListView />
  </div>
  <div class="panel2">
    <ModelView />
    <GlobalPoseView />
  </div>
</template>

<style lang="less" scoped>
.panel {
  margin: 0.3em;
  // width: 200px;
  padding: 20px;
  position: fixed;
  top: 50px;
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
  margin: 0.3em;
  width: 200px;
  padding: 20px;
  position: fixed;
  top: 50px;
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
