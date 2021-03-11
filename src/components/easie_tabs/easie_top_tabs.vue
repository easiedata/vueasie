<template>
  <div>
    <ul class="e-nav e-nav-tabs bar_tabs e-mb-2">
      <li v-for="tab in tabs" v-bind:key="tab.id" class="e-nav-item" :class="{'active':tab.isActive}">
        <a @click="selectTab(tab)" class="e-nav-link" >{{ tab.name }}</a>
      </li>
    </ul>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
    export default {
      name: "easieTopTabs",
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

<style lang="scss">
  @import "../../assets/scss/variables.scss";
  .e-nav-tabs {
    padding-left: 14px;
    position: relative;
    z-index: 1;
    border-bottom: 1px solid $light_border_color;
  }

  .e-nav-item {
    margin-bottom: -1px;
    color: $secondary;
    border: 2px solid $light_border_color;
    margin-left: 8px;
    cursor: pointer;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
  }
  .e-nav-item:focus, .e-nav-item:hover, .e-nav-item.active{
    color: $primary;
    border-color: rgba($primary, .4)
  }

  
</style>
