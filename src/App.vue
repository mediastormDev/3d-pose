<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import * as THREE from "three";
import { OrbitControls } from "@three-ts/orbit-controls";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
// SMAA抗锯齿通道
import { SMAAPass } from "three/addons/postprocessing/SMAAPass.js";
// import CUBESTL from "./assets/cube.stl";

import {
  createScene,
  scene,
  light,
  renderer,
  camera,
  Male,
  Mannequin,
  Ankle,
  Pelvis,
  Torso,
  Head,
  Wrist,
  setAnimateFn,
  bloomComposer,
} from "./mannequin/mannequin";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";

const EPS = 0.00001;

let mouse = new THREE.Vector2(); // mouse 3D position
let mouseButton: any = undefined; // pressed mouse buttons
let raycaster = new THREE.Raycaster(); // raycaster to grab body part
let dragPoint = new THREE.Mesh(); // point of grabbing
let obj: any = undefined; // currently selected body part
let gauge: any = null;
const models: any[] = [];
let controls: any = null;
let man: any = null;
// let bloomComposer: any = null;

const manPosition = reactive({ x: 0, y: 0, z: 0 });
const inverseKinematic = ref(false);
const biologicalConstraints = ref(true);
const rotMov = ref("rotZ");
// let btnGetPosture = document.getElementById("gp");
// let btnSetPosture = document.getElementById("sp");
// let btnExportPosture = document.getElementById("ep");
// let btnAddModel = document.getElementById("am");
// let btnRemoveModel = document.getElementById("rm");

// name body parts and their motions
const names = [
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

function addModel() {
  man = new Male();
  models.push(man);

  man.l_mid_0 = man.l_finger_0.mid;
  man.l_mid_1 = man.l_finger_1.mid;
  man.l_mid_2 = man.l_finger_2.mid;
  man.l_mid_3 = man.l_finger_3.mid;
  man.l_mid_4 = man.l_finger_4.mid;

  man.r_mid_0 = man.r_finger_0.mid;
  man.r_mid_1 = man.r_finger_1.mid;
  man.r_mid_2 = man.r_finger_2.mid;
  man.r_mid_3 = man.r_finger_3.mid;
  man.r_mid_4 = man.r_finger_4.mid;

  man.l_tip_0 = man.l_finger_0.tip;
  man.l_tip_1 = man.l_finger_1.tip;
  man.l_tip_2 = man.l_finger_2.tip;
  man.l_tip_3 = man.l_finger_3.tip;
  man.l_tip_4 = man.l_finger_4.tip;

  man.r_tip_0 = man.r_finger_0.tip;
  man.r_tip_1 = man.r_finger_1.tip;
  man.r_tip_2 = man.r_finger_2.tip;
  man.r_tip_3 = man.r_finger_3.tip;
  man.r_tip_4 = man.r_finger_4.tip;

  for (var nameData of names) {
    var name = nameData[0];
    for (var part of man[name].children[0].children) part.name = name;
    for (var part of man[name].children[0].children[0].children)
      part.name = name;
    if (man[name].children[0].children[1])
      for (var part of man[name].children[0].children[1].children)
        part.name = name;
    man[name].nameUI = {
      x: nameData[1],
      y: nameData[2],
      z: nameData[3],
    };
  }
}

const changeBodyPart = (man: any) => {
  man.head.hide();
  const material = new THREE.MeshToonMaterial({
    color: "white",
  });

  const loader = new STLLoader();
  loader.load(
    "/cube.stl",
    function (geometry: any) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.scale.set(0.1, 0.1, 0.1);
      mesh.position.y = 5;
      mesh.castShadow = true;
      man.head.attach(mesh);
    },
    (xhr: any) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error: any) => {
      console.log(error);
    }
  );
};

