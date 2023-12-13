<script setup lang="ts">
import { onMounted } from "vue";
import TopView from "./components/TopView/index.vue";

import UseMannequin from "./composables/useMannequin";
import UseTopView from "./composables/useTopView";

const { createBall } = UseTopView();

const { init, rotMov, createBody } = UseMannequin();

onMounted(() => {
  init();
  const id = "testId";
  createBall(id);
  createBody(id, "Male");
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
</style>
