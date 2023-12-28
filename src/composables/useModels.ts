import { ref } from "vue";
import { createBall, balls } from "./useTopView";
import UseMannequin, { models } from "./useMannequin";

const { createBody } = UseMannequin();

interface IHuman {
  id: string;
  type: string;
  rotation?: number;
  color?: string;
  name?: string;
}

const bodys = ref<IHuman[]>([]);

export default () => {
  const face2Obj = (sourceId: string, targetId: string) => {
    const ball1 = balls.value.filter((ball) => ball.id === sourceId)[0];
    const ball2 = balls.value.filter((ball) => ball.id === targetId)[0];
    console.log(ball1.id, ball2.id);
    const body1 = models.filter((model) => {
      return model._id === ball1.id;
    })[0];
    const body2 = models.filter((model) => {
      return model._id === ball2.id;
    })[0];

    const radius2 = Math.atan2(
      body1.position.x - body2.position.x,
      body1.position.z - body2.position.z
    );

    body1.rotation.y = radius2 + Math.PI;
  };

  const back2Obj = (sourceId: string, targetId: string) => {
    const ball1 = balls.value.filter((ball) => ball.id === sourceId)[0];
    const ball2 = balls.value.filter((ball) => ball.id === targetId)[0];
    console.log(ball1.id, ball2.id);
    const body1 = models.filter((model) => {
      return model._id === ball1.id;
    })[0];
    const body2 = models.filter((model) => {
      return model._id === ball2.id;
    })[0];

    const radius2 = Math.atan2(
      body1.position.x - body2.position.x,
      body1.position.z - body2.position.z
    );

    body1.rotation.y = radius2;
  };

  const face2face = () => {
    const selected = balls.value.filter((ball) => ball.selected);
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

  const back2back = () => {
    const selected = balls.value.filter((ball) => ball.selected);
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

    body1.rotation.y = radius2;
    body2.rotation.y = radius;
  };

  const face2back = () => {
    const selected = balls.value.filter((ball) => ball.selected);
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
    body2.rotation.y = radius;
  };

  const getModelById = (id: string) => {
    const bodys = models.filter((model) => {
      return model._id === id;
    });
    return bodys[0];
  };

  // 基础方法
  // 向量点积
  function dotProduct(a1, a2, a3, b1, b2, b3) {
    return a1 * b1 + a2 * b2 + a3 * b3;
  }
  // 向量叉积
  function crossProduct(a1, a2, a3, b1, b2, b3) {
    return [a2 * b3 - a3 * b2, a3 * b1 - a1 * b3, a1 * b2 - a2 * b1];
  }
  // 向量长度
  function getVectorLength(a1, a2, a3) {
    return Math.sqrt(Math.pow(a1, 2) + Math.pow(a2, 2) + Math.pow(a3, 2));
  }
  // 向量夹角
  function getVectorAngle(a1, a2, a3, b1, b2, b3) {
    const cos =
      dotProduct(a1, a2, a3, b1, b2, b3) /
      (getVectorLength(a1, a2, a3) * getVectorLength(b1, b2, b3));
    return getTrueAngle(Math.acos(cos));
  }
  // 向量方向上的单位向量
  function getUnitVector(a1, a2, a3) {
    const length = getVectorLength(a1, a2, a3);
    return [a1 / length, a2 / length, a3 / length];
  }

  // 数据预处理
  function correctBornLength(x, y, z, part) {
    let unitVector = getUnitVector(x, y, z);
    switch (part) {
      // 大臂
      case "arm": {
        return unitVector.map((a) => a * 11);
      }
      // 小臂
      case "forearm": {
        return unitVector.map((a) => a * 11);
      }
      // 大腿
      case "thigh": {
        return unitVector.map((a) => a * 15);
      }
      // 小腿
      case "shank": {
        return unitVector.map((a) => a * 14);
      }
      // 躯干
      case "torso": {
        return unitVector.map((a) => a * 14);
      }
      // 脖子
      case "neck": {
        return unitVector.map((a) => a * 3);
      }
    }
  }

  // 角度计算
  function getRaise(x, y, z, part) {
    const a1 = 0;
    const a2 = 0;
    const a3 = -1;
    const b1 = 0;
    const b2 = y;
    const b3 = z;

    let trueAngle = getVectorAngle(a1, a2, a3, b1, b2, b3);
    let direction = crossProduct(a1, a2, a3, b1, b2, b3)[0] >= 0 ? 1 : -1;

    return [trueAngle * direction, trueAngle * direction + 180];
  }

  function getStraddle(x, y, z, part) {
    const a1 = 0;
    const a2 = y;
    const a3 = z;
    const b1 = x;
    const b2 = y;
    const b3 = z;

    let trueAngle = getVectorAngle(a1, a2, a3, b1, b2, b3);
    let direction;
    if (part === 11 || part === 21) {
      direction = x >= 0 ? 1 : -1;
    } else if (part === 12 || part === 22) {
      direction = x >= 0 ? -1 : 1;
    }
    return [trueAngle * direction, 180 - trueAngle * direction];
  }

  function getBend(x1, y1, z1, x2, y2, z2, part) {
    const a1 = x1;
    const a2 = y1;
    const a3 = z1;
    const b1 = x2 - x1;
    const b2 = y2 - y1;
    const b3 = z2 - z1;

    const trueAngle = getVectorAngle(a1, a2, a3, b1, b2, b3);

    return trueAngle;
  }

  function getTurn(x1, y1, z1, x2, y2, z2, part) {
    let v1;
    if (part === 11 || part === 22) {
      v1 = crossProduct(x1, y1, z1, 0, y1, z1);
    } else if (part === 12 || part === 21) {
      v1 = crossProduct(0, y1, z1, x1, y1, z1);
    }

    // 向内向外法向量方向需要改变
    if (getStraddle(x1, y1, z1, part)[0] < 0) {
      v1 = v1.map((a) => a * -1);
    }

    const t =
      (x1 * x2 + y1 * y2 + z1 * z2) /
      (Math.pow(x1, 2) + Math.pow(y1, 2) + Math.pow(z1, 2));

    const a1 = v1[0];
    const a2 = v1[1];
    const a3 = v1[2];
    const b1 = x2 - x1 * t;
    const b2 = y2 - y1 * t;
    const b3 = z2 - z1 * t;

    let trueAngle = getVectorAngle(a1, a2, a3, b1, b2, b3);

    // 确定方向
    const v2 = crossProduct(a1, a2, a3, b1, b2, b3);
    const direction = dotProduct(v2[0], v2[1], v2[2], x1, y1, z1);

    if (part === 11 || part === 21) {
      // 顺时针
      if (direction < 0) {
        trueAngle = -trueAngle;
      }
    } else if (part === 12 || part === 22) {
      // 逆时针
      if (direction > 0) {
        trueAngle = -trueAngle;
      }
    }

    return trueAngle;
  }

  function getTorsoBend(x, y, z) {
    const a1 = 0;
    const a2 = 0;
    const a3 = 1;
    const b1 = 0;
    const b2 = y;
    const b3 = z;

    let trueAngle = getVectorAngle(a1, a2, a3, b1, b2, b3);
    let direction = crossProduct(a1, a2, a3, b1, b2, b3)[0] >= 0 ? -1 : 1;

    return [trueAngle * direction, trueAngle * direction + 180];
  }

  function getTorsoTilt(x, y, z) {
    const a1 = 0;
    const a2 = y;
    const a3 = z;
    const b1 = x;
    const b2 = y;
    const b3 = z;

    let trueAngle = getVectorAngle(a1, a2, a3, b1, b2, b3);
    const direction = x >= 0 ? -1 : 1;
    return [trueAngle * direction, 180 - trueAngle * direction];
  }

  // function addCoordinateSystem() {
  //   const axesHelper = new THREE.AxesHelper(100);
  //   scene.add(axesHelper);
  // }

  function formatData(a) {
    let str = "";
    a.forEach((b) => {
      b = b.map((c) => c * 10);
      str += b.toString();
      str += "\n";
    });
    console.log(str);
  }

  function getTrueAngle(radians) {
    // 这个函数需要根据Python代码中的get_true_angel函数的具体实现来转换
    // 这里假设它将弧度转换为角度
    return radians * (180 / Math.PI);
  }

  function changePose3D(model: any, data: any) {
    // chouxiangsanshi 苹果
    // const data = [
    //   [0, 0, 0],
    //   [0.1565, 0, 0],
    //   [0.309603, 0.214713, -0.389651],
    //   [0.173655, 0.293942, -0.848312],
    //   [-0.1565, 0.000032, 0.000016],
    //   [-0.486663, 0.29485, 0.159529],
    //   [-0.797401, 0.526814, -0.131611],
    //   [0.029915, 0, 0.270551],
    //   [-0.115659, 0.097206, 0.49241],
    //   [0, 0, 0],
    //   [-0.204092, 0.158118, 0.690599],
    //   [-0.263058, 0.13023, 0.407668],
    //   [-0.407843, 0.215057, 0.139314],
    //   [-0.492578, 0.412743, 0.016854],
    //   [0.042372, 0.113827, 0.561316],
    //   [0.344435, 0.021345, 0.580738],
    //   [0.423033, 0.25599, 0.585207],
    // ];

    let pelvis = data[0];

    let rightLeg = data[1];
    let rightKnee = data[2];
    let rightAnkle = data[3];

    let leftLeg = data[4];
    let leftKnee = data[5];
    let leftAnkle = data[6];

    let torso = data[7];
    let neck = data[8];
    // 没有9
    let headTop = data[10];

    let leftArm = data[11];
    let leftElbow = data[12];
    let leftWrist = data[13];

    let rightArm = data[14];
    let rightElbow = data[15];
    let rightWrist = data[16];

    // 添加坐标系
    //   addCoordinateSystem();

    // 修正比例
    // 右手
    // 伸长大臂
    const rightElbowTemp = correctBornLength(
      rightElbow[0] - rightArm[0],
      rightElbow[1] - rightArm[1],
      rightElbow[2] - rightArm[2],
      "arm"
    );
    // 伸长小臂
    const rightWristTemp = correctBornLength(
      rightWrist[0] - rightElbow[0],
      rightWrist[1] - rightElbow[1],
      rightWrist[2] - rightElbow[2],
      "forearm"
    );
    // 计算伸长后的肘关节偏移
    const rightElbowMovement = [
      rightElbowTemp[0] - rightElbow[0],
      rightElbowTemp[1] - rightElbow[1],
      rightElbowTemp[2] - rightElbow[2],
    ];
    // 偏移肘关节
    rightWristTemp[0] += rightElbowMovement[0];
    rightWristTemp[1] += rightElbowMovement[1];
    rightWristTemp[2] += rightElbowMovement[2];
    // 修正完成
    rightArm = [0, 0, 0];
    rightElbow = rightElbowTemp;
    rightWrist = rightWristTemp;

    // 左手
    // 伸长大臂
    const leftElbowTemp = correctBornLength(
      leftElbow[0] - leftArm[0],
      leftElbow[1] - leftArm[1],
      leftElbow[2] - leftArm[2],
      "arm"
    );
    // 伸长小臂
    const leftWristTemp = correctBornLength(
      leftWrist[0] - leftElbow[0],
      leftWrist[1] - leftElbow[1],
      leftWrist[2] - leftElbow[2],
      "forearm"
    );
    // 计算伸长后的肘关节偏移
    const leftElbowMovement = [
      leftElbowTemp[0] - leftElbow[0],
      leftElbowTemp[1] - leftElbow[1],
      leftElbowTemp[2] - leftElbow[2],
    ];
    // 偏移肘关节
    leftWristTemp[0] += leftElbowMovement[0];
    leftWristTemp[1] += leftElbowMovement[1];
    leftWristTemp[2] += leftElbowMovement[2];
    // 修正完成
    leftArm = [0, 0, 0];
    leftElbow = leftElbowTemp;
    leftWrist = leftWristTemp;

    // 右腿
    // 伸长大腿
    const rightKneeTemp = correctBornLength(
      rightKnee[0] - rightLeg[0],
      rightKnee[1] - rightLeg[1],
      rightKnee[2] - rightLeg[2],
      "thigh"
    );
    // 伸长小腿
    const rightAnkleTemp = correctBornLength(
      rightAnkle[0] - rightKnee[0],
      rightAnkle[1] - rightKnee[1],
      rightAnkle[2] - rightKnee[2],
      "shank"
    );
    // 计算伸长后的膝关节偏移
    const rightKneeMovement = [
      rightKneeTemp[0] - rightKnee[0],
      rightKneeTemp[1] - rightKnee[1],
      rightKneeTemp[2] - rightKnee[2],
    ];
    // 偏移膝关节
    rightAnkleTemp[0] += rightKneeMovement[0];
    rightAnkleTemp[1] += rightKneeMovement[1];
    rightAnkleTemp[2] += rightKneeMovement[2];
    // 修正完成
    rightLeg = [0, 0, 0];
    rightKnee = rightKneeTemp;
    rightAnkle = rightAnkleTemp;

    // 左腿
    // 伸长大腿
    const leftKneeTemp = correctBornLength(
      leftKnee[0] - leftLeg[0],
      leftKnee[1] - leftLeg[1],
      leftKnee[2] - leftLeg[2],
      "thigh"
    );
    // 伸长小腿
    const leftAnkleTemp = correctBornLength(
      leftAnkle[0] - leftKnee[0],
      leftAnkle[1] - leftKnee[1],
      leftAnkle[2] - leftKnee[2],
      "shank"
    );
    // 计算伸长后的膝关节偏移
    const leftKneeMovement = [
      leftKneeTemp[0] - leftKnee[0],
      leftKneeTemp[1] - leftKnee[1],
      leftKneeTemp[2] - leftKnee[2],
    ];
    // 偏移膝关节
    leftAnkleTemp[0] += leftKneeMovement[0];
    leftAnkleTemp[1] += leftKneeMovement[1];
    leftAnkleTemp[2] += leftKneeMovement[2];
    // 修正完成
    leftLeg = [0, 0, 0];
    leftKnee = leftKneeTemp;
    leftAnkle = leftAnkleTemp;

    // 躯干
    // 伸长大腿
    const torsoTemp = correctBornLength(
      neck[0] - pelvis[0],
      neck[1] - pelvis[1],
      neck[2] - pelvis[2],
      "torso"
    );
    const neckTemp = correctBornLength(
      headTop[0] - neck[0],
      headTop[1] - neck[1],
      headTop[2] - neck[2],
      "neck"
    );
    // 计算伸长后的颈关节偏移
    const neckMovement = [
      torsoTemp[0] - neck[0],
      torsoTemp[1] - neck[1],
      torsoTemp[2] - neck[2],
    ];
    // 偏移膝关节
    neckTemp[0] += neckMovement[0];
    neckTemp[1] += neckMovement[1];
    neckTemp[2] += neckMovement[2];
    // 修正完成
    torso = torsoTemp;
    headTop = neckTemp;
    console.log(torso);
    console.log(headTop);

    // 右手
    // right arm raise
    model.r_arm.raise = getRaise(
      rightElbow[0],
      rightElbow[1],
      rightElbow[2],
      11
    )[0];
    // right arm straddle
    model.r_arm.straddle += getStraddle(
      rightElbow[0],
      rightElbow[1],
      rightElbow[2],
      11
    )[0];
    // right elbow bend
    model.r_elbow.bend = getBend(
      rightElbow[0],
      rightElbow[1],
      rightElbow[2],
      rightWrist[0],
      rightWrist[1],
      rightWrist[2],
      11
    );
    // right arm turn
    model.r_arm.turn += getTurn(
      rightElbow[0],
      rightElbow[1],
      rightElbow[2],
      rightWrist[0],
      rightWrist[1],
      rightWrist[2],
      11
    );

    // 左手
    // left arm raise
    model.l_arm.raise = getRaise(
      leftElbow[0],
      leftElbow[1],
      leftElbow[2],
      12
    )[0];
    // left arm straddle
    model.l_arm.straddle += getStraddle(
      leftElbow[0],
      leftElbow[1],
      leftElbow[2],
      12
    )[0];
    // // left elbow bend
    model.l_elbow.bend = getBend(
      leftElbow[0],
      leftElbow[1],
      leftElbow[2],
      leftWrist[0],
      leftWrist[1],
      leftWrist[2],
      12
    );
    // left arm turn
    model.l_arm.turn += getTurn(
      leftElbow[0],
      leftElbow[1],
      leftElbow[2],
      leftWrist[0],
      leftWrist[1],
      leftWrist[2],
      12
    );

    // 右腿
    // right leg raise
    model.r_leg.raise = getRaise(
      rightKnee[0],
      rightKnee[1],
      rightKnee[2],
      21
    )[0];
    // right leg straddle
    model.r_leg.straddle += getStraddle(
      rightKnee[0],
      rightKnee[1],
      rightKnee[2],
      21
    )[0];
    // right elbow bend
    model.r_knee.bend = getBend(
      rightKnee[0],
      rightKnee[1],
      rightKnee[2],
      rightAnkle[0],
      rightAnkle[1],
      rightAnkle[2],
      21
    );
    // right leg turn
    model.r_leg.turn += getTurn(
      rightKnee[0],
      rightKnee[1],
      rightKnee[2],
      rightAnkle[0],
      rightAnkle[1],
      rightAnkle[2],
      21
    );

    // 左腿
    // left leg raise
    model.l_leg.raise = getRaise(leftKnee[0], leftKnee[1], leftKnee[2], 22)[0];
    // left leg straddle
    model.l_leg.straddle += getStraddle(
      leftKnee[0],
      leftKnee[1],
      leftKnee[2],
      22
    )[0];
    // left elbow bend
    model.l_knee.bend = getBend(
      leftKnee[0],
      leftKnee[1],
      leftKnee[2],
      leftAnkle[0],
      leftAnkle[1],
      leftAnkle[2],
      22
    );
    // left leg turn
    model.l_leg.turn += getTurn(
      leftKnee[0],
      leftKnee[1],
      leftKnee[2],
      leftAnkle[0],
      leftAnkle[1],
      leftAnkle[2],
      22
    );

    // 躯干
    // torso bend
    model.torso.bend += getTorsoBend(torso[0], torso[1], torso[2])[0];
    // torso tilt
    model.torso.tilt += getTorsoTilt(torso[0], torso[1], torso[2])[0];

    formatData(data);
    // 右手局部
    console.log(rightArm, rightElbow, rightWrist);
    // 左手局部
    console.log(leftArm, leftElbow, leftWrist);
  }

  const addBody = (id: string, type: string, color = "#ff0000") => {
    bodys.value.push({
      id,
      type,
      rotation: 0,
      color,
      name: `${+new Date()}`,
    });
    createBall(id, color);
    createBody(id, type);
  };

  return {
    bodys,
    addBody,
    face2face,
    face2Obj,
    back2back,
    back2Obj,
    face2back,
    changePose3D,
    getModelById,
  };
};