const addOutLine = () => {
  // RenderPass这个通道会渲染场景，但不会将渲染结果输出到屏幕上
  const renderScene = new RenderPass(scene, camera);
  // 放在renderPass之后
  // https://blog.csdn.net/mmiaoChong/article/details/131668253 修复场景变暗的 bug
  const gammaCorrectionShader = new ShaderPass(GammaCorrectionShader);

  const outlinePass = new OutlinePass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    scene,
    camera,
    [man]
  );
  outlinePass.renderToScreen = true;
  outlinePass.edgeStrength = 1; //粗
  outlinePass.edgeGlow = 1; //发光
  outlinePass.edgeThickness = 1; //光晕粗
  outlinePass.overlayMaterial.blending = THREE.CustomBlending;
  outlinePass.usePatternTexture = false; //是否使用贴图
  outlinePass.visibleEdgeColor.set(0x000000);

  // bloomComposer = new EffectComposer(renderer);
  bloomComposer.setSize(window.innerWidth, window.innerHeight);
  bloomComposer.addPass(renderScene);
  bloomComposer.addPass(gammaCorrectionShader);
  bloomComposer.addPass(outlinePass);

  renderer.autoClear = false;
  const pixelRatio = renderer.getPixelRatio();
  const smaaPass = new SMAAPass(
    window.innerWidth * pixelRatio,
    window.innerHeight * pixelRatio
  );
  bloomComposer.addPass(smaaPass);
  bloomComposer.render();
};

const createSceneFn = () => {
  createScene();

  // Axes helper
  const axesHelper = new THREE.AxesHelper(50);
  scene.add(axesHelper);

  scene.remove(light);
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 1));
  const pointLight = new THREE.PointLight(0xffffff, 2, 800, 0);
  pointLight.position.set(-50, 80, 50);
  scene.add(pointLight);

  controls = new OrbitControls(camera, renderer.domElement);
  addModel();
  addOutLine();
  changeBodyPart(man);
};

