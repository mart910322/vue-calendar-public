import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
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
Vue.config.productionTip = false;



let app;
firebase.auth().onAuthStateChanged(() => {

  if(!app){
    app = new Vue({
      created() {
        AOS.init({});
      },
      router,
      store,
      render: h => h(App)
    }).$mount('#app');

  }
})


