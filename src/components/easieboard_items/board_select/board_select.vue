<template>
  <div>
    <div class="e-d-flex justify-content-center">
      <label>Aloha</label>
    </div>
    <easie-select v-model="val"></easie-select>
  </div>
</template>

<script>
  import easieSelect from '../../easie_select/easie_select.vue';
  export default {
    name: 'board-select',
    components: {
      easieSelect
    },
    data(){
      return {
        val: ''
      }
    },
    methods:{
      resize(){},
      new_params(){},
      new_filter(){},
    }
  }
</script>