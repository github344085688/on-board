// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import app from './app.vue';
import router from './router/router';
import validateform from './directives/validateform';
import RxEvent from './directives/rx-event';
import VeeValidate from "vee-validate";
import loding from "./directives/loding";
import VModal from "vue-js-modal";
import PluginHead from './plugins/popups';
import validates, { config }  from './shared/validate';
// import JsonExcel from 'vue-json-excel'
Vue.use(validateform);
Vue.use(loding);
Vue.use(RxEvent);
Vue.use(VeeValidate, config);
Vue.use(validates);
Vue.use(VModal);
Vue.use(PluginHead);
// Vue.component('downloadExcel', JsonExcel);
Vue.config.productionTip = false;
let v = new Vue({
  el: '#app',
  router,
  components: {app},
  template: '<app/>'
});


