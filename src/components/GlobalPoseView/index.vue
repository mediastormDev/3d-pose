<script lang="ts" setup>
import UseTopView from "../../composables/useTopView";
import UseMannequin from "../../composables/useMannequin";

const { getSelectedModels } = UseTopView();
const { setPosture } = UseMannequin();

function setModelPose() {
  const target = getSelectedModels();

  if (target.length) {
    console.log("target", target.length);
    const model = target[0];

    // const poseString = prompt(
    //   "Reset the posture to:",
    //   `{"version":7,"data":[[0,3.8,0],[0,-90,0],[0,0,-21.9],[2.6,0.2,6.6],[19,6.7,48.9],[85.4],[-6,-6,34.1],[-9.7,-5.5,62.7],[78.7],[6,6,46.9],[21,-28.9,5.8],[112.6],[31.2,-2.1,-4.2],[-90,70,75,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[-37.6,7.5,55.6],[138.1],[-57.8,52.6,46.8],[90,-70,75,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10]]}`
    // );
    const poseString = `{"version":7,"data":[[0,3.8,0],[0,-90,0],[0,0,-21.9],[2.6,0.2,6.6],[19,6.7,48.9],[85.4],[-6,-6,34.1],[-9.7,-5.5,62.7],[78.7],[6,6,46.9],[21,-28.9,5.8],[112.6],[31.2,-2.1,-4.2],[-90,70,75,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[-37.6,7.5,55.6],[138.1],[-57.8,52.6,46.8],[90,-70,75,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10]]}`;

    setPosture(model, poseString);
  } else {
    alert("请选中一个模型");
  }
}
</script>
<template>
  <div>整体动作</div>
  <button @click="setModelPose">测试动作</button>
</template>

<style lang="less" scoped></style>
