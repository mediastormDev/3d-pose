<script setup lang="ts">
import { onMounted } from "vue";
import TopView from "./components/TopView/index.vue";
import BodyView from "./components/BodyView/index.vue";
import ModelView from "./components/ModelView/index.vue";
import GlobalPoseView from "./components/GlobalPoseView/index.vue";
import UseMannequin from "./composables/useMannequin";
import UseBodys from "./composables/useModels";

const { init, rotMov } = UseMannequin();

const { bodys, addBody, face2face, back2back, face2back } = UseBodys();

onMounted(() => {
  init();
  const id = "testId";
  addBody(id, "Male", "#3498db");
  addBody(id + "1", "Female", "#8e44ad");
});
</script>

<template>
  <div class="panel">
    <TopView />
    <fieldset id="group1">
      <div>
        <input
          type="radio"
          class="toggle"
          v-model="rotMov"
          value="rotZ"
          name="group1"
        />
        <span id="rot-z-name">raise</span>
        <input
          type="radio"
          class="toggle"
          v-model="rotMov"
          value="rotX"
          name="group1"
        />
        <span id="rot-x-name">straddle</span>
        <input
          type="radio"
          class="toggle"
          v-model="rotMov"
          value="rotY"
          name="group1"
        />
        <span id="rot-y-name">turn</span>
      </div>
      <div>
        <input
          type="radio"
          class="toggle"
          v-model="rotMov"
          value="movX"
          name="group1"
        /><span>Move X</span>
        <input
          type="radio"
          class="toggle"
          v-model="rotMov"
          value="movY"
          name="group1"
        /><span>Move Y</span>
        <input
          type="radio"
          class="toggle"
          v-model="rotMov"
          value="movZ"
          name="group1"
        /><span>Move Z</span>
      </div>
    </fieldset>
    <div>
      <div @click="face2face">面对</div>
      <div @click="back2back">背对</div>
      <div @click="face2back">面背</div>
    </div>
    <div>
      <BodyView
        v-for="(body, index) in bodys"
        :key="index"
        :body="body"
        :index="index"
      />
    </div>
  </div>
  <div class="panel2">
    <ModelView />
    <GlobalPoseView />
  </div>
</template>

<style scoped>
.panel {
  margin: 0.3em;
  padding: 0.3em;
  width: 12em;
  position: fixed;
  top: 0;
  z-index: 10;
  border-radius: 1em;
  background: rgba(0, 0, 0, 0.01);
  border: solid 1px rgba(0, 0, 0, 0.05);
  box-shadow: inset 0 0 0.1em rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(0.3em);
}
.panel2 {
  margin: 0.3em;
  padding: 0.3em;
  width: 12em;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10;
  border-radius: 1em;
  background: rgba(0, 0, 0, 0.01);
  border: solid 1px rgba(0, 0, 0, 0.05);
  box-shadow: inset 0 0 0.1em rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(0.3em);
}
</style>
