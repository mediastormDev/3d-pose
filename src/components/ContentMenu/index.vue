<script lang="ts" setup>
import UseMannequin from "../../composables/useMannequin";
import UseBodys from "../../composables/useModels";
import IMPORTIMG from "../../assets/import.png";
import COPYIMG from "../../assets/copy.png";
import MOVEUPIMG from "../../assets/moveup.png";
import MOVEDOWN from "../../assets/movedown.png";
import IVIISIABLEIMG from "../../assets/s_invisiable.png";
import DELETEIMG from "../../assets/delete.png";
import axios from "axios";
import { dayjs } from "element-plus";
import { ref, computed, onMounted } from "vue";

const { mousePostion, intersectObj } = UseMannequin();
const { bodys } = UseBodys();

const menus = ref([
  { label: "导入动作", value: "face2", icon: IMPORTIMG, show: true },
  { label: "复制动作", value: "back2", icon: COPYIMG },
  { label: "前置一层", value: "back2", icon: MOVEUPIMG },
  { label: "后移一层", value: "back2", icon: MOVEDOWN },
  { label: "隐藏模型", value: "back2", icon: IVIISIABLEIMG },
  { label: "删除模型", value: "back2", icon: DELETEIMG },
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
