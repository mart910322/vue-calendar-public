import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'font-awesome/css/font-awesome.css'
import AOS from "aos";
import "aos/dist/aos.css";

/*
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)
Vue.component('font-awesome-icon', FontAwesomeIcon)
*/
Vue.config.productionTip = false

new Vue({
  created() {
    AOS.init({ disable: "phone" });
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
