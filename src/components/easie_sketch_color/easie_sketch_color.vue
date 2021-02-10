<template>
  <div>
    <div
      @click="show_sketch"
      v-click-outside="hide_sketch"
      class="easie-color-picker bd-highlight e-d-flex e-justify-content-around e-rounded"
    >
      <div class="e-input-group-prepend e-align-self-center">
        <span
          class="e-input-group-text"
          id="basic-addon1"
          style="border:2px solid #ddd;"
          :style="'background-color:' + value"
        ></span>
      </div>
      <!-- <span class="input-group-prepend bd-highlight">
      <span class="current-color" :style="'border:2px solid #ddd; background-color:' + value"></span>
      </span>-->
    </div>
    <sketch-picker class="sketch-picker-position" v-if="display_picker" v-model="sketch_value" :presetColors="pallete" ></sketch-picker>
  </div>
</template>

<script>
    import { Sketch } from "vue-color";
    import ClickOutside from 'vue-click-outside';

    export default {
      name: "easieSketchColor",
      components: {
        "sketch-picker": Sketch
      },
      directives: {
        ClickOutside
      },
      props: {
        value: { default: "#000" },
        pallete: {
          type: Array,
          default: function() {
            return this.DEFAULT_DATA_COLORS;
          }
        }
      },
      data() {
        return {
          display_picker: false,
          sketch_value: { hex: "#000" },
          c_type: "hex",
          DEFAULT_DATA_COLORS: [
              '#003366', '#448ef6', '#fdb44b', '#80ac7b', '#6b778d', '#d04925', '#e5cf0d', '#7c4789',
              '#ff008b', '#9fd3c7', '#07a2a4', '#9a7fd1', '#6f5553', '#c9ab0', '#696969', '#aaaaaa',
              '#ffffff', '#cccccc',  "#fafafa", "#c8c8c8"
          ],
        };
      },
      mounted() {
        this.get_value_type();
      },
      methods: {
        show_sketch() {
          this.display_picker = true;
        },
        hide_sketch() {
          this.display_picker = false;
        },
        on_input() {
          this.$emit("input", this.sketch_value[this.c_type]);
        },
        get_value_type() {
          if (this.value.slice(0, 4) == "rgba") {
            this.c_type = "rgba";
          }
          if (this.value.slice(0, 1) == "#") {
            this.c_type = "hex";
          }
          this.sketch_value = {};
          this.sketch_value[this.c_type] = this.value;
        }
      },
      watch: {
        sketch_value: function() {
          this.on_input();
        },
        value: function() {
          this.get_value_type();
        }
      }
    };
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/styles.scss";

  .sketch-picker-position{
    position: absolute;
    z-index: 5;
  }

  .easie-color-picker {
    width: 60px;
    height: 37px;
    background-color: #EEEEEE;
    border: 1px solid rgba(86, 61, 124, 0.15);
  }
</style>