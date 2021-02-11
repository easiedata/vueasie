<template>
  <div class="e-d-flex e-align-items-center e-justify-content-center ">
    <div>
      <label> {{list_label}} </label>
      <div v-for="item in list_items" :key="item.val" class="e-d-flex e-align-items-center e-pt-1">
        <easie-radio v-model="attribute" :opt="item.val" name="edit-easiedata-chart-label">
        </easie-radio>
        <label
          @click="attribute=item.val"
          class="hover-text-easie e-ml-2 e-mb-0"
          :class="{'text-easie':attribute==item.val}"> {{item.label}}
         </label>
      </div>
    </div>
  </div>
</template>

<script>
  import easie_radio from '../easie_radio/easie_radio.vue';

  export default {
    name: 'easieRadioList',
    components: {
      'easie-radio': easie_radio
    },
    props:{
      value:{required:true},
      list_items:{required:true},
      list_label:{required:true}
    },
    data(){
      return {
        attribute: this.value
      }
    },
    watch:{
        attribute(){
            this.$emit('input', this.attribute);
        },
        value(){
            this.attribute = this.value;
        }
    }
  }
</script>
<style lang="scss" scoped>

  @import "../../assets/scss/styles.scss";

</style>