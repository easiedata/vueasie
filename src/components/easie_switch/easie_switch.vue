<template>
    <span class="e-d-flex e-align-items-center easie-switch-span" >
      <label class="easie-switch">
        <input @input="on_input" :checked="value" v-model="value" type="checkbox"/>
        <div>
          <span>
          </span>
        </div>
      </label>
      <label @click="$emit('input', !value)" class="hover-text-easie" :class="{'text-easie':value}">
        {{s_label}}
        <slot></slot>
      </label>
    </span>
</template>

<script>
  export default {
    name: 'easie-switch',
    props:{
      value:{required:false},
      s_label:{default:''}
    },
    methods:{
      on_input(e){
        this.$emit('input',e.target.checked)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/styles.scss";

  .easie-switch {
    --line: #B0C4DE;
    --dot: #2486BE;
    --circle: #808080;
    --duration: .3s;
    --text: #2486BE;
    cursor: pointer;
    input {
      display: none;
      & + div {
        position: relative;
        &:before,
        &:after {
          --s: 1;
          content: '';
          position: absolute;
          height: 4px;
          top: 11px;
          width: 21px;
          background: var(--line);
          transform: scaleX(var(--s));
          transition: transform var(--duration) ease;
        }
        &:before {
          --s: 0;
          left: 0;
          transform-origin: 0 50%;
          border-radius: 2px 0 0 2px;
        }
        &:after {
          left: 18px;
          transform-origin: 100% 50%;
          border-radius: 0 2px 2px 0;
        }
        span {
          padding-left: 42px;
          line-height: 24px;
          color: var(--text);
          &:before {
            --x: 0;
            --b: var(--circle);
            --s: 4px;
            content: '';
            position: absolute;
            left: 0;
            top: 3px;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            box-shadow: inset 0 0 0 var(--s) var(--b);
            transform: translateX(var(--x));
            transition: box-shadow var(--duration) ease, transform var(--duration) ease;
          }
          &:not(:empty) {
            padding-left: 40px;
          }
        }
      }
      &:checked {
        & + div {
          &:before {
            --s: 1;
          }
          &:after {
            --s: 0;
          }
          span {
            &:before {
              --x: 19px;
              --s: 12px;
              --b: var(--dot);
            }
          }
        }
      }
    }
  }

  html .easie-switch-span {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }

  * .easie-switch-span {
    box-sizing: inherit;
    &:before,
    &:after {
      box-sizing: inherit;
    }
  }
</style>