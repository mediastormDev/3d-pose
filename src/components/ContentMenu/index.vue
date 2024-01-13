<script lang="ts" setup>
import UseMannequin from "../../composables/useMannequin";
import UseBodys from "../../composables/useModels";
import { ref, computed } from "vue";

const { mousePostion } = UseMannequin();
const { bodys } = UseBodys();

const menus = ref([
  { label: "导入动作", value: "face2" },
  { label: "复制动作", value: "back2" },
  { label: "前置一层", value: "back2" },
  { label: "后移一层", value: "back2" },
  { label: "隐藏模型", value: "back2" },
  { label: "删除模型", value: "back2" },
]);

const targets = computed(() => {
  const res = bodys.value.map((item) => {
    return {
      label: item.id,
      value: item.id,
    };
  });

  return res;
});

const handleChange = (value) => {
  console.log(value);
};
</script>

<template>
  <div
    class="content_menu"
    :style="{ left: mousePostion.x + 'px', top: mousePostion.y + 'px' }"
  >
    <DropDownMenu :menus="menus" :submenus="targets" @change="handleChange" />
  </div>
</template>

<style lang="less" scoped>
.content_menu {
  position: fixed;
  z-index: 10;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
