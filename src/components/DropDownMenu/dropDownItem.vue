<script lang="ts" setup>
import { ref } from "vue";
import { UseMouseInElement } from "@vueuse/components";
import { useElementBounding } from "@vueuse/core";

interface IMenu {
  label: string;
  value: string;
}
const emits = defineEmits(["change"]);

const props = defineProps<{ menu: IMenu; submenus: IMenu[]; index: number }>();

const submenuRef = ref(null);

const onClickSubMenu = (menu: string, submenu: string) => {
  emits("change", [menu, submenu]);
};

const submenuBounding = ref(useElementBounding(submenuRef));
</script>
<template>
  <UseMouseInElement v-slot="{ isOutside }">
    {{ menu.label }} {{ isOutside }}
    <safeArea
      v-show="!isOutside && submenuRef"
      :menuBounding="submenuBounding"
      :index="index"
    />
    <div
      :style="{
        visibility: !isOutside ? 'visible' : 'hidden',
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
          {{ submenu.label }}
        </div>
      </div>
    </div>
  </UseMouseInElement>
</template>

<style lang="less" scoped>
.submenu {
  padding: 10px;
  margin: 0;
  background: #ffffff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.07);
  border-radius: 6px;
  position: absolute;
  right: 0;
  top: -10px;
  transform: translateX(100% + 10px);
}
.submenu_item {
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
