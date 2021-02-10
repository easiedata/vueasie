<template>
  <div v-if="isActive">
    <slot></slot>
  </div>
</template>

<script>
    export default {
      name: "easieTab",
      props: {
        name: { required: true },
        selected: { default: false }
      },
      data() {
        return {
          isActive: false
        };
      },
      mounted() {
        this.isActive = this.selected;
      }
    };
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/styles.scss";
</style>