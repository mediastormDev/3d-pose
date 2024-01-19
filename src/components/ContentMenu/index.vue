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
import { ref, computed, onMounted, toValue } from "vue";

const { mousePostion, intersectObj, setPosture } = UseMannequin();
const { bodys, changePose3D, getModelById } = UseBodys();

const menus = ref([
  { label: "导入动作", value: "pose", icon: IMPORTIMG, show: true },
  { label: "复制动作", value: "pose", icon: COPYIMG },
  { label: "前置一层", value: "pose", icon: MOVEUPIMG },
  { label: "后移一层", value: "pose", icon: MOVEDOWN },
  { label: "隐藏模型", value: "pose", icon: IVIISIABLEIMG },
  { label: "删除模型", value: "pose", icon: DELETEIMG },
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
  const res = await axios.get("https://api.ysjf.com/web/v1/humanpose");
  list.value =
    res.data.map((data: any, i: number) => {
      if (!data.type || data.type !== "posture") {
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
      }

      return {
        label: "手机数据" + dayjs(data.createdAt).format("MM-DD HH:mm:ss"),
        value: data.data,
      };
    }) || [];
  console.log("list :>> ", list);
};

const handleChange = (value) => {
  // console.log(value);
  // console.log("intersectObj :>> ", intersectObj);
  const poseString = `{"version":7,"data":[[0,3.8,0],[0,-90,0],[0,0,-2],[0,0,5],[6,0,0],[0],[-6,-6,-0.6],[-6,0,0],[0],[6,6,-0.6],[7,-0.6,-5],[15],[5,0,0],[-90,70,75,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[-7,0.6,-5],[15],[-5,0,0],[90,-70,75,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10]]}`;

  const getParent = (obj) => {
    // console.log("obj :>> ", obj);
    const temp = toValue(obj);
    // console.log("temp :>> ", temp);
    // console.log("temp.parent :>> ", temp.parent);
    if (temp.parent.l_arm) {
      return temp.parent;
    }
    return getParent(temp.parent);
  };
  const model = getModelById(getParent(intersectObj)._id);

  // 勿删，用于获取 model 当前位置数据
  value[1][0] = model.posture.data[0];
  // 之后才能重置 model 位置
  setPosture(model, poseString);
  console.log("value", value);
  // if (JSON.stringify(value[1][0]) === "[0,0,0]") {
  if (value[2] > 1) {
    changePose3D(model, value[1]);
  } else {
    setPosture(model, JSON.stringify({ version: 7, data: value[1] }));
  }
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
