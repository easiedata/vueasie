import {indicator_data_c_order, indicator_data_c_data, indicator_data_key_ref} from '../easie_indicator/meta/data_meta';
import {indicator_group_c_order, indicator_group_c_data, indicator_group_key_ref} from '../easie_indicator/meta/group_meta';
import {indicator_c_order, indicator_c_data, indicator_key_ref} from '../easie_indicator/meta/indicator_meta';

import {chart_data_c_order, chart_data_c_data, chart_data_key_ref} from '../easie_chart/easiedata_meta/data_meta';
import {chart_c_order, chart_c_data, chart_key_ref} from '../easie_chart/easiedata_meta/chart_meta';

import {map_c_order, map_c_data, map_key_ref} from '../easie_map/easiedata_meta/map_meta';


export const meta_settings = {
  'indicator': {
    'data':{ 'c_order': indicator_data_c_order, 'c_data': indicator_data_c_data, 'key_ref': indicator_data_key_ref
    },
    'group':{ 'c_order': indicator_group_c_order, 'c_data': indicator_group_c_data, 'key_ref': indicator_group_key_ref
    },
    'item_meta':{ 'c_order': indicator_c_order, 'c_data': indicator_c_data, 'key_ref': indicator_key_ref
    }
  },
  'chart': {
    'data':{ 'c_order': chart_data_c_order, 'c_data': chart_data_c_data, 'key_ref': chart_data_key_ref
    },
    'group':{ 'c_order': [], 'c_data': {}, 'key_ref': []
    },
    'item_meta':{ 'c_order': chart_c_order, 'c_data': chart_c_data, 'key_ref': chart_key_ref
    }
  },
  'map': {
    'data':{ 'c_order': [], 'c_data': {}
    },
    'group':{ 'c_order': [], 'c_data': {}
    },
    'item_meta': {'c_order': map_c_order, 'c_data': map_c_data, 'key_ref': map_key_ref
    }
  },
  'filter': {
    'data':{ 'c_order': [], 'c_data': {}
    },
    'group':{ 'c_order': [], 'c_data': {}
    }
  }
}