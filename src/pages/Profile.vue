<template>
  <div class="section section-margin-top">
    <div class="container">
      <h1 class="section-title text-link">Профиль</h1>
      <div class="columns is-multiline is-centered">
        <div class="column is-4">
          <p class="text-primary">
            <span class="title text-link">{{ user?.username }}</span
            ><br />
            <span class="title text-link">{{ user?.email }}</span
            ><br />
            <span class="title text-link">{{ user?.name }}</span
            >&nbsp;<span class="title text-link">{{ user?.surname }}</span>
          </p>
          <profile-modal v-if="user" :user="user" ref="modal" />
          <br />
          <button @click="open" class="button is-block is-success is-fullwidth">
            <font-awesome-icon icon="user-pen" />&nbsp;Редактировать данные
          </button>
          <button
            @click="() => $store.dispatch('user/logout')"
            class="button is-block is-danger is-fullwidth mt-1"
          >
            Выйти
          </button>
        </div>
        <div class="column is-8"></div>
      </div>
    </div>
  </div>
</template>
<script>
import useAuth from "../composition/useAuth";
import ProfileModal from "../components/ProfileModal.vue";
export default {
  components: {
    ProfileModal,
  },
  setup() {
    return useAuth();
  },
  watch: {
    isAuthenticated(isAuth) {
      if (!isAuth) {
        this.$router.push("/");
      }
    },
  },
  computed: {
    modal() {
      return this.$refs.modal;
    },
  },
  methods: {
    open() {
      this.modal.open();
    },
  },
};
</script>

<style scoped>
.link {
  font-weight: 500;
  color: rgb(79, 79, 172);
  text-decoration: underline;
}
.user-info {
  margin-bottom: 10px;
}
.stats-error {
  font-size: 40px;
  font-weight: bold;
  margin-top: 30px;
}
.delete-item {
  color: red;
}
.stats-tab {
  border-bottom: 2px solid transparent;
  transition: 0.5s;
}
.stats-tab:hover {
  cursor: pointer;
  border-bottom: 2px solid black;
}
.stats-tab.is-active {
  border-bottom: 2px solid black;
}
.stat-val {
  font-size: 2em;
  padding-top: 20px;
  font-weight: bold;
}
.stat-key {
  font-size: 1.4em;
  font-weight: 200;
}
.section.profile-heading
  .column.is-2-tablet.has-text-centered
  + .has-text-centered {
  border-left: 1px dotted rgba(0, 0, 0, 0.2);
}
.container.profile {
  margin-top: 1%;
}
.control.is-pulled-left span.select {
  margin-right: 5px;
  border-radius: 2px;
}
.modal-card .content h1 {
  padding: 40px 10px 10px;
  border-bottom: 1px solid #dadada;
}
.container.profile .profile-options .tabs ul li.link a {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f1f1f1;
}
.card-footer {
  justify-content: center;
  padding: 5px;
}
</style>
