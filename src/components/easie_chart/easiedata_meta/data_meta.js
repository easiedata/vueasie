export const chart_data_c_order = {
  'label': [{section: "Normal", components: ['label_normal_show', 'label_color','label_normal_font_size', 'label_normal_position', 'label_normal_formatter'], show: true}, {section: "Ênfase",
  components: ['label_emphasis_show', 'label_emphasis_font_size'], show: true}]
}


export const chart_data_c_data = {
  label_normal_show:{
    v:false,
    component:'easie-switch',
    label: '',
    get_value: (v) => v,
    key_list: ['label','normal', 'show'],
    bind:{
      s_label: 'Mostrar Rótulo',
    }
  },
  label_color: {
    v: '#fff',
    component: 'easie-sketch-color',
    label: 'Cor',
    get_value: (v) => v,
    key_list: ['label','normal', 'textStyle','color'],
    bind:{
    }
  },
  label_normal_font_size: {
    v: '14',
    component: 'easie-form-input',
    label: 'Tamanho Fonte',
    get_value: (v) => v ,
    key_list: ['label','normal', 'textStyle','fontSize'],
    bind:{type:'number', style:'max-width:150px'}
  },
  label_normal_position:{
    v:'Em cima',
    component: 'easie-select',
    label: 'Posição',
    get_value: (v) => v,
    key_list: ['label','normal','position'],
    bind:{ options:[
      {value:'top', label: 'Em cima'},
      {value:'inside', label: 'Dentro'},
      {value:'center', label: 'Centro'},
      {value:'bottom', label: 'Abaixo'},
      {value:'left', label: 'Esquerda'},
      {value:'right', label: 'Direita'}],
      reduce: option => option.value
    }
  },
  label_normal_formatter:{
    v:'{c}',
    component: 'easie-form-input',
    label: 'Formatação',
    tooltip: {
              classes:['easie-formatter'],
              placement: 'right',
              delay: { show: 100, hide: 100 },
              trigger: 'hover',
              show:false,
              content:`
              <ul class='formatter-ul'>
                <li><label> Váriaveis:</label></li>
                <li><label>{a} => Nome Dado</label></li>
                <li><label>{b} => Nome Grupo</label></li>
                <li><label>{c} => Valor Dado</label></li>
                <li><label>{d} => % Valor em pizza</label></li>
                </ul>`
              },
    get_value: (v) => v,
    key_list: ['label','normal','formatter'],
    bind:{}
  },
  label_emphasis_show:{
    v:false,
    component:'easie-switch',
    label: '',
    get_value: (v) => v,
    key_list: ['label','emphasis', 'show'],
    bind:{ s_label: 'Ênfase Rótulo'}
  },
  label_emphasis_font_size: {
    v: '24',
    component: 'easie-form-input',
    label: 'Tamanho Fonte',
    get_value: (v) => v ,
    key_list: ['label', 'emphasis', 'textStyle','fontSize'],
    bind:{type:'number', style:'max-width:150px'}
  }
}

export const chart_data_key_ref = {
  'label': 'Rótulo Dado'
}