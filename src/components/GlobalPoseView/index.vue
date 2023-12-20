<script lang="ts" setup>
import UseTopView from "../../composables/useTopView";
import UseMannequin from "../../composables/useMannequin";
import UsePartPose from "../../composables/usePartPose";

const { getSelectedModels } = UseTopView();
const { setPosture } = UseMannequin();
const { setPartPose } = UsePartPose();

// const defaultPose = `{"version":7,"data":[[0,3.8,0],[0,-90,0],[0,0,-2],[0,0,5],[6,0,0],[0],[-6,-6,-0.6],[-6,0,0],[0],[6,6,-0.6],[7,-0.6,-5],[15],[5,0,0],[-90,70,75,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[-7,0.6,-5],[15],[-5,0,0],[90,-70,75,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10]]}`

function setModelGlobalPose() {
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
    console.log("model", model);
  } else {
    alert("请选中一个模型");
  }
}

function setModelPartPose(type: string) {
  const target = getSelectedModels();
  if (target.length) {
    const model = target[0];
    setPartPose(model, type);
  } else {
    alert("请选中一个模型");
  }
}

function getData() {
  const target = getSelectedModels();
  if (target.length) {
    const model = target[0];
    console.log("r_wrist手腕的bend", model.r_wrist.bend);
    console.log("r_wrist手腕的tilt", model.r_wrist.tilt);
    console.log("r_wrist手腕的turn", model.r_wrist.turn);

    for (let index = 0; index < [0, 1, 2, 3, 4].length; index++) {
      console.log(
        `model.r_fingers['finger_${index}'].bend =`,
        model.r_fingers[`finger_${index}`].bend
      );
      console.log(
        `model.r_fingers['finger_${index}'].straddle =`,
        model.r_fingers[`finger_${index}`].straddle
      );
      console.log(
        `model.r_fingers['finger_${index}'].turn =`,
        model.r_fingers[`finger_${index}`].turn
      );
      console.log(
        `model.r_fingers['finger_${index}'].mid.bend =`,
        model.r_fingers[`finger_${index}`].mid.bend
      );
      console.log(
        `model.r_fingers['finger_${index}'].tip.bend =`,
        model.r_fingers[`finger_${index}`].tip.bend
      );
    }
  } else {
    alert("请选中一个模型");
  }
}
</script>
<template>
  <div>整体动作</div>
  <button @click="setModelGlobalPose">整体动作</button>
  <button @click="setModelPartPose('fist')">握拳</button>
  <button @click="setModelPartPose('thumbsUp')">点赞</button>
  <button @click="getData">获取数值</button>
</template>

<style lang="less" scoped></style>
