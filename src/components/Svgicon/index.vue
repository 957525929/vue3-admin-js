<template>
  <svg class="svg-class" :class="className">
    <use :href="'#icon-' + iconName"></use>
  </svg>
</template>
<script>
import { context } from "ant-design-vue/lib/vc-image/src/PreviewGroup";
export default {
  name: "SvgIcon",
  props: {
    iconName: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped>
</style>