function relativeTurn(joint, rotationalAngle, angle) {
  if (rotationalAngle.startsWith("position.")) {
    // it is translation, not rotation
    rotationalAngle = rotationalAngle.split(".").pop();
    joint.position[rotationalAngle] += angle;
    manPosition.x = joint.position.x;
    manPosition.y = joint.position.y;
    manPosition.z = joint.position.z;
    return;
  }

  if (joint.biologicallyImpossibleLevel) {
    if (biologicalConstraints.value) {
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

    if (biologicalConstraints.value || min == max) {
      if (val < min - EPS && angle < 0) return;
      if (val > max + EPS && angle > 0) return;
      if (min == max) return;
    }

    joint[rotationalAngle] = val;
  }
  joint.updateMatrix();
} // relativeTurn

function kinematic2D(joint, rotationalAngle, angle, ignoreIfPositive = false) {
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

  let oldParentAngle;
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

  const distProposed = mouse.distanceTo(screenPoint);
  const dist = distOriginal - distProposed;

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

// 渲染函数，取消drawFrame
const renderBloomComposer = () => {
  bloomComposer.render();
  animate();
  requestAnimationFrame(renderBloomComposer);
};

const animate = () => {
  if (!obj || !mouseButton) return;

  const elemNone = !rotMov.value;
  const spinA = obj instanceof Ankle ? Math.PI / 2 : 0;

  gauge.rotation.set(0, 0, -spinA);
  if (rotMov.value === "rotX" || (elemNone && mouseButton & 0x2))
    gauge.rotation.set(0, Math.PI / 2, 2 * spinA);
  if (rotMov.value === "rotY" || (elemNone && mouseButton & 0x4))
    gauge.rotation.set(Math.PI / 2, 0, -Math.PI / 2);

  var joint = rotMov.value.indexOf("mov") > -1 ? man.body : obj;

  do {
    for (var step = 5; step > 0.1; step *= 0.75) {
      if (rotMov.value === "rotZ" || (elemNone && mouseButton & 0x1))
        inverseKinematics(joint, "z", step);
      if (rotMov.value === "rotX" || (elemNone && mouseButton & 0x2))
        inverseKinematics(joint, "x", step);
      if (rotMov.value === "rotY" || (elemNone && mouseButton & 0x4))
        inverseKinematics(joint, "y", step);

      if (rotMov.value === "movX") inverseKinematics(joint, "position.x", step);
      if (rotMov.value === "movY") inverseKinematics(joint, "position.y", step);
      if (rotMov.value === "movZ") inverseKinematics(joint, "position.z", step);
    }

    joint = joint.parentJoint;
  } while (
    joint &&
    !(joint instanceof Mannequin) &&
    !(joint instanceof Pelvis) &&
    !(joint instanceof Torso) &&
    inverseKinematic.value
  );
};

setAnimateFn(animate);

function gaugeTexture(size = 256) {
  var canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  var r = size / 2;

  const ctx = canvas.getContext("2d")!;
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

const addGauge = () => {
  // create gauge indicator
  gauge = new THREE.Mesh(
    new THREE.CircleGeometry(10, 32, (9 / 4) * Math.PI, Math.PI / 2),
    new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      color: "blue",
      transparent: true,
      opacity: 0.75,
      alphaMap: gaugeTexture(),
    })
  );
  let gaugeMaterial = new THREE.MeshBasicMaterial({
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
};

// set up event handlers
document.addEventListener("pointerdown", onPointerDown);
document.addEventListener("pointerup", onPointerUp);
document.addEventListener("pointermove", onPointerMove);

function onPointerMove(event: any) {
  if (obj) userInput(event);
}

function onPointerUp(event: any) {
  console.log("onPointerUp");
  controls.enabled = true;
  mouseButton = undefined;
  deselect();
  // renderer.setAnimationLoop(null);
  renderer.render(scene, camera);
}

function onPointerDown(event: any) {
  console.log("onPointerDown");
  userInput(event);

  gauge.parent?.remove(gauge);
  dragPoint.parent?.remove(dragPoint);

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(models, true);
  console.log("intersects", intersects);
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

    if (scanObj instanceof Mannequin) man = scanObj;

    var name = intersects[0].object.name || intersects[0].object.parent.name;

    if (name == "neck") name = "head";
    if (name == "pelvis") name = "body";

    select(man[name]);

    document.getElementById("rot-x-name").innerHTML =
      man[name].nameUI.x || "N/A";
    document.getElementById("rot-y-name").innerHTML =
      man[name].nameUI.y || "N/A";
    document.getElementById("rot-z-name").innerHTML =
      man[name].nameUI.z || "N/A";

    dragPoint.position.copy(obj.worldToLocal(intersects[0].point));
    obj.imageWrapper.add(dragPoint);
    if (rotMov.value.indexOf("rot") > -1) obj.imageWrapper.add(gauge);
    gauge.position.y = obj instanceof Ankle ? 2 : 0;

    processCheckBoxes();
  }
  // renderer.setAnimationLoop(drawFrame);
}

function userInput(event: any) {
  // event.preventDefault();

  mouseButton = event.buttons || 0x1;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = (-event.clientY / window.innerHeight) * 2 + 1;
}

function select(object: any) {
  deselect();
  obj = object;
  obj?.select(true);
}

function deselect() {
  gauge.parent?.remove(gauge);
  obj?.select(false);
  obj = undefined;
}

function processCheckBoxes(event: any) {
  if (event) {
    if (event.target.checked) {
      rotMov.value = "";
      event.target.checked = true;
    }
  }

  if (!obj) return;

  if (rotMov.value === "rotZ") {
    obj.rotation.reorder("XYZ");
  }

  if (rotMov.value === "rotX") {
    obj.rotation.reorder("YZX");
  }

  if (rotMov.value === "rotY") {
    obj.rotation.reorder("ZXY");
  }
}

onMounted(() => {
  createSceneFn();
  addGauge();
  renderBloomComposer();
  controls.addEventListener("start", function () {
    // renderer.setAnimationLoop(drawFrame);
  });

  controls.addEventListener("end", function () {
    // renderer.setAnimationLoop(null);
    renderer.render(scene, camera);
  });

  window.addEventListener("resize", function () {
    renderer.render(scene, camera);
  });
});
</script>

<template>
  <div class="panel">
    <div>俯视图: {{ manPosition }}</div>
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
