import { ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "@three-ts/orbit-controls";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { MeshLine, MeshLineMaterial } from "three.meshline";
// SMAA抗锯齿通道
import { SMAAPass } from "three/addons/postprocessing/SMAAPass.js";

import {
  createScene,
  scene,
  light,
  renderer,
  camera,
  Male,
  Female,
  Mannequin,
  Ankle,
  Pelvis,
  Torso,
  Head,
  Wrist,
  bloomComposer,
  MannequinPostureVersionError,
} from "../mannequin/mannequin";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";
import { balls } from "./useTopView";

export const models: any[] = [];
let selectedBody: any;
const EPS = 0.00001;

const inverseKinematic = ref(false);
const biologicalConstraints = ref(true);
const rotMov = ref("rotZ");
const mousePostion = ref({ x: 0, y: 0 });
const showContentMenu = ref(false);
const intersectObj = ref(null);

export default () => {
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

  let mouse = new THREE.Vector2(); // mouse 3D position
  let mouseButton: any = undefined; // pressed mouse buttons
  let raycaster = new THREE.Raycaster(); // raycaster to grab body part
  let dragPoint = new THREE.Mesh(); // point of grabbing
  let obj: any = undefined; // currently selected body part
  let gauge: any = null;
  let controls: any = null;

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

  function processCheckBoxes(event?: any) {
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

  function userInput(event: any) {
    mouseButton = event.buttons || 0x1;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (-event.clientY / window.innerHeight) * 2 + 1;
  }

  function οnCοntextmenu(event: any) {
    event.preventDefault();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(models, true);
    if (
      intersects.length &&
      (intersects[0].object.name || intersects[0].object.parent.name)
    ) {
      // console.log('intersects[0] :>> ', intersects[0]);
      intersectObj.value = intersects[0].object;
      showContentMenu.value = !showContentMenu.value;
    }

    mousePostion.value.x = event.clientX;
    mousePostion.value.y = event.clientY;
  }

  function onPointerMove(event: any) {
    if (obj) userInput(event);
  }

  function onPointerUp(event: any) {
    controls.enabled = true;
    mouseButton = undefined;
    deselect();
    // renderer.setAnimationLoop(null);
    renderer.render(scene, camera);
  }

  function onPointerDown(event: any) {
    userInput(event);
    showContentMenu.value = false;

    gauge.parent?.remove(gauge);
    dragPoint.parent?.remove(dragPoint);

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(models, true);
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

      if (scanObj instanceof Mannequin) selectedBody = scanObj;

      var name = intersects[0].object.name || intersects[0].object.parent.name;

      if (name == "neck") name = "head";
      if (name == "pelvis") name = "body";

      select(selectedBody[name]);

      try {
        document.getElementById("rot-x-name").innerHTML =
          selectedBody[name].nameUI.x || "N/A";
        document.getElementById("rot-y-name").innerHTML =
          selectedBody[name].nameUI.y || "N/A";
        document.getElementById("rot-z-name").innerHTML =
          selectedBody[name].nameUI.z || "N/A";
      } catch (error) {
        console.error(error);
      }

      dragPoint.position.copy(obj.worldToLocal(intersects[0].point));
      obj.imageWrapper.add(dragPoint);
      if (rotMov.value.indexOf("rot") > -1) obj.imageWrapper.add(gauge);
      gauge.position.y = obj instanceof Ankle ? 2 : 0;

      processCheckBoxes();
    }
    // renderer.setAnimationLoop(drawFrame);
  }

  const addOutLine = (body: any) => {
    // RenderPass这个通道会渲染场景，但不会将渲染结果输出到屏幕上
    const renderScene = new RenderPass(scene, camera);
    // 放在renderPass之后
    // https://blog.csdn.net/mmiaoChong/article/details/131668253 修复场景变暗的 bug
    const gammaCorrectionShader = new ShaderPass(GammaCorrectionShader);

    const outlinePass = new OutlinePass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      scene,
      camera,
      [body]
    );
    outlinePass.renderToScreen = true;
    outlinePass.edgeStrength = 1; //粗
    // outlinePass.edgeGlow = 1; //发光
    // outlinePass.edgeThickness = 1; //光晕粗
    outlinePass.overlayMaterial.blending = THREE.CustomBlending;
    outlinePass.usePatternTexture = false; //是否使用贴图
    outlinePass.visibleEdgeColor.set(0xd8d8d8);

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

  const switchModelType = (type: string, _id: string) => {
    switch (type) {
      case "Male":
        return new Male(1, _id);
      case "Female":
        return new Female(0.95, _id);
      default:
        return new Male(1, _id);
    }
  };

  const createBody = (_id: string, type: string) => {
    const model: any = switchModelType(type, _id);
    models.push(model);
    model.l_finger_0.tip.hide();
    model.r_finger_0.tip.hide();

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

    // addOutLine(model);
    // changeBodyPart(model);

    // const string = prompt(
    //   "Reset the posture to:",
    //   `{"version":7,"data":[[0,3.8,0],[0,-90,0],[0,0,-21.9],[2.6,0.2,6.6],[19,6.7,48.9],[85.4],[-6,-6,34.1],[-9.7,-5.5,62.7],[78.7],[6,6,46.9],[21,-28.9,5.8],[112.6],[31.2,-2.1,-4.2],[-90,70,75,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[-37.6,7.5,55.6],[138.1],[-57.8,52.6,46.8],[90,-70,75,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10]]}`
    // );
    // model.postureString = string;
  };

  const changeBodyPart = (body: any) => {
    const material = new THREE.MeshToonMaterial({
      color: 0x0055ff,
    });

    // const lineMaterial = new THREE.LineBasicMaterial({
    //   color: "crimson",
    // });

    const geometry = new THREE.SphereGeometry(1, 32, 16);
    const mesh = new THREE.Mesh(geometry, material);
    // mesh.position.y = 3;
    mesh.castShadow = true;
    body.head.hide();
    body.head.attach(mesh);

    const neckMesh = mesh.clone();
    body.neck.hide();
    body.neck.attach(neckMesh);

    const torsoMesh = mesh.clone();
    body.torso.hide();
    body.torso.attach(torsoMesh);

    const pelvisMesh = mesh.clone();
    body.pelvis.hide();
    body.pelvis.attach(pelvisMesh);

    const points = [];
    points.push(body.head.point(0, 0, 0));
    points.push(body.neck.point(0, 0, 0));
    points.push(body.torso.point(0, 0, 0));
    points.push(body.pelvis.point(0, 0, 0));
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const lineMesh = new MeshLine();
    lineMesh.setGeometry(lineGeometry);
    const lineMaterial = new MeshLineMaterial({
      color: "crimson",
      lineWidth: 0.5,
    });
    lineMesh.castShadow = true;
    const loop = new THREE.Mesh(lineMesh.geometry, lineMaterial);
    scene.add(loop);

    const lArmMesh = mesh.clone();
    body.l_arm.hide();
    body.l_arm.attach(lArmMesh);

    const lelbowMesh = mesh.clone();
    body.l_elbow.hide();
    body.l_elbow.attach(lelbowMesh);

    const lwristMesh = mesh.clone();
    body.l_wrist.hide();
    body.l_wrist.attach(lwristMesh);

    const lfingersMesh = mesh.clone();
    body.l_fingers.hide();
    body.l_finger_0.hide();
    body.l_finger_0.mid.hide();
    body.l_finger_0.tip.hide();
    body.l_finger_1.hide();
    body.l_finger_1.mid.hide();
    body.l_finger_1.tip.hide();
    body.l_finger_2.hide();
    body.l_finger_2.mid.hide();
    body.l_finger_2.tip.hide();
    body.l_finger_3.hide();
    body.l_finger_3.mid.hide();
    body.l_finger_3.tip.hide();
    body.l_finger_4.hide();
    body.l_finger_4.mid.hide();
    body.l_finger_4.tip.hide();
    body.l_fingers.attach(lfingersMesh);

    const points2 = [];
    points2.push(body.neck.point(0, 0, 0));
    points2.push(body.l_arm.point(0, 0, 0));
    points2.push(body.l_arm.point(0, 0, 0));
    points2.push(body.l_elbow.point(0, 0, 0));
    points2.push(body.l_wrist.point(0, 0, 0));
    const lineGeometry2 = new THREE.BufferGeometry().setFromPoints(points2);
    const lineMesh2 = new MeshLine();
    lineMesh2.setGeometry(lineGeometry2);
    const lineMaterial2 = new MeshLineMaterial({
      color: "crimson",
      lineWidth: 0.5,
    });
    lineMesh2.castShadow = true;
    const loop2 = new THREE.Mesh(lineMesh2.geometry, lineMaterial2);
    scene.add(loop2);

    const rArmMesh = mesh.clone();
    body.r_arm.hide();
    body.r_arm.attach(rArmMesh);

    const relbowMesh = mesh.clone();
    body.r_elbow.hide();
    body.r_elbow.attach(relbowMesh);

    const rwristMesh = mesh.clone();
    body.r_wrist.hide();
    body.r_wrist.attach(rwristMesh);

    const rfingersMesh = mesh.clone();
    body.r_fingers.hide();
    body.r_finger_0.hide();
    body.r_finger_0.mid.hide();
    body.r_finger_0.tip.hide();
    body.r_finger_1.hide();
    body.r_finger_1.mid.hide();
    body.r_finger_1.tip.hide();
    body.r_finger_2.hide();
    body.r_finger_2.mid.hide();
    body.r_finger_2.tip.hide();
    body.r_finger_3.hide();
    body.r_finger_3.mid.hide();
    body.r_finger_3.tip.hide();
    body.r_finger_4.hide();
    body.r_finger_4.mid.hide();
    body.r_finger_4.tip.hide();
    body.r_fingers.attach(rfingersMesh);

    const points3 = [];
    points3.push(body.neck.point(0, 0, 0));
    points3.push(body.r_arm.point(0, 0, 0));
    points3.push(body.r_arm.point(0, 0, 0));
    points3.push(body.r_elbow.point(0, 0, 0));
    points3.push(body.r_wrist.point(0, 0, 0));
    const lineGeometry3 = new THREE.BufferGeometry().setFromPoints(points3);
    const lineMesh3 = new MeshLine();
    lineMesh3.setGeometry(lineGeometry3);
    const lineMaterial3 = new MeshLineMaterial({
      color: "crimson",
      lineWidth: 0.5,
    });
    lineMesh3.castShadow = true;
    const loop3 = new THREE.Mesh(lineMesh3.geometry, lineMaterial3);
    scene.add(loop3);

    const llegMesh = mesh.clone();
    body.l_leg.hide();
    body.l_leg.attach(llegMesh);

    const lkneeMesh = mesh.clone();
    body.l_knee.hide();
    body.l_knee.attach(lkneeMesh);

    const lankleMesh = mesh.clone();
    body.l_ankle.hide();
    body.l_ankle.attach(lankleMesh);

    // const lineMaterial4 = lineMaterial.clone();
    // const lineGeometry4 = new THREE.BufferGeometry().setFromPoints(points4);
    // const loop4 = new THREE.Line(lineGeometry4, lineMaterial4);
    // loop.castShadow = true;
    // scene.add(loop4);

    // const points4 = [];
    // points4.push(body.pelvis.point(0, 0, 0));
    // points4.push(body.l_leg.point(0, 0, 0));
    // points4.push(body.l_knee.point(0, 0, 0));
    // points4.push(body.l_ankle.point(0, 0, 0));
    // const lineGeometry4 = new THREE.BufferGeometry().setFromPoints(points4);
    // const lineMesh4 = new MeshLine();
    // lineMesh4.setGeometry(lineGeometry4);
    // const lineMaterial4 = new MeshLineMaterial({
    //   color: "crimson",
    //   lineWidth: 0.5,
    // });
    // lineMesh4.castShadow = true;
    // const loop4 = new THREE.Mesh(lineMesh4.geometry, lineMaterial4);
    // scene.add(loop4);

    const points4 = [];
    points4.push(body.pelvis.point(0, 0, 0));
    points4.push(body.l_leg.point(0, 0, 0));
    points4.push(body.l_knee.point(0, 0, 0));
    points4.push(body.l_ankle.point(0, 0, 0));
    const lineGeometry4 = new THREE.BufferGeometry().setFromPoints(points4);
    const lineMesh4 = new MeshLine();
    lineMesh4.setGeometry(lineGeometry4);
    const lineMaterial4 = new MeshLineMaterial({
      color: "crimson",
      lineWidth: 0.5,
    });
    lineMesh4.castShadow = true;
    const loop4 = new THREE.Mesh(lineMesh4.geometry, lineMaterial4);
    scene.add(loop4);

    const rlegMesh = mesh.clone();
    body.r_leg.hide();
    body.r_leg.attach(rlegMesh);

    const rkneeMesh = mesh.clone();
    body.r_knee.hide();
    body.r_knee.attach(rkneeMesh);

    const rankleMesh = mesh.clone();
    body.r_ankle.hide();
    body.r_ankle.attach(rankleMesh);

    const points5 = [];
    points5.push(body.pelvis.point(0, 0, 0));
    points5.push(body.r_leg.point(0, 0, 0));
    points5.push(body.r_knee.point(0, 0, 0));
    points5.push(body.r_ankle.point(0, 0, 0));
    const lineGeometry5 = new THREE.BufferGeometry().setFromPoints(points5);
    const lineMesh5 = new MeshLine();
    lineMesh5.setGeometry(lineGeometry5);
    const lineMaterial5 = new MeshLineMaterial({
      color: "crimson",
      lineWidth: 0.5,
    });
    lineMesh5.castShadow = true;
    const loop5 = new THREE.Mesh(lineMesh5.geometry, lineMaterial5);
    scene.add(loop5);

    // const loader = new STLLoader();
    // loader.load(
    //   "/cube.stl",
    //   function (geometry: any) {
    //     const mesh = new THREE.Mesh(geometry, material);
    //     mesh.scale.set(0.1, 0.1, 0.1);
    //     mesh.position.y = 5;
    //     mesh.castShadow = true;
    //     body.head.attach(mesh);
    //   },
    //   (xhr: any) => {
    //     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    //   },
    //   (error: any) => {
    //     console.log(error);
    //   }
    // );
  };

  const getTarget = (bodyId?: string) => {
    if (bodyId) {
      const targetBalls = balls.value.filter((ball: any) => ball.id === bodyId);
      if (targetBalls.length) {
        return targetBalls[0];
      }
    }
    return null;
  };

  function relativeTurn(joint, rotationalAngle, angle) {
    if (rotationalAngle.startsWith("position.")) {
      // it is translation, not rotation
      rotationalAngle = rotationalAngle.split(".").pop();
      joint.position[rotationalAngle] += angle;
      const targetBall = getTarget(joint.parent._id);
      targetBall.x = joint.position.x + 100;
      targetBall.y = joint.position.z + 100;
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

      const agl = (val + 180 / 2) * (Math.PI / 180);
      const targetBall = getTarget(joint.parent._id);
      if (targetBall) {
        targetBall.rotate = agl;
      }

      joint[rotationalAngle] = val;
    }
    joint.updateMatrix();
  } // relativeTurn

  function kinematic2D(
    joint,
    rotationalAngle,
    angle,
    ignoreIfPositive = false
  ) {
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

  function gaugeTexture(size = 256) {
    const canvas = document.createElement("canvas");
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
        new THREE.TorusGeometry(10, 0.1, 8, 32, Math.PI / 2).rotateZ(
          Math.PI / 4
        ),
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

  const animate = () => {
    if (!obj || !mouseButton) return;

    const elemNone = !rotMov.value;
    const spinA = obj instanceof Ankle ? Math.PI / 2 : 0;
    gauge.rotation.set(0, 0, -spinA);
    if (rotMov.value === "rotX" || (elemNone && mouseButton & 0x2))
      gauge.rotation.set(0, Math.PI / 2, 2 * spinA);
    if (rotMov.value === "rotY" || (elemNone && mouseButton & 0x4))
      gauge.rotation.set(Math.PI / 2, 0, -Math.PI / 2);

    var joint = rotMov.value.indexOf("mov") > -1 ? selectedBody.body : obj;
    do {
      for (var step = 5; step > 0.1; step *= 0.75) {
        if (rotMov.value === "rotZ" || (elemNone && mouseButton & 0x1))
          inverseKinematics(joint, "z", step);
        if (rotMov.value === "rotX" || (elemNone && mouseButton & 0x2))
          inverseKinematics(joint, "x", step);
        if (rotMov.value === "rotY" || (elemNone && mouseButton & 0x4))
          inverseKinematics(joint, "y", step);

        if (rotMov.value === "movX")
          inverseKinematics(joint, "position.x", step);
        if (rotMov.value === "movY")
          inverseKinematics(joint, "position.y", step);
        if (rotMov.value === "movZ")
          inverseKinematics(joint, "position.z", step);
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

  // 渲染函数，取消drawFrame
  const renderBloomComposer = () => {
    bloomComposer.render();
    animate();
    requestAnimationFrame(renderBloomComposer);
  };

  const setPosture = (model: any, pose: string) => {
    if (!model) return;

    if (pose) {
      const oldPosture = model.posture;

      try {
        model.postureString = pose;
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
  };

  const setPartPosture = (
    model: any,
    part: string,
    type: string,
    angel: number
  ) => {
    if (!model) return;
    model[part][type] += angel;
  };

  const setSceneBg = (base64: string, imageAspect: number) => {
    const texture = new THREE.TextureLoader().load(base64);
    texture.colorSpace = "srgb";
    scene.background = texture;
    const targetAspect = 1920 / 1080;
    const factor = imageAspect / targetAspect;
    // When factor larger than 1, that means texture 'wilder' than target。
    // we should scale texture height to target height and then 'map' the center  of texture to target， and vice versa.
    scene.background.offset.x = factor > 1 ? (1 - 1 / factor) / 2 : 0;
    scene.background.repeat.x = factor > 1 ? 1 / factor : 1;
    scene.background.offset.y = factor > 1 ? 0 : (1 - factor) / 2;
    scene.background.repeat.y = factor > 1 ? 1 : factor;
  };

  // 初始化场景
  const init = () => {
    createScene();
    addGauge();
    renderBloomComposer();

    // 监听事件
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("contextmenu", οnCοntextmenu);

    // Axes helper
    const axesHelper = new THREE.AxesHelper(100);
    // scene.add(axesHelper);

    scene.remove(light);
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const pointLight = new THREE.PointLight(0xffffff, 2, 800, 0);
    pointLight.position.set(-50, 80, 50);
    scene.add(pointLight);

    controls = new OrbitControls(camera, renderer.domElement);

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
  };

  return {
    getTarget,
    init,
    rotMov,
    createBody,
    setPosture,
    setPartPosture,
    mousePostion,
    showContentMenu,
    intersectObj,
    setSceneBg,
    changeBodyPart,
  };
};
