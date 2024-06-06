import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUpload,
  faMagnifyingGlass,
  faPlus,
  faPhone,
  faPhoneFlip,
  faTrash,
  faPenRuler,
  faCalendarDays,
  faChair,
  faCheckCircle,
  faUserPen,
  faPencil,
  faEnvelope,
  faCity,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add([
  faUpload,
  faMagnifyingGlass,
  faPlus,
  faPhone,
  faPhoneFlip,
  faTrash,
  faPenRuler,
  faCalendarDays,
  faChair,
  faCheckCircle,
  faUserPen,
  faPencil,
  faEnvelope,
  faCity,
  faWhatsapp,
]);

let app;

store.dispatch("user/onAuthChange", () => {
  if (!app) {
    app = createApp(App);

    app.use(store).use(router).use(Toast);

    app.component("font-awesome-icon", FontAwesomeIcon);
    app.mount("#app");
  }
});
