<script lang="ts" setup>
import { ref, computed } from "vue";
import UseMannequin from "../../composables/useMannequin";
import UseTopView from "../../composables/useTopView";
import UseBodys from "../../composables/useModels";

const { getTarget } = UseTopView();
const { getTarget: getTargetBody } = UseMannequin();
const { bodys, face2Obj, back2Obj } = UseBodys();

const props = defineProps<{ body: any; index: number }>();

const selected = ref("");

const options = computed(() => {
  const targets = bodys.value
    .filter((item) => item.id !== props.body.id)
    .map((item) => {
      return {
        label: item.id,
        value: item.id,
      };
    });
  return [
    {
      label: "面朝",
      value: "face2",
      children: targets,
    },
    {
      label: "背对",
      value: "back2",
      children: targets,
    },
  ];
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
    <div>{{ body.type }}</div>
    <el-cascader
      v-model="selected"
      :options="options"
      :props="props"
      @change="handleChange"
    >
    </el-cascader>
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

<style lang="less" scoped></style>
