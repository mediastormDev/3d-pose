<script lang="ts" setup>
import UseMannequin from "../../composables/useMannequin";
import { Sort, Right, TopRight } from "@element-plus/icons-vue";
const { rotMov } = UseMannequin();

const onClickButton = (type: string) => {
  console.log("onClick");
  rotMov.value = type;
};
</script>
<template>
  <div>
    <div class="operations_view">
      <el-button
        :icon="Sort"
        size="large"
        circle
        @click="onClickButton('rotZ')"
      />
      <el-button
        :icon="Right"
        size="large"
        circle
        @click="onClickButton('rotX')"
      />
      <el-button
        :icon="TopRight"
        size="large"
        circle
        @click="onClickButton('rotY')"
      />
      <el-button size="large" circle @click="onClickButton('movX')"
        >X</el-button
      >
      <el-button size="large" circle @click="onClickButton('movY')"
        >Y</el-button
      >
      <el-button size="large" circle @click="onClickButton('movZ')"
        >Z</el-button
      >
    </div>

    <!-- <fieldset id="group1">
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
    </fieldset> -->
  </div>
</template>

<style lang="less" scoped>
.operations_view {
  position: absolute;
  left: 220px;
  top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.el-button + .el-button {
  margin-left: 0;
  margin-top: 10px;
}

.el-button {
  width: 40px;
  height: 40px;
  background: #ffffff;
  border-radius: 10px;
  border: none;
}
</style>
