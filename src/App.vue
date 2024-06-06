<template>
  <div>
    <n-s-navbar :title="brandName" :items="menuItems" />
    <router-view />
    <n-s-footerbar />
  </div>
</template>

<script>
import NSNavbar from "./components/Navbar.vue";
import NSFooterbar from "./components/Footerbar.vue";

export default {
  name: "App",
  components: {
    NSNavbar,
    NSFooterbar,
  },
  data() {
    return {
      brandName: "ОДИССЕЯ",
      menuItems: [
        { text: "НАШИ РАБОТЫ", link: "/" },
        { text: "ЭТАПЫ РАБОТЫ", link: "/stages" },
        { text: "ПОЧЕМУ НАМ ДОВЕРЯЮТ", link: "/why" },
        { text: "ВОПРОСЫ И ОТВЕТЫ", link: "/questions" },
        // { text: "АКЦИИ", link: "/news" },
        { text: "КОНТАКТЫ", link: "/contact" },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "assets/styles/variables.scss";
@import "~bulma/bulma.sass";
@import "assets/styles/main.scss";
</style>
