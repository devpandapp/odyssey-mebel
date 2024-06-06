<template>
  <modal ref="modal">
    <img v-if="image" class="image" :src="image" />
  </modal>
</template>

<script>
import Modal from "../components/Modal.vue";
export default {
  components: {
    Modal,
  },
  props: {
    image: {
      type: String,
      required: true,
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
