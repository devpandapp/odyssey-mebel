<template>
  <div>
    <template v-if="$slots.activator">
      <div @click="open">
        <slot name="activator" />
      </div>
    </template>
    <div :class="['modal', { 'is-active': isOpen }]">
      <div class="modal-background"></div>
      <div class="modal-card section">
        <header class="modal-card-head">
          <p class="modal-card-title text-primary">Просмотр</p>
          <button @click="close" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <slot />
        </section>
        <footer class="modal-card-foot">
          <button
            v-if="this.onModalSubmit"
            @click="submitModal"
            class="button is-success"
          >
            Сохранить
          </button>
          <button @click="close" class="button is-primary">Отмена</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    onModalSubmit: {
      type: Function,
      required: false,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    submitModal() {
      this.onModalSubmit({
        onSuccess: this.close,
      });
    },
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
  },
};
</script>
