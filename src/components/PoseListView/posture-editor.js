const EPS = 0.00001;

//var mouseInterface = false;
//var touchInterface = false;

// create a scene with a better shadow
createScene();

scene.remove(light);
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// PointLight and DirectionaLight make problems with older GPU
var light = new THREE.SpotLight("white", 0.5);
light.position.set(0, 100, 50);
light.penumbra = 1;
light.shadow.mapSize.width = Math.min(
  4 * 1024,
  renderer.capabilities.maxTextureSize / 2
);
light.shadow.mapSize.height = light.shadow.mapSize.width;
light.shadow.radius = 2;
light.castShadow = true;
scene.add(light);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

// create gauge indicator
var gauge = new THREE.Mesh(
    new THREE.CircleGeometry(10, 32, (9 / 4) * Math.PI, Math.PI / 2),
    new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      color: "blue",
      transparent: true,
      opacity: 0.75,
      alphaMap: gaugeTexture(),
    })
  ),
  gaugeMaterial = new THREE.MeshBasicMaterial({
    color: "navy",
  });

gauge.add(
  new THREE.Mesh(
    new THREE.TorusGeometry(10, 0.1, 8, 32, Math.PI / 2).rotateZ(Math.PI / 4),
    gaugeMaterial
  )
);
gauge.add(
  new THREE.Mesh(
    new THREE.ConeGeometry(0.7, 3, 6)
      .translate(-10, 0, 0)
      .rotateZ((5 * Math.PI) / 4),
    gaugeMaterial
  )
);
gauge.add(
  new THREE.Mesh(
    new THREE.ConeGeometry(0.7, 3, 6)
      .translate(10, 0, 0)
      .rotateZ((3 * Math.PI) / 4),
    gaugeMaterial
  )
);

function gaugeTexture(size = 256) {
  var canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  var r = size / 2;

  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, size, size);

  var grd = ctx.createRadialGradient(r, r, r / 2, r, r, r);
  grd.addColorStop(0, "black");
  grd.addColorStop(1, "gray");

  // Fill with gradient
  ctx.fillStyle = grd;
  ctx.fillRect(1, 1, size - 2, size - 2);

  var start = Math.PI,
    end = 2 * Math.PI;

  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (var rr = r; rr > 0; rr -= 25)
    ctx.arc(size / 2, size / 2, rr, start, end);

  for (var i = 0; i <= 12; i++) {
    ctx.moveTo(r, r);
    var a = start + (i / 12) * (end - start);
    ctx.lineTo(r + r * Math.cos(a), r + r * Math.sin(a));
  }
  ctx.stroke();

  var texture = new THREE.CanvasTexture(canvas, THREE.UVMapping);
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  texture.repeat.set(1, 1);

  return texture;
}

// name body parts and their motions
var names = [
  ["body", "tilt", "turn", "bend"],
  ["pelvis", "tilt", "turn", "bend"],
  ["torso", "tilt", "turn", "bend"],
  ["neck", "tilt", "turn", "nod"],
  ["head", "tilt", "turn", "nod"],
  ["l_leg", "straddle", "turn", "raise"],
  ["l_knee", "", "", "bend"],
  ["l_ankle", "tilt", "turn", "bend"],
  ["l_arm", "straddle", "turn", "raise"],
  ["l_elbow", "", "", "bend"],
  ["l_wrist", "tilt", "turn", "bend"],
  ["l_finger_0", "straddle", "turn", "bend"],
  ["l_finger_1", "straddle", "", "bend"],
  ["l_finger_2", "straddle", "", "bend"],
  ["l_finger_3", "straddle", "", "bend"],
  ["l_finger_4", "straddle", "", "bend"],
  ["l_mid_0", "", "", "bend"],
  ["l_mid_1", "", "", "bend"],
  ["l_mid_2", "", "", "bend"],
  ["l_mid_3", "", "", "bend"],
  ["l_mid_4", "", "", "bend"],
  ["l_tip_0", "", "", "bend"],
  ["l_tip_1", "", "", "bend"],
  ["l_tip_2", "", "", "bend"],
  ["l_tip_3", "", "", "bend"],
  ["l_tip_4", "", "", "bend"],
  ["r_leg", "straddle", "turn", "raise"],
  ["r_knee", "", "", "bend"],
  ["r_ankle", "tilt", "turn", "bend"],
  ["r_arm", "straddle", "turn", "raise"],
  ["r_elbow", "", "", "bend"],
  ["r_wrist", "tilt", "turn", "bend"],
  ["r_finger_0", "straddle", "turn", "bend"],
  ["r_finger_1", "straddle", "", "bend"],
  ["r_finger_2", "straddle", "", "bend"],
  ["r_finger_3", "straddle", "", "bend"],
  ["r_finger_4", "straddle", "", "bend"],
  ["r_mid_0", "", "", "bend"],
  ["r_mid_1", "", "", "bend"],
  ["r_mid_2", "", "", "bend"],
  ["r_mid_3", "", "", "bend"],
  ["r_mid_4", "", "", "bend"],
  ["r_tip_0", "", "", "bend"],
  ["r_tip_1", "", "", "bend"],
  ["r_tip_2", "", "", "bend"],
  ["r_tip_3", "", "", "bend"],
  ["r_tip_4", "", "", "bend"],
];

