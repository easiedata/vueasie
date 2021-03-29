import { alert, defaultModules,  Stack } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';

defaultModules.set(PNotifyMobile, {});
const myStack = new Stack({
  dir1: 'down',
  firstpos1: 14,
  dir2: 'left',
  firstpos2: 14,
  push: 'top',
  maxStrategy: 'close',
  modalishFlash: false
});


export default {
  install(Vue, opts){
    let notify;
    Vue.prototype.$notify = (options) => {
      let opts = {
        title: 'Aviso:',
        text: '',
        icons:'brighttheme',
        type: 'notice',
        hide: true,
        delay: 3000,
        animate: {
          animate: true,
          in_class: 'bounceIn',
          out_class: 'bounceOut',
        },
        stack: myStack,
        ...options
      }
      notify = alert(opts);
    }
  }
}