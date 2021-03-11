<template>
  <div class="app_container e-m-1 e-p-1 e-pb-4">
    <div class="e-d-flex e-justify-content-between app_container_header e-ml-2">
      <span>
        <slot name="title"></slot>
      </span>
      <span>
        <slot name="tools"></slot>
      </span>
    </div>
    <div class=" e-ml-2 e-mt-2">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'easie-app-container'
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/styles.scss";
</style>

<style lang="scss">
  .app_container {
    border: none !important;
    border-radius: 15px !important;
    box-shadow: 0px 0px 25px lightgray !important;
    background-color: #fff;
}

.app_container_header {
    padding: 7px;
    border-bottom: 1px solid #e5e5e5;
}
</style>