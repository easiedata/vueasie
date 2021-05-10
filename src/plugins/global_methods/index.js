export default {
    install(Vue, opts){

        Vue.prototype.$recursive_merge = (upd_json, ref_json_receive)=>{
            let ref_json = JSON.parse(JSON.stringify(ref_json_receive));
            let merged_json = {}
            let object_constructor = ({}).constructor;
            for (let key in upd_json){
                let val = upd_json[key];
                if(val!==null && typeof val != "undefined"){
                    if(val.constructor == object_constructor && ref_json.hasOwnProperty(key)){
                        val = Vue.prototype.$recursive_merge(upd_json[key], ref_json[key]);
                    }
                }
                merged_json[key] = val;
            }

            for(let key in ref_json){
                let val = ref_json[key]
                if(upd_json.hasOwnProperty(key)){
                    continue
                }
                merged_json[key] = val;
            }
            return merged_json;
        }

        Vue.prototype.$recursive_set_key = (dict, key_list, value) => {
            let key = key_list[0];
            if(key_list.length === 1){
                dict[key] = value
                return;
            }
            if(!(key in dict)){
                dict[key] = {}
            }
            return Vue.prototype.$recursive_set_key(dict[key], key_list.slice(1), value);
        }

        Vue.prototype.$json2style = (style_json) => {
            let css_style = '';
            for(let key in style_json){
              css_style += `${key}: ${style_json[key]};`
            }
            return css_style;
        }

        Vue.prototype.$get_json_key = (key_list, json, default_v) => {
            //checar se for array ou json
            let json_key_list = Object.keys(json).length

            if (json_key_list != 0 && key_list.length != 0){
                let val = json[key_list[0]]
                if(typeof val == 'undefined'){
                    return default_v
                }
                if(key_list.length === 1){
                    return val;
                }
                return Vue.prototype.$get_json_key(key_list.slice(1), val, default_v)
            }
            else {
                return default_v;
            }
        }

        Vue.prototype.$url_name2content_name = (name) => {
            return  name.split('@')[0] + ' ' + '@' + name.split('@')[1];
        }

        Vue.prototype.$content_name2url_name = (name) => {
            return  name.split(" ")[0] + name.split(" ")[1];
        }

        Vue.prototype.$is_function = (variable) => {
            return variable && {}.toString.call(variable) === '[object Function]';
        }

    }
}