<script lang="ts" setup>
import { ref } from "vue";
import safeArea from "./safeArea.vue";
import ARROWIMG from "../../assets/right_1.png";

interface IMenu {
  label: string;
  value: string;
}
const emits = defineEmits(["change"]);
const props = defineProps<{ menus: IMenu[]; submenus: IMenu[] }>();

const submenuRef = ref(null);
const showSubmenu = ref(false);
const hoverIndex = ref(-1);

// const parent = ref(null);
// const child = ref(null);

const onClickSubMenu = (menu: string, submenu: string) => {
  emits("change", [menu, submenu]);
};
</script>

<template>
  <ul style="position: absolute; top: 0; left: 20px">
    <li
      ref="parent"
      style="position: relative"
      @mouseover="hoverIndex = index"
      @mouseenter="showSubmenu = true"
      @mouseleave="showSubmenu = false"
      v-for="(menu, index) in menus"
      :key="index"
    >
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        "
      >
        <div class="item_title">{{ menu.label }}</div>
        <img style="width: 20px" :src="ARROWIMG" alt="" />
      </div>
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
            <div class="item_title">{{ submenu.label }}</div>
          </div>
        </div>
      </div>
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
  width: 180px;
  padding: 5px 10px;
  margin: 2px 0;
  cursor: pointer;
  border-radius: 6px;
  &:hover {
    background: #f4f6f7;
  }
}

.submenu {
  padding: 10px;
  margin: 0;
  background: #ffffff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.07);
  border-radius: 6px;
  position: absolute;
  right: 0;
  top: -10px;
  transform: translateX(100% + 8px);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.submenu_item {
  list-style: none;
  background: #fff;
  color: #2a2a2a;
  width: 165px;
  padding: 5px 10px;
  margin: 2px 0;
  cursor: pointer;
  border-radius: 6px;
  &:hover {
    background: #f4f6f7;
  }
}

.item_title {
  font-size: 13px;
  font-weight: 600;
  color: #24252c;
}
</style>
