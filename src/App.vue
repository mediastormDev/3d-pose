<script setup lang="ts">
import { onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "@three-ts/orbit-controls";
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

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 2);
  hemiLight.color.setHSL(0.6, 1, 0.6);
  hemiLight.groundColor.setHSL(0.095, 1, 0.75);
  hemiLight.position.set(0, 50, 0);
  scene.add(hemiLight);

  const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
  scene.add(hemiLightHelper);

  const dirLight = new THREE.DirectionalLight(0xffffff, 2);
  dirLight.color.setHSL(0.1, 1, 0.95);
  dirLight.position.set(-1, 1.75, 1);
  dirLight.position.multiplyScalar(30);
  scene.add(dirLight);

  dirLight.castShadow = true;

  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;

  const d = 50;

  dirLight.shadow.camera.left = -d;
  dirLight.shadow.camera.right = d;
  dirLight.shadow.camera.top = d;
  dirLight.shadow.camera.bottom = -d;

  dirLight.shadow.camera.far = 3500;
  dirLight.shadow.bias = -0.0001;

  const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 10);
  scene.add(dirLightHelper);

  const controls = new OrbitControls(camera, renderer.domElement);

  const man = new Male();
};

onMounted(() => {
  createSceneFn();
});
</script>

<template>
  <div></div>
</template>

<style scoped></style>
