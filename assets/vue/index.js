import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
/* import specific icons */
import { faUserSecret, faFileDownload, faFileImport, faCircleXmark, faTrash, faUserEdit, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
/* add icons to the library */
library.add(faUserSecret,faFileDownload, faFileImport, faCircleXmark, faTrash, faUserEdit, faCheckCircle);
/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.directive('tooltip', function(el, binding){
  $(el).tooltip({
    title: binding.value,
    placement: binding.arg,
    trigger: 'hover'
  })
});

new Vue({
  components: { App },
  template: "<App/>",
  router,
  store
}).$mount("#app");
