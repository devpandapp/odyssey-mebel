<template>
  <header class="header">
    <nav
      class="navbar is-fixed-top background-img"
      :class="$route.path === '/' ? '' : 'with-background'"
    >
      <div class="container">
        <div class="navbar-brand">
          <a href="/">
            <div class="is-size-2 ml-2 has-text-primary">ОДИССЕЯ</div>
            <div
              class="is-size-6 ml-2 has-background-primary has-text-white has-text-centered navbar-border-radius"
            >
              Мебель на заказ
            </div>
          </a>
          <span
            @click="isMenuOpen = !isMenuOpen"
            :class="{ 'is-active': isMenuOpen }"
            role="button"
            tabindex="0"
            class="navbar-burger burger navbar-burger-background"
            data-target="navbar-menu"
            id="navbar-brand"
          >
            <span id="navbar-brand"></span>
            <span id="navbar-brand"></span>
            <span id="navbar-brand"></span>
          </span>
        </div>
        <div
          id="navbar-menu"
          :class="{ 'is-active': isMenuOpen }"
          class="navbar-menu"
        >
          <div class="navbar-end">
            <router-link
              v-for="item in items"
              :key="item.text"
              :to="item.link"
              class="navbar-item nav-web"
            >
              {{ item.text }}
            </router-link>
            <template v-if="isAuthenticated">
              <router-link to="/profile" class="navbar-item">
                Профиль
              </router-link>
              <div class="ml-2 mb-2">
                <ul>
                  <li>
                    <a href="tel: 89277714551"> +7 (927) 771-45-51</a>
                  </li>
                  <li>
                    <a href="tel: 89270265475"> +7 (927) 026-54-75</a>
                  </li>
                  <li>
                    <a href="/contact" class="button is-primary">
                      <font-awesome-icon
                        icon="phone"
                      />&nbsp;&nbsp;&nbsp;Заказать проект
                    </a>
                  </li>
                </ul>
              </div>
            </template>
            <template v-else>
              <router-link to="/login" class="navbar-item">
                Авторизация
              </router-link>
              <div class="ml-2 mb-2">
                <ul>
                  <li>
                    <a href="tel: 89277714551"> +7 (927) 771-45-51</a>
                  </li>
                  <li>
                    <a href="tel: 89270265475"> +7 (927) 026-54-75</a>
                  </li>
                  <li>
                    <a href="/contact" class="button is-primary">
                      <font-awesome-icon
                        icon="phone"
                      />&nbsp;&nbsp;&nbsp;Заказать проект
                    </a>
                  </li>
                </ul>
              </div>
            </template>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import useAuth from "../composition/useAuth";
export default {
  el: "#app",
  props: {
    title: {
      type: String,
      default: "ОДИССЕЯ",
    },
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      routeChange: false,
      isMenuOpen: false,
    };
  },
  watch: {
    $route() {
      this.isMenuOpen = false;
    },
  },
  setup() {
    return useAuth();
  },
  created() {
    window.addEventListener("resize", this.handleWindowResizing);
    window.addEventListener("click", this.onClick);
  },
  unmounted() {
    window.removeEventListener("resize", this.handleWindowResizing);
    window.removeEventListener("click", this.onClick);
  },
  methods: {
    handleWindowResizing(e) {
      if (this.isMenuOpen && e.target.innerWidth > 1020) {
        this.isMenuOpen = false;
      }
    },
    onClick: function (e) {
      if (
        this.isMenuOpen &&
        e.target.id !== "navbar-brand" &&
        e.target.id !== "navbar-menu"
      )
        this.isMenuOpen = false;
    },
  },
};
</script>

<style scoped>
.navbar-border-radius {
  border-radius: 4px;
}
</style>
