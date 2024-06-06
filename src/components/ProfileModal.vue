<template>
  <modal ref="modal" :onModalSubmit="updateProfile">
    <form>
      <div class="field">
        <label class="label text-primary">Имя пользователя</label>
        <input v-model="userProfile.username" class="input" />
      </div>
      <div class="field">
        <label class="label text-primary">Электронная почта</label>
        <input v-model="userProfile.email" class="input" />
      </div>
      <div class="field">
        <label class="label text-primary">Имя</label>
        <input v-model="userProfile.name" class="input" />
      </div>
      <div class="field">
        <label class="label text-primary">Фамилия</label>
        <input v-model="userProfile.surname" class="input" />
      </div>
    </form>
  </modal>
</template>

<script>
import Modal from "../components/Modal.vue";
export default {
  components: {
    Modal,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      userProfile: { ...this.user },
    };
  },
  computed: {
    modal() {
      return this.$refs.modal;
    },
  },
  methods: {
    updateProfile() {
      this.$store.dispatch("user/updateProfile", {
        data: this.userProfile,
        onSuccess: () => this.modal.close(),
      });
    },
    open() {
      this.modal.open();
    },
  },
};
</script>
