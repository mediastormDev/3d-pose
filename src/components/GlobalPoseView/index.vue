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
        `model.r_fingers['finger_${index}'].posture =`,
        model.r_fingers[`finger_${index}`].posture
      );
      // console.log(
      //   `model.r_fingers['finger_${index}'].straddle =`,
      //   model.r_fingers[`finger_${index}`].straddle
      // );
      // console.log(
      //   `model.r_fingers['finger_${index}'].turn =`,
      //   model.r_fingers[`finger_${index}`].turn
      // );
      console.log(
        `model.r_fingers['finger_${index}'].mid.posture =`,
        model.r_fingers[`finger_${index}`].mid.posture
      );
      console.log(
        `model.r_fingers['finger_${index}'].tip.posture =`,
        model.r_fingers[`finger_${index}`].tip.posture
      );
    }
  } else {
    alert("请选中一个模型");
  }
}
</script>
<template>
  <div class="big_title">整体动作</div>
  <div class="el_button-view">
    <el-button @click="getData">获取数值</el-button>
    <el-button @click="setModelGlobalPose">整体动作</el-button>
  </div>
  <div class="big_title">局部动作</div>
  <div class="el_button-view">
    <el-button @click="setModelPartPose('fist')">握拳</el-button>
    <el-button @click="setModelPartPose('thumbsUp')">点赞</el-button>
    <el-button @click="setModelPartPose('natrue')">自然</el-button>
    <el-button @click="setModelPartPose('finger1')">数字1</el-button>
    <el-button @click="setModelPartPose('finger2')">数字2</el-button>
    <el-button @click="setModelPartPose('finger3')">数字3</el-button>
    <el-button @click="setModelPartPose('finger4')">数字4</el-button>
    <el-button @click="setModelPartPose('finger5')">数字5</el-button>
    <el-button @click="setModelPartPose('finger6')">数字6</el-button>
    <el-button @click="setModelPartPose('finger7')">数字7</el-button>
    <el-button @click="setModelPartPose('finger8')">数字8</el-button>
    <el-button @click="setModelPartPose('finger9')">数字9</el-button>

    <el-button @click="setModelPartPose('friendly')">国际友好</el-button>
    <el-button @click="setModelPartPose('merge')">并拢</el-button>
    <el-button @click="setModelPartPose('rock')">摇滚</el-button>
    <el-button @click="setModelPartPose('spiderman')">蜘蛛侠</el-button>
    <el-button @click="setModelPartPose('gun')">手枪</el-button>
    <el-button @click="setModelPartPose('hold')">握持</el-button>
    <el-button @click="setModelPartPose('zero')">零</el-button>
    <el-button @click="setModelPartPose('claw')">爪</el-button>
    <el-button @click="setModelPartPose('littleFinger')">竖小指</el-button>
    <el-button @click="setModelPartPose('hoodle')">弹珠</el-button>
    <el-button @click="setModelPartPose('heart')">比心</el-button>
    <el-button @click="setModelPartPose('ok')">ok</el-button>
    <el-button @click="setModelPartPose('qzys')">掐指一算</el-button>
    <el-button @click="setModelPartPose('holdapen')">握笔</el-button>
    <el-button @click="setModelPartPose('holdPhone')">拿手机</el-button>
    <el-button @click="setModelPartPose('basketball3')">三分球</el-button>
  </div>
</template>

<style lang="less" scoped>
.big_title {
  font-size: 14px;
  font-weight: 600;
  color: #24252c;
  margin-top: 20px;
  margin-bottom: 20px;
}
.el_button-view {
  display: flex;
  flex-wrap: wrap;
  row-gap: 7px;
  column-gap: 7px;
}
.el-button {
  height: 28px;
  background: #f4f6f7;
  border-radius: 6px;
  border: none;
  font-size: 12px;
  font-weight: 500;
  color: #24252c;
}

.el-button + .el-button {
  margin-left: 0;
}
</style>
