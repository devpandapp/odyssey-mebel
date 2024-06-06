import { createStore } from "vuex";
import post from "./modules/post";
import user from "./modules/user";
import toast from "./modules/toast";

export default createStore({
  modules: {
    post,
    user,
    toast,
  },
});
