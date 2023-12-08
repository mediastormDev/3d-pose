<script setup lang="ts">
import { onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "@three-ts/orbit-controls";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js";
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
  drawFrame,
} from "./mannequin/mannequin";

let mouse = new THREE.Vector2(); // mouse 3D position
let mouseButton: any = undefined; // pressed mouse buttons
let raycaster = new THREE.Raycaster(); // raycaster to grab body part
let dragPoint = new THREE.Mesh(); // point of grabbing
let obj: any = undefined; // currently selected body part
let gauge: any = null;
const models: any[] = [];
let controls: any = null;
let man: any = null;

let cbInverseKinematics = document.getElementById("inverse-kinematics");
let cbBiologicalConstraints = document.getElementById("biological-constraints");
let cbRotZ = document.getElementById("rot-z");
let cbRotX = document.getElementById("rot-x");
let cbRotY = document.getElementById("rot-y");
let cbMovX = document.getElementById("mov-x");
let cbMovY = document.getElementById("mov-y");
let cbMovZ = document.getElementById("mov-z");
let btnGetPosture = document.getElementById("gp");
let btnSetPosture = document.getElementById("sp");
let btnExportPosture = document.getElementById("ep");
let btnAddModel = document.getElementById("am");
let btnRemoveModel = document.getElementById("rm");

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

  renderer.render(scene, camera);
}

// addModel();

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
      mesh.position.y = 10;
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

const createSceneFn = () => {
  createScene();

  // Axes helper
  const axesHelper = new THREE.AxesHelper(50);
  scene.add(axesHelper);

  scene.remove(light);
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // LIGHTS

  // const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
  // hemiLight.color.setHSL(0.6, 1, 0.6);
  // hemiLight.groundColor.setHSL(0.095, 1, 0.75);
  // hemiLight.position.set(0, 50, 0);
  // scene.add(hemiLight);

  // const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
  // scene.add(hemiLightHelper);

  // const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  // dirLight.color.setHSL(0.1, 1, 0.95);
  // dirLight.position.set(-1, 1.75, 1);
  // dirLight.position.multiplyScalar(30);
  // scene.add(dirLight);

  // dirLight.castShadow = true;

  // dirLight.shadow.mapSize.width = 2048;
  // dirLight.shadow.mapSize.height = 2048;

  // const d = 50;

  // dirLight.shadow.camera.left = -d;
  // dirLight.shadow.camera.right = d;
  // dirLight.shadow.camera.top = d;
  // dirLight.shadow.camera.bottom = -d;

  // dirLight.shadow.camera.far = 3500;
  // dirLight.shadow.bias = -0.0001;

  // const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 10);
  // scene.add(dirLightHelper);

  // Lights

  scene.add(new THREE.AmbientLight(0xffffff, 1));

  const pointLight = new THREE.PointLight(0xffffff, 2, 800, 0);
  pointLight.position.set(-50, 80, 50);
  scene.add(pointLight);

  controls = new OrbitControls(camera, renderer.domElement);
  addModel();
  changeBodyPart(man);

  // RenderPass这个通道会渲染场景，但不会将渲染结果输出到屏幕上
  const renderScene = new RenderPass(scene, camera);
  // THREE.OutlinePass(resolution, scene, camera, selectedObjects)
  // resolution 分辨率
  // scene 场景
  // camera 相机
  // selectedObjects 需要选中的物体对象, 传入需要边界线进行高亮处理的对象
  const outlinePass = new OutlinePass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    scene,
    camera,
    [man]
  );
  outlinePass.renderToScreen = true;
  outlinePass.edgeStrength = 8; //粗
  // outlinePass.edgeGlow = 2; //发光
  outlinePass.edgeThickness = 3; //光晕粗
  outlinePass.overlayMaterial.blending = THREE.CustomBlending;

  // outlinePass.pulsePeriod = 1; //闪烁
  outlinePass.usePatternTexture = false; //是否使用贴图
  outlinePass.visibleEdgeColor.set(0x000000);
  // outlinePass.visibleEdgeColor.set("white"); // 设置显示的颜色
  // outlinePass.hiddenEdgeColor.set("black"); // 设置隐藏的颜色

  //创建效果组合器对象，可以在该对象上添加后期处理通道，通过配置该对象，使它可以渲染我们的场景，并应用额外的后期处理步骤，在render循环中，使用EffectComposer渲染场景、应用通道，并输出结果。
  const bloomComposer = new EffectComposer(renderer);
  bloomComposer.setSize(window.innerWidth, window.innerHeight);
  bloomComposer.addPass(renderScene);
  // 眩光通道bloomPass插入到composer
  bloomComposer.addPass(outlinePass);
  // bloomComposer.render();

  //获取.setPixelRatio()设置的设备像素比
  const pixelRatio = renderer.getPixelRatio();
  // width、height是canva画布的宽高度
  const smaaPass = new SMAAPass(
    window.innerWidth * pixelRatio,
    window.innerHeight * pixelRatio
  );
  bloomComposer.addPass(smaaPass);

  function animate() {
    requestAnimationFrame(animate);
    bloomComposer.render();
  }

  animate();
};

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

// function render() {
//   renderer.render(scene, camera);
// }

// set up event handlers
document.addEventListener("pointerdown", onPointerDown);
document.addEventListener("pointerup", onPointerUp);
document.addEventListener("pointermove", onPointerMove);

function onPointerMove(event: any) {
  console.log("onPointerMove");
  if (obj) userInput(event);
}

function onPointerUp(event: any) {
  controls.enabled = true;
  mouseButton = undefined;
  deselect();
  renderer.setAnimationLoop(null);
  renderer.render(scene, camera);
}

function userInput(event: any) {
  event.preventDefault();

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

    if (!cbMovX.checked && !cbMovY.checked && !cbMovZ.checked)
      obj.imageWrapper.add(gauge);
    gauge.position.y = obj instanceof Ankle ? 2 : 0;

    processCheckBoxes();
  }
  renderer.setAnimationLoop(drawFrame);
}

onMounted(() => {
  createSceneFn();
  addGauge();
});
</script>

<template>
  <div></div>
</template>

<style scoped></style>
