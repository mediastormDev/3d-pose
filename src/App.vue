<script setup lang="ts">
import { onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "@three-ts/orbit-controls";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js";
// SMAA抗锯齿通道
import { SMAAPass } from "three/addons/postprocessing/SMAAPass.js";

import {
  createScene,
  scene,
  light,
  renderer,
  camera,
  Male,
} from "./mannequin/mannequin";

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

  //

  const controls = new OrbitControls(camera, renderer.domElement);

  const man = new Male();

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

// function render() {
//   renderer.render(scene, camera);
// }

onMounted(() => {
  createSceneFn();
});
</script>

<template>
  <div></div>
</template>

<style scoped></style>
