<script lang="ts" setup>
import { ref } from "vue";
import safeArea from "./safeArea.vue";
import DropDownItem from "./dropDownItem.vue";

interface IMenu {
  label: string;
  value: string;
}
const emits = defineEmits(["change"]);
const props = defineProps<{ menus: IMenu[]; submenus: IMenu[] }>();

// const submenuRef = ref(null);
// const showSubmenu = ref(false);
// const hoverIndex = ref(-1);

// const parent = ref(null);

// const { isOutside } = useMouseInElement(parent);

// const child = ref(null);

// const onMouseEnter = () => {
//   console.log("onMouseEnter");
//   showSubmenu.value = true;
// };

// const onMouseLeave = () => {
//   console.log("onMouseLeave");
//   showSubmenu.value = false;
// };

// const onMouseOver = (index: number) => {
//   console.log("onMouseOver", index);
//   hoverIndex.value = index;
// };

const onClickSubMenu = (menu: string, submenu: string) => {
  emits("change", [menu, submenu]);
};
</script>

<template>
  <ul style="position: absolute; top: 0; left: 20px">
    <li style="position: relative" v-for="(menu, index) in menus" :key="index">
      <DropDownItem :menu="menu" :index="index" :submenus="submenus" />
      <!-- {{ menu.label }}
      <safeArea
        v-show="showSubmenu && hoverIndex === index"
        :menu-ref="submenuRef"
        :index="index"
      />
      <div
        :style="{
          visibility:
            showSubmenu && hoverIndex === index ? 'visible' : 'hidden',
        }"
        class="submenu"
        ref="child"
      >
        <div ref="submenuRef">
          <div
            @click="onClickSubMenu(menu.value, submenu.value)"
            v-for="(submenu, i) in submenus"
            :key="i"
            class="submenu_item"
          >
            {{ submenu.label }} {{ hoverIndex }}
          </div>
        </div>
      </div> -->
    </li>
  </ul>
</template>

<style lang="less" scoped>
ul {
  list-style: none;
  padding: 10px;
  margin: 0;
  background: #ffffff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.07);
  border-radius: 6px;
}

li {
  list-style: none;
  background: #fff;
  color: #2a2a2a;
  width: 100px;
  padding: 5px 10px;
  margin: 2px 0;
  cursor: pointer;
  border-radius: 6px;
  &:hover {
    background: #f4f6f7;
  }
}
</style>
