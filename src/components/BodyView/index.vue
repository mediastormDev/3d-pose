<script lang="ts" setup>
import { ref, computed } from "vue";
import UseMannequin from "../../composables/useMannequin";
import UseTopView from "../../composables/useTopView";
import UseBodys from "../../composables/useModels";
import DropDownMenu from "../DropDownMenu/index.vue";
import { onClickOutside } from "@vueuse/core";
import right_arrow from "../../assets/right_arrow.png";

const { getTarget } = UseTopView();
const { getTarget: getTargetBody } = UseMannequin();
const { bodys, face2Obj, back2Obj } = UseBodys();

const props = defineProps<{ body: any; index: number }>();

const menus = ref([
  { label: "面朝", value: "face2", show: true },
  { label: "背对", value: "back2", show: true },
]);
const showMore = ref(false);
const clickTarget = ref(null);

onClickOutside(clickTarget, () => {
  showMore.value = false;
});

const targets = computed(() => {
  const res = bodys.value
    .filter((item) => item.id !== props.body.id)
    .map((item) => {
      return {
        label: item.id,
        value: item.id,
      };
    });

  return res;
});

const handleChange = (value) => {
  console.log(value);
  if (value[0] === "face2") {
    face2Obj(props.body.id, value[1]);
  } else if (value[0] === "back2") {
    back2Obj(props.body.id, value[1]);
  }
};

const onRangeChange = (body: any) => {
  const targetBody = getTarget(body.id);
  if (targetBody) {
    const targetBall = getTargetBody(body.id);
    targetBody.rotation.y = body.rotation;
    targetBall.rotate = body.rotation;
  }
};
</script>

<template>
  <div>
    <div
      style="display: flex; align-items: center; justify-content: space-between"
    >
      <div class="title">{{ body.type === "Male" ? "男角度" : "女角度" }}</div>
      <div
        ref="clickTarget"
        style="
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <img
          @click="showMore = true"
          :src="right_arrow"
          style="width: 14px; height: 14px"
          class="more_button"
        />
        <DropDownMenu
          :style="{ visibility: showMore ? 'visible' : 'hidden' }"
          :menus="menus"
          :submenus="targets"
          @change="handleChange"
        />
      </div>
    </div>
    <input
      type="range"
      @input="onRangeChange(body)"
      :min="-Math.PI"
      :max="Math.PI"
      :step="Math.PI / 180"
      v-model="body.rotation"
      style="width: 100%"
    />
  </div>
</template>

<style lang="less" scoped>
ul {
  list-style: none;
}

li {
  list-style: none;
  background: #fff;
  color: #2a2a2a;
  width: 100px;
  padding: 5px 10px;
  margin: 2px 0;
  border: solid 1px #999;
  cursor: pointer;
}

.more_button:hover {
  cursor: pointer;
}

.submenu {
  background: #fff;
  color: #2a2a2a;
  width: 100px;
  padding: 5px 10px;
  margin: 2px 0;
  border: solid 1px #999;
  position: absolute;
  right: 0;
  top: 0;
  transform: translateX(100%);
}

.title {
  font-size: 12px;
  font-weight: 600;
  color: #24252c;
}

[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  outline: 0;
  background-color: transparent;
  // width: 500px;
}
[type="range"]::-webkit-slider-runnable-track {
  height: 4px;
  background: #eee;
}
[type="range" i]::-webkit-slider-container {
  height: 20px;
  overflow: hidden;
}
[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ffda71;
  border: 1px solid transparent;
  margin-top: -3px;
  border-image: linear-gradient(#ffeebb, #ffeebb) 0 fill / 3 10 3 0 / 0px 0px 0
    2000px;
}
</style>
