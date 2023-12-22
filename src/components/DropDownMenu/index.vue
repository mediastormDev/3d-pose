<script lang="ts" setup>
import { ref } from "vue";
import safeArea from "./safeArea.vue";

interface IMenu {
  label: string;
  value: string;
}
const props = defineProps<{ menus: IMenu[]; submenus: IMenu[] }>();

const submenuRef = ref(null);
const showSubmenu = ref(false);
const hoverIndex = ref(-1);
</script>

<template>
  <ul>
    <li
      style="position: relative"
      @mouseenter="
        showSubmenu = true;
        hoverIndex = index;
      "
      @mouseleave="
        showSubmenu = false;
        hoverIndex = -1;
      "
      v-for="(menu, index) in menus"
      :key="index"
    >
      {{ menu.label }}
      <safeArea :menu-ref="submenuRef" :index="index" />
      <div v-show="showSubmenu && hoverIndex === index" class="submenu">
        <div ref="submenuRef">
          <div v-for="(submenu, i) in submenus" :key="i">
            {{ submenu.label }}
          </div>
        </div>
      </div>
    </li>
  </ul>
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
