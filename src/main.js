import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Buefy from "buefy";
import store from "./store/store";
import "../node_modules/buefy/dist/buefy.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUserSecret);
library.add(faCoffee);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;
Vue.use(Buefy);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
