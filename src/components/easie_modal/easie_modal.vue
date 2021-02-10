<template>
  <div :class="modal_wrapper">
    <div class="easie-modal e-bg-white e-p-1" :style="modal_width">
      <div class="easie-modal-header">
        <span @click="close_modal" class="e-close hover-text-easie">
          ×
        </span>
        <span class="e-modal-title e-text-secondary" style="font-weight: bold">
          <slot name="header"></slot>
        </span>
      </div>
      <div class="easie-modal-body">
        <slot></slot>
      </div>
      <div v-if="has_footer" class="e-d-flex e-align-items-center e-justify-content-center easie-modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "easieModal",
    props: {
      modal_super:{default:false},
      modal_disp_ref: { default: "" },
      width: { default: "80%" },
      has_cancel: { default: true },
      has_footer: { default: true }
    },
    computed: {
      modal_width() {
        return "width:" + this.width;
      },
      modal_wrapper() {
        if(this.modal_super){
          return 'easie-modal-wrapper-super';
        }
        return 'easie-modal-wrapper'
      }
    },
    methods: {
      close_modal() {
        this.$emit("close", this.modal_disp_ref);
      },
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/styles.scss";

  @media only screen and (max-width: 600px) {
    .easie-modal {
      width:99% !important;
    }
    .easie-modal-body {
      display:flex;
    }
    .easie-modal-wrapper{
      max-width:100%;
    }
  }

  .easie-modal-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 975;
    background-color: rgba(10, 10, 10, .6);
  }
  .easie-modal-wrapper-super {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1055;
    background-color: rgba(10,10,10,.6);
  }
  .easie-modal {
    margin: 30px auto;
    border-radius: 15px;
  }

  .easie-modal-body {
    padding: 7px;
    max-height: 75vh;
    overflow-y: auto;
  }

  .easie-modal-footer {
    padding: 15px;
    text-align: right;
    border-top: 1px solid #e5e5e5;
  }
  .easie-modal-header {
    padding: 7px;
    padding-bottom: 14px;
    border-bottom: 1px solid #e5e5e5;
  }
  .easie-modal-header i {
    margin-right: 7px;
  }

  .hover-text-white {
      cursor:pointer !important;
  }

  .hover-text-white:hover {
      color: white !important;
  }
</style>
