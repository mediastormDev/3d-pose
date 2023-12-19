import { ref } from "vue";

const bodys = ref<any[]>([]);

export default () => {
  return {
    bodys,
  };
};