var models = [];
var model = null;

function addModel() {
  model = new Male();
  models.push(model);

  model.l_mid_0 = model.l_finger_0.mid;
  model.l_mid_1 = model.l_finger_1.mid;
  model.l_mid_2 = model.l_finger_2.mid;
  model.l_mid_3 = model.l_finger_3.mid;
  model.l_mid_4 = model.l_finger_4.mid;

  model.r_mid_0 = model.r_finger_0.mid;
  model.r_mid_1 = model.r_finger_1.mid;
  model.r_mid_2 = model.r_finger_2.mid;
  model.r_mid_3 = model.r_finger_3.mid;
  model.r_mid_4 = model.r_finger_4.mid;

  model.l_tip_0 = model.l_finger_0.tip;
  model.l_tip_1 = model.l_finger_1.tip;
  model.l_tip_2 = model.l_finger_2.tip;
  model.l_tip_3 = model.l_finger_3.tip;
  model.l_tip_4 = model.l_finger_4.tip;

  model.r_tip_0 = model.r_finger_0.tip;
  model.r_tip_1 = model.r_finger_1.tip;
  model.r_tip_2 = model.r_finger_2.tip;
  model.r_tip_3 = model.r_finger_3.tip;
  model.r_tip_4 = model.r_finger_4.tip;

  for (var nameData of names) {
    var name = nameData[0];
    for (var part of model[name].children[0].children) part.name = name;
    for (var part of model[name].children[0].children[0].children)
      part.name = name;
    if (model[name].children[0].children[1])
      for (var part of model[name].children[0].children[1].children)
        part.name = name;
    model[name].nameUI = {
      x: nameData[1],
      y: nameData[2],
      z: nameData[3],
    };
  }

  renderer.render(scene, camera);
}

function calcAngleDegreesX(x, y) {
  console.log("---calcAngleDegreesX-START--");
  //   console.log("x", x);
  //   console.log("y", y);
  console.log(
    "(Math.atan2(y, x) * 180) / Math.PI",
    (Math.atan2(y, x) * 180) / Math.PI
  );
  console.log("---calcAngleDegreesX-END--");
  return (Math.atan2(y, x) * 180) / Math.PI;
}

function calcAngleDegreesY(x, y) {
  console.log("---calcAngleDegreesY-START--");
  //   console.log("x", x);
  //   console.log("y", y);
  console.log(
    "(Math.atan2(x, y) * 180) / Math.PI",
    (Math.atan2(x, y) * 180) / Math.PI
  );
  console.log("---calcAngleDegreesY-END--");
  return (Math.atan2(x, y) * 180) / Math.PI;
}

