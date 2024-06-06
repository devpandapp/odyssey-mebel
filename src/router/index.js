import { createWebHistory, createRouter } from "vue-router";
import { getAuth } from "firebase/auth";

import HomePage from "../pages/Home.vue";
import StagesPage from "../pages/Stages.vue";
import WhyPage from "../pages/Why.vue";
import QuestionsPage from "../pages/Questions.vue";
import NewsPage from "../pages/News.vue";
import ContactPage from "../pages/Contact.vue";
import LoginPage from "../pages/Login.vue";
import ProfilePage from "../pages/Profile";
import PostCreatePage from "../pages/PostCreate";
import PostDetailslPage from "../pages/PostDetails";
import PrivacyPage from "../pages/Privacy.vue";
import PageNotFound from "../pages/PageNotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/stages",
    name: "Stages",
    component: StagesPage,
  },
  {
    path: "/why",
    name: "Why",
    component: WhyPage,
  },
  {
    path: "/questions",
    name: "Questions",
    component: QuestionsPage,
  },
  {
    path: "/news",
    name: "News",
    component: NewsPage,
  },
  {
    path: "/contact",
    name: "Contact",
    component: ContactPage,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
    meta: { onlyGuestUser: true },
  },
  {
    path: "/posts/new",
    name: "PostCreate",
    component: PostCreatePage,
    meta: { onlyAuthUser: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfilePage,
    meta: { onlyAuthUser: true },
  },
  {
    path: "/posts/:slug",
    name: "PostDetails",
    component: PostDetailslPage,
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: PrivacyPage,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "AllPageNotFound",
    component: PageNotFound,
  },
  { path: "/404", name: "PageNotFound", component: PageNotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, _, next) => {
  const isAuth = !!getAuth().currentUser;

  if (to.meta.onlyAuthUser) {
    if (isAuth) {
      next();
    } else {
      next({ name: "Login" });
    }
  } else if (to.meta.onlyGuestUser) {
    if (isAuth) {
      next({ name: "Home" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
