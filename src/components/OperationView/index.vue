<script lang="ts" setup>
import UseMannequin from "../../composables/useMannequin";
import QIANHOUIMG from "../../assets/qianhou.png";
import ZUOYOUIMG from "../../assets/zuoyou.png";
import XUANZHUANIMG from "../../assets/xuanzhuan.png";
import MOVEX from "../../assets/moveX.png";
import MOVEY from "../../assets/moveY.png";
import MOVEZ from "../../assets/moveZ.png";

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
        size="large"
        :class="{ selected: rotMov === 'rotZ' }"
        circle
        @click="onClickButton('rotZ')"
      >
        <template #icon>
          <img style="width: 40px; height: 40px" :src="QIANHOUIMG" alt="" />
        </template>
      </el-button>
      <el-button
        size="large"
        :class="{ selected: rotMov === 'rotX' }"
        circle
        @click="onClickButton('rotX')"
      >
        <template #icon>
          <img style="width: 40px; height: 40px" :src="ZUOYOUIMG" alt="" />
        </template>
      </el-button>
      <el-button
        size="large"
        :class="{ selected: rotMov === 'rotY' }"
        circle
        @click="onClickButton('rotY')"
      >
        <template #icon>
          <img style="width: 40px; height: 40px" :src="XUANZHUANIMG" alt="" />
        </template>
      </el-button>
      <el-button
        size="large"
        :class="{ selected: rotMov === 'movX' }"
        circle
        @click="onClickButton('movX')"
      >
        <template #icon>
          <img
            style="width: 40px; height: 40px"
            :src="MOVEX"
            alt=""
          /> </template
      ></el-button>
      <el-button
        size="large"
        :class="{ selected: rotMov === 'movY' }"
        circle
        @click="onClickButton('movY')"
        ><template #icon>
          <img
            style="width: 40px; height: 40px"
            :src="MOVEY"
            alt=""
          /> </template
      ></el-button>
      <el-button
        size="large"
        :class="{ selected: rotMov === 'movZ' }"
        circle
        @click="onClickButton('movZ')"
        ><template #icon>
          <img
            style="width: 40px; height: 40px"
            :src="MOVEZ"
            alt=""
          /> </template
      ></el-button>
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

.selected {
  background-color: #ffda71;
}
</style>
