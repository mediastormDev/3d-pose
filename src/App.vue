<script setup lang="ts">
import { onMounted } from "vue";
import TopView from "./components/TopView/index.vue";

import UseMannequin, { models } from "./composables/useMannequin";
import UseTopView, { balls } from "./composables/useTopView";

const { createBall } = UseTopView();

const { init, rotMov, createBody } = UseMannequin();

// function setPosture() {
//   if (!model) return;

//   var string = prompt(
//     "Reset the posture to:",
//     `{"version":7,"data":[[0,3.8,0],[0,-90,0],[0,0,-21.9],[2.6,0.2,6.6],[19,6.7,48.9],[85.4],[-6,-6,34.1],[-9.7,-5.5,62.7],[78.7],[6,6,46.9],[21,-28.9,5.8],[112.6],[31.2,-2.1,-4.2],[-90,70,75,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[-37.6,7.5,55.6],[138.1],[-57.8,52.6,46.8],[90,-70,75,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10]]}`
//   );

//   if (string) {
//     var oldPosture = model.posture;

//     try {
//       model.postureString = string;
//     } catch (error) {
//       model.posture = oldPosture;
//       if (error instanceof MannequinPostureVersionError) alert(error.message);
//       else
//         alert(
//           "The provided posture was either invalid or impossible to understand."
//         );
//       console.error(error);
//     }
//     renderer.render(scene, camera);
//   }
// }

const addBody = (id: string, type: string) => {
  createBall(id);
  createBody(id, type);
};

const face2face = () => {
  const selected = balls.filter((ball) => ball.selected);
  if (selected.length !== 2) {
    alert("Please select two balls");
    return;
  }
  const [ball1, ball2] = selected;
  console.log(ball1.id, ball2.id);
  const bodys = models.filter((model) => {
    return model._id === ball1.id || model._id === ball2.id;
  });
  const [body1, body2] = bodys;
  console.log(body1.position, body2.position);
  const radius = Math.atan2(
    body2.position.x - body1.position.x,
    body2.position.z - body1.position.z
  );

  const radius2 = Math.atan2(
    body1.position.x - body2.position.x,
    body1.position.z - body2.position.z
  );

  body1.rotation.y = radius2 + Math.PI;
  body2.rotation.y = radius + Math.PI;
};

onMounted(() => {
  init();
  const id = "testId";
  addBody(id, "Male");
  addBody(id + "1", "Female");
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
      <div>背对</div>
      <div>面背</div>
      <div>并排</div>
    </div>
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
