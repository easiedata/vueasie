export const map_create_meta = {
    role: 'display',
    label: 'Mapa',
    component: 'easie-map',
    values_function: (vm, hide_loading, call_back) => {
      vm.axios
        .post('/get_e_map_values', {
          component_key: vm.component_key,
          group_list: vm.$group_list_adjust2endpoint(vm.group_list),
          filter_list: vm.value.filter_list,
          value_configs: vm.item_meta.value_configs
        })
        .then(data => {
          hide_loading();
          vm.map = JSON.parse(data.data.data['map']);
          vm.group_list_values = data.data.data['group_list_values'];
          call_back();
        })
        .catch(error => {
          hide_loading();
          vm.$default_error_handle(error);
        });
    }
}