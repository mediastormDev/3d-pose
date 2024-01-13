<script lang="ts" setup>
import UseMannequin from "../../composables/useMannequin";
import UseBodys from "../../composables/useModels";
import axios from "axios";
import { dayjs } from "element-plus";
import { ref, computed, onMounted } from "vue";

const { mousePostion, intersectObj } = UseMannequin();
const { bodys } = UseBodys();

const menus = ref([
  { label: "导入动作", value: "face2" },
  { label: "复制动作", value: "back2" },
  { label: "前置一层", value: "back2" },
  { label: "后移一层", value: "back2" },
  { label: "隐藏模型", value: "back2" },
  { label: "删除模型", value: "back2" },
]);
const list = ref([]);

const targets = computed(() => {
  const res = bodys.value.map((item) => {
    return {
      label: item.id,
      value: item.id,
    };
  });

  return res;
});

const getList = async () => {
  const res = await axios.get("/api/humanpose");
  list.value =
    res.data.map((data: any) => {
      data.data.map((it: any, index: number) => {
        if (
          index === 1 ||
          index === 2 ||
          index === 3 ||
          index === 4 ||
          index === 5 ||
          index === 6 ||
          index == 11 ||
          index == 12 ||
          index == 13 ||
          index == 14 ||
          index == 15 ||
          index == 16
        ) {
          it[0] = -it[0];
        }
      });

      return {
        label: "手机数据" + dayjs(data.createdAt).format("MM-DD HH:mm:ss"),
        value: data.data,
      };
    }) || [];
  console.log("list :>> ", list);
};

const handleChange = (value) => {
  console.log(value);
};

onMounted(() => {
  getList();
});
</script>

<template>
  <div
    class="content_menu"
    :style="{ left: mousePostion.x + 'px', top: mousePostion.y + 'px' }"
  >
    <DropDownMenu :menus="menus" :submenus="list" @change="handleChange" />
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
