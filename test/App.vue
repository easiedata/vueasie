<template>
  <div id="app" class="e-mb-2">
    <div class="e-mt-4 e-px-4">
      <div>
        <label>Cor</label>
      </div>
      <div>
        <easie-sketch-color v-model="text_color"></easie-sketch-color>
      </div>
    </div>
    <div class="e-mt-4 e-px-4">
      <easie-checkbox
        value='checked'
        ref="all_options_list_checkbox"
        opt="all_options">
      </easie-checkbox>
    </div>
    <div class="e-mt-4 e-px-4">
      <easie-form-input type="number" v-model="input_test" style='max-width:150px'>
      </easie-form-input>
    </div>
    <div class="e-mt-4 e-px-4">
      <easie-hr v-model="visible" hr_label="Componente">
      </easie-hr>
    </div>
    <div v-if="visible" class="e-mt-4 e-px-4">
      <easie-select class="e-w-75" v-model="sel_test" :options="test_options">
      </easie-select>
    </div>
    <div class="e-d-flex e-align-items-center e-mb-2">
      <div v-if="visible" class="e-d-flex e-mt-4 e-px-4">
        <easie-radio v-model="group_mode" opt="old" name="add-data-group-opt" >
        </easie-radio>
        <label
          @click="group_mode=(group_mode=='old' ? 'new' : 'old')"
          class="hover-text-easie e-ml-2 e-mb-0"
          :class="{'text-easie':group_mode=='old'}"> Marcar opção</label>
      </div>
    </div>
    <div v-if="visible" class="e-mt-4 e-px-4">
      <easie-switch v-model="show_modal"> Mostrar Modal</easie-switch>
    </div>
    <div>
      <easie-modal v-if="show_modal" @close="show_modal=false" width="85%">
        <template slot="header">
          Editar Dado
        </template>
        <div>
          <easie-top-tabs>
            <easie-tab key="structure" name="Estrutura" :selected="true">
              <div class="e-mt-4 e-px-4">
                <easie-textarea
                  v-model="test_textarea"
                  class="e-w-100" :rows="2" placeholder="Digite Fórmula ou Valor"></easie-textarea>
              </div>
            </easie-tab>
            <easie-tab key="events" name="Opções">
              <div v-if="visible" class=" e-d-flex e-flex-column e-mt-4 e-px-4">
                <div class="e-d-flex e-align-items-center">
                  <easie-radio-list
                    v-model="apply"
                    :list_items="apply_ref"
                    :list_label="apply_label">
                  </easie-radio-list>
                </div>
              </div>
            </easie-tab>
          </easie-top-tabs>
        </div>
        <template slot="footer">
          <div>
            <easie-switch v-model="visibility"> Visível</easie-switch>
          </div>
        </template>
      </easie-modal>
    </div>
    <div class="e-d-flex e-mt-4 e-px-4">
      <span class="e-d-flex easiedata-group-el e-p-1" style="max-width: 100px">
        <tooltip-label class="tooltip-text-style" :key="data_op.name+1"  :value="data_op.value"></tooltip-label>
      </span>
    </div>
  </div>
</template>

<script>


export default {
  name: 'App',
  data() {
    return {
      text_color: '#696969',
      input_test: '23',
      visible: true,
      checked: false,
      test_options: ['=', '>', '>=', '<', '<=',  '!='],
      sel_test: '=',
      group_mode: 'new',
      apply_label: 'Opção escolhida:',
      apply: 'op1',
      apply_ref:[
          {
            val: 'op1',
            label: 'Essa aqui',
          },
          {
            val: 'op2',
            label: 'Não essa aqui'
          },
          {
            val: 'op3',
            label: 'Não, não, essa aqui'
          },
          {
            val: 'all',
            label: 'Ah, todas então.'
          }
      ],
      visibility: true,
      test_textarea: '',
      show_modal: false,
      data_op: { name: 'data 1', value: 'ahjsdhgsajghajdsghjasdgjhasdg'}
    };
  }
}
</script>

<style lang="scss">
  @import "../src/assets/scss/styles.scss";
  .easiedata-group-el {
    /*border: 1px solid #ddd;*/
    white-space: nowrap;
    line-height:1.7;
  }
  // .tooltip-text-style {
  //   color:blue;
  // }
</style>
