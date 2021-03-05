<template>
  <div>
    <ul class="e-nav e-nav-tabs bar_tabs e-mb-2">
      <li v-for="tab in tabs" v-bind:key="tab.id" class="e-nav-item">
        <a @click="selectTab(tab)" :class="[{'active':tab.isActive}, 'e-nav-link']">{{ tab.name }}</a>
      </li>
    </ul>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
    export default {
      name: "easie-top-tabs",
      data() {
        return { tabs: [] };
      },
      created() {
        this.tabs = this.$children;
      },
      methods: {
        selectTab(selectedTab) {
          this.tabs.forEach(tab => {
            tab.isActive = tab.name == selectedTab.name;
          });
        }
      }
    };
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/styles.scss";
</style>