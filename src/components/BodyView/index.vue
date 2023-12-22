<script lang="ts" setup>
import { ref, computed } from "vue";
import UseMannequin from "../../composables/useMannequin";
import UseTopView from "../../composables/useTopView";
import UseBodys from "../../composables/useModels";
import DropDownMenu from "../DropDownMenu/index.vue";

const { getTarget } = UseTopView();
const { getTarget: getTargetBody } = UseMannequin();
const { bodys, face2Obj, back2Obj } = UseBodys();

const props = defineProps<{ body: any; index: number }>();

const menus = ref([
  { label: "面朝", value: "face2" },
  { label: "背对", value: "back2" },
]);

const targets = computed(() => {
  const res = bodys.value
    .filter((item) => item.id !== props.body.id)
    .map((item) => {
      return {
        label: item.id,
        value: item.id,
      };
    });

  return [...res, ...res, ...res, ...res, ...res, ...res];
});

// const options = computed(() => {
//   const targets = bodys.value
//     .filter((item) => item.id !== props.body.id)
//     .map((item) => {
//       return {
//         label: item.id,
//         value: item.id,
//       };
//     });
//   return [
//     {
//       label: "面朝",
//       value: "face2",
//       children: targets,
//     },
//     {
//       label: "背对",
//       value: "back2",
//       children: targets,
//     },
//   ];
// });

// const handleChange = (value) => {
//   console.log(value);
//   if (value[0] === "face2") {
//     face2Obj(props.body.id, value[1]);
//   } else if (value[0] === "back2") {
//     back2Obj(props.body.id, value[1]);
//   }
// };

const onRangeChange = (body: any) => {
  // console.log("body", body);
  const targetBody = getTarget(body.id);
  if (targetBody) {
    // console.log("object :>> ", targetBody);
    const targetBall = getTargetBody(body.id);
    targetBody.rotation.y = body.rotation;
    targetBall.rotate = body.rotation;
  }
};
</script>

<template>
  <div>
    <!-- <div>{{ index }}:{{ body }}</div> -->
    <div
      style="display: flex; align-items: center; justify-content: space-between"
    >
      <div>{{ body.type }}</div>
      <div>
        <div>操作</div>
        <DropDownMenu :menus="menus" :submenus="targets" />
      </div>
    </div>
    <!-- <el-cascader
      v-model="selected"
      :options="options"
      :props="props"
      @change="handleChange"
    >
    </el-cascader> -->
    <input
      type="range"
      @input="onRangeChange(body)"
      :min="-Math.PI"
      :max="Math.PI"
      :step="Math.PI / 180"
      v-model="body.rotation"
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
</style>