function calcAngleDegreesTwoX(x1, y1, x2, y2) {
  console.log("---calcAngleDegreesTwoX-START--");
  //   console.log("x1", x1);
  //   console.log("y1", y1);
  //   console.log("x2", x2);
  //   console.log("y2", y2);
  console.log(
    "(Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI",
    (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  );
  console.log("---calcAngleDegreesTwoX-END--");
  return (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
}

function calcAngleDegreesTwoY(x1, y1, x2, y2) {
  console.log("---calcAngleDegreesTwoY-START--");
  //   console.log("x1", x1);
  //   console.log("y1", y1);
  //   console.log("x2", x2);
  //   console.log("y2", y2);
  console.log(
    "(Math.atan2(x2 - x1, y2 - y1) * 180) / Math.PI",
    (Math.atan2(x2 - x1, y2 - y1) * 180) / Math.PI
  );
  console.log("---calcAngleDegreesTwoY-END--");
  return (Math.atan2(x2 - x1, y2 - y1) * 180) / Math.PI;
}

function getTrueAngle(radians) {
  // 这个函数需要根据Python代码中的get_true_angel函数的具体实现来转换
  // 这里假设它将弧度转换为角度
  return radians * (180 / Math.PI);
}

function getAngle(x1, y1, x2, y2) {
  let dx = Math.abs(x1 - x2);
  let dy = Math.abs(y1 - y2);
  let resultAngle = 0;

  if (x1 === x2) {
    if (y1 > y2) {
      resultAngle = 180;
    }
  } else {
    let theAngle = 0;
    if (y1 !== y2) {
      theAngle = Math.round(getTrueAngle(Math.atan(dx / dy)));
    }
    if (x1 < x2) {
      if (y1 > y2) {
        resultAngle = -(180 - theAngle);
      } else if (y1 < y2) {
        resultAngle = -theAngle;
      } else if (y1 === y2) {
        resultAngle = -90;
      }
    } else if (x1 > x2) {
      if (y1 > y2) {
        resultAngle = 180 - theAngle;
      } else if (y1 < y2) {
        resultAngle = theAngle;
      } else if (y1 === y2) {
        resultAngle = 90;
      }
    }
  }

  if (resultAngle < 0) {
    resultAngle = 360 + resultAngle;
  }
  console.log("resultAngle", resultAngle);
  return resultAngle;
}

// function getX(x, y, z) {
//   // 数据预处理
//   console.log(x * 100, y * 100, z * 100);
//
//   const res = z / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
//
//   let trueAngle = getTrueAngle(Math.atan(res));
//   console.log("true angle", trueAngle)
//   if (x >= 0) {
//     return trueAngle;
//   }
//   else {
//     return 180 - trueAngle;
//   }
// }

// function getY(x, y) {
//   // 数据预处理
//   console.log(x * 100, y * 100);
//   const res = (Math.abs(y) * 100) / (Math.abs(x) * 100);
//
//   let trueAngle = getTrueAngle(Math.atan(res));
//   console.log("true angle", trueAngle)
//
//   if (x >= 0 && y >= 0) {
//     return trueAngle;
//   }
//   else if (x >= 0 && y < 0) {
//     return 90 + trueAngle;
//   }
//   else if (x < 0 && y < 0) {
//     return 180 + trueAngle;
//   }
//   else if (x < 0 && y >= 0) {
//     return 270 + trueAngle;
//   }
//
// }
function centralSymmetryZ(x, y) {
  return [-x, -y];
}

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

function addCoordinateSystem() {
  const axesHelper = new THREE.AxesHelper(100);
  scene.add(axesHelper);
}

function formatData(a) {
  let str = "";
  a.forEach((b) => {
    b = b.map((c) => c * 10);
    str += b.toString();
    str += "\n";
  });
  console.log(str);
}

function changePose3D() {
  // chouxiangsanshi 苹果
  const data = [
    [0, 0, 0],
    [0.1565, 0, 0],
    [0.309603, 0.214713, -0.389651],
    [0.173655, 0.293942, -0.848312],
    [-0.1565, 0.000032, 0.000016],
    [-0.486663, 0.29485, 0.159529],
    [-0.797401, 0.526814, -0.131611],
    [0.029915, 0, 0.270551],
    [-0.115659, 0.097206, 0.49241],
    [0, 0, 0],
    [-0.204092, 0.158118, 0.690599],
    [-0.263058, 0.13023, 0.407668],
    [-0.407843, 0.215057, 0.139314],
    [-0.492578, 0.412743, 0.016854],
    [0.042372, 0.113827, 0.561316],
    [0.344435, 0.021345, 0.580738],
    [0.423033, 0.25599, 0.585207],
  ];

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
  addCoordinateSystem();

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
  model.l_arm.raise = getRaise(leftElbow[0], leftElbow[1], leftElbow[2], 12)[0];
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
  model.r_leg.raise = getRaise(rightKnee[0], rightKnee[1], rightKnee[2], 21)[0];
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

addModel();
// changePose();
changePose3D();
// setBody();

var mouse = new THREE.Vector2(), // mouse 3D position
  mouseButton = undefined, // pressed mouse buttons
  raycaster = new THREE.Raycaster(), // raycaster to grab body part
  dragPoint = new THREE.Mesh(), // point of grabbing
  obj = undefined; // currently selected body part

var cbInverseKinematics = document.getElementById("inverse-kinematics"),
  cbBiologicalConstraints = document.getElementById("biological-constraints"),
  cbRotZ = document.getElementById("rot-z"),
  cbRotX = document.getElementById("rot-x"),
  cbRotY = document.getElementById("rot-y"),
  cbMovX = document.getElementById("mov-x"),
  cbMovY = document.getElementById("mov-y"),
  cbMovZ = document.getElementById("mov-z"),
  btnGetPosture = document.getElementById("gp"),
  btnSetPosture = document.getElementById("sp");
btnExportPosture = document.getElementById("ep");
btnAddModel = document.getElementById("am");
btnRemoveModel = document.getElementById("rm");

// set up event handlers
document.addEventListener("pointerdown", onPointerDown);
document.addEventListener("pointerup", onPointerUp);
document.addEventListener("pointermove", onPointerMove);

cbRotZ.addEventListener("click", processCheckBoxes);
cbRotX.addEventListener("click", processCheckBoxes);
cbRotY.addEventListener("click", processCheckBoxes);
cbMovX.addEventListener("click", processCheckBoxes);
cbMovY.addEventListener("click", processCheckBoxes);
cbMovZ.addEventListener("click", processCheckBoxes);

btnGetPosture.addEventListener("click", getPosture);
btnSetPosture.addEventListener("click", setPosture);
btnExportPosture.addEventListener("click", exportPosture);
btnAddModel.addEventListener("click", addModel);
btnRemoveModel.addEventListener("click", removeModel);

controls.addEventListener("start", function () {
  renderer.setAnimationLoop(drawFrame);
});

controls.addEventListener("end", function () {
  renderer.setAnimationLoop(null);
  renderer.render(scene, camera);
});

window.addEventListener("resize", function () {
  renderer.render(scene, camera);
});

function processCheckBoxes(event) {
  if (event) {
    if (event.target.checked) {
      cbRotX.checked =
        cbRotY.checked =
        cbRotY.checked =
        cbRotZ.checked =
        cbMovX.checked =
        cbMovY.checked =
        cbMovZ.checked =
          false;
      event.target.checked = true;
    }
  }

  if (!obj) return;

  if (cbRotZ.checked) {
    obj.rotation.reorder("XYZ");
  }

  if (cbRotX.checked) {
    obj.rotation.reorder("YZX");
  }

  if (cbRotY.checked) {
    obj.rotation.reorder("ZXY");
  }
}

function onPointerUp(event) {
  controls.enabled = true;
  mouseButton = undefined;
  deselect();
  renderer.setAnimationLoop(null);
  renderer.render(scene, camera);
}

function select(object) {
  deselect();
  obj = object;
  obj?.select(true);
}

function deselect() {
  gauge.parent?.remove(gauge);
  obj?.select(false);
  obj = undefined;
}

function onPointerDown(event) {
  userInput(event);

  gauge.parent?.remove(gauge);
  dragPoint.parent?.remove(dragPoint);

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(models, true);

  if (
    intersects.length &&
    (intersects[0].object.name || intersects[0].object.parent.name)
  ) {
    controls.enabled = false;

    var scanObj;
    for (
      scanObj = intersects[0].object;
      !(scanObj instanceof Mannequin) && !(scanObj instanceof THREE.Scene);
      scanObj = scanObj?.parent
    ) {}

    if (scanObj instanceof Mannequin) model = scanObj;

    var name = intersects[0].object.name || intersects[0].object.parent.name;

    if (name == "neck") name = "head";
    if (name == "pelvis") name = "body";

    select(model[name]);

    document.getElementById("rot-x-name").innerHTML =
      model[name].nameUI.x || "N/A";
    document.getElementById("rot-y-name").innerHTML =
      model[name].nameUI.y || "N/A";
    document.getElementById("rot-z-name").innerHTML =
      model[name].nameUI.z || "N/A";

    dragPoint.position.copy(obj.worldToLocal(intersects[0].point));
    obj.imageWrapper.add(dragPoint);

    if (!cbMovX.checked && !cbMovY.checked && !cbMovZ.checked)
      obj.imageWrapper.add(gauge);
    gauge.position.y = obj instanceof Ankle ? 2 : 0;

    processCheckBoxes();
  }
  renderer.setAnimationLoop(drawFrame);
}

function relativeTurn(joint, rotationalAngle, angle) {
  if (rotationalAngle.startsWith("position.")) {
    // it is translation, not rotation
    rotationalAngle = rotationalAngle.split(".").pop();
    joint.position[rotationalAngle] += angle;
    return;
  }

  if (joint.biologicallyImpossibleLevel) {
    if (cbBiologicalConstraints.checked) {
      // there is a dedicated function to check biological possibility of joint
      var oldImpossibility = joint.biologicallyImpossibleLevel();

      joint[rotationalAngle] += angle;
      joint.updateMatrix();
      joint.updateWorldMatrix(true); // ! important, otherwise get's stuck

      var newImpossibility = joint.biologicallyImpossibleLevel();

      if (
        newImpossibility > EPS &&
        newImpossibility >= oldImpossibility - EPS
      ) {
        // undo rotation
        joint[rotationalAngle] -= angle;
        return;
      }
    } else {
      joint.biologicallyImpossibleLevel();
      joint[rotationalAngle] += angle;
    }
    // keep the rotation, it is either possible, or improves impossible situation
  } else {
    // there is no dedicated function, test with individual rotation range

    var val = joint[rotationalAngle] + angle,
      min = joint.minRot[rotationalAngle],
      max = joint.maxRot[rotationalAngle];

    if (cbBiologicalConstraints.checked || min == max) {
      if (val < min - EPS && angle < 0) return;
      if (val > max + EPS && angle > 0) return;
      if (min == max) return;
    }

    joint[rotationalAngle] = val;
  }
  joint.updateMatrix();
} // relativeTurn

function kinematic2D(joint, rotationalAngle, angle, ignoreIfPositive) {
  // returns >0 if this turn gets closer

  // swap Z<->X for wrist
  if (joint instanceof Wrist) {
    if (rotationalAngle == "x") rotationalAngle = "z";
    else if (rotationalAngle == "z") rotationalAngle = "x";
  }

  var screenPoint = new THREE.Vector3().copy(dragPoint.position);
  screenPoint = obj.localToWorld(screenPoint).project(camera);

  var distOriginal = mouse.distanceTo(screenPoint),
    oldAngle = joint[rotationalAngle];

  if (joint instanceof Head) {
    // head and neck
    oldParentAngle = joint.parentJoint[rotationalAngle];
    relativeTurn(joint, rotationalAngle, angle / 2);
    relativeTurn(joint.parentJoint, rotationalAngle, angle / 2);
    joint.parentJoint.updateMatrixWorld(true);
  } else {
    relativeTurn(joint, rotationalAngle, angle);
  }
  joint.updateMatrixWorld(true);

  screenPoint.copy(dragPoint.position);
  screenPoint = obj.localToWorld(screenPoint).project(camera);

  var distProposed = mouse.distanceTo(screenPoint),
    dist = distOriginal - distProposed;

  if (ignoreIfPositive && dist > 0) return dist;

  joint[rotationalAngle] = oldAngle;
  if (joint instanceof Head) {
    // head and neck
    joint.parentJoint[rotationalAngle] = oldParentAngle;
  }
  joint.updateMatrixWorld(true);

  return dist;
}

function inverseKinematics(joint, rotationalAngle, step) {
  // try going in postive or negative direction
  var kPos = kinematic2D(joint, rotationalAngle, 0.001),
    kNeg = kinematic2D(joint, rotationalAngle, -0.001);

  // if any of them improves closeness, then turn in this direction
  if (kPos > 0 || kNeg > 0) {
    if (kPos < kNeg) step = -step;
    kinematic2D(joint, rotationalAngle, step, true);
  }
}

function animate(time) {
  // no selected object
  if (!obj || !mouseButton) return;

  var elemNone =
      !cbRotZ.checked &&
      !cbRotX.checked &&
      !cbRotY.checked &&
      !cbMovX.checked &&
      !cbMovY.checked &&
      !cbMovZ.checked,
    spinA = obj instanceof Ankle ? Math.PI / 2 : 0;

  gauge.rotation.set(0, 0, -spinA);
  if (cbRotX.checked || (elemNone && mouseButton & 0x2))
    gauge.rotation.set(0, Math.PI / 2, 2 * spinA);
  if (cbRotY.checked || (elemNone && mouseButton & 0x4))
    gauge.rotation.set(Math.PI / 2, 0, -Math.PI / 2);

  var joint =
    cbMovX.checked || cbMovY.checked || cbMovZ.checked ? model.body : obj;

  do {
    for (var step = 5; step > 0.1; step *= 0.75) {
      if (cbRotZ.checked || (elemNone && mouseButton & 0x1))
        inverseKinematics(joint, "z", step);
      if (cbRotX.checked || (elemNone && mouseButton & 0x2))
        inverseKinematics(joint, "x", step);
      if (cbRotY.checked || (elemNone && mouseButton & 0x4))
        inverseKinematics(joint, "y", step);

      if (cbMovX.checked) inverseKinematics(joint, "position.x", step);
      if (cbMovY.checked) inverseKinematics(joint, "position.y", step);
      if (cbMovZ.checked) inverseKinematics(joint, "position.z", step);
    }

    joint = joint.parentJoint;
  } while (
    joint &&
    !(joint instanceof Mannequin) &&
    !(joint instanceof Pelvis) &&
    !(joint instanceof Torso) &&
    cbInverseKinematics.checked
  );
}

function onPointerMove(event) {
  if (obj) userInput(event);
}

function userInput(event) {
  event.preventDefault();

  mouseButton = event.buttons || 0x1;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = (-event.clientY / window.innerHeight) * 2 + 1;
}

function getPosture() {
  if (!model) return;

  prompt(
    "The current posture is shown below. Copy it to the clipboard.",
    model.postureString
  );
}

function setPosture() {
  if (!model) return;

  var string = prompt(
    "Reset the posture to:",
    '{"version":7,"data":["0,[0,0,0],...]}'
  );

  if (string) {
    var oldPosture = model.posture;

    try {
      model.postureString = string;
    } catch (error) {
      model.posture = oldPosture;
      if (error instanceof MannequinPostureVersionError) alert(error.message);
      else
        alert(
          "The provided posture was either invalid or impossible to understand."
        );
      console.error(error);
    }
    renderer.render(scene, camera);
  }
}

function exportPosture() {
  if (!model) return;

  console.log(models);
  model.exportGLTF("mannequin.glb", models);
}

function removeModel() {
  if (!model) return;
  scene.remove(model);
  models = models.filter((x) => x != model);

  if (models.length > 0) model = models[0];
  else model = null;

  renderer.render(scene, camera);
}
