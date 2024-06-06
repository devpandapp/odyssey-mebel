<template>
  <div class="search-lookup-wrap">
    <div class="search-lookup centered">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <input
              @input="handleSearch"
              type="text"
              class="input is-small"
              placeholder="Введите текст для поиска..."
            />
          </div>
          <!-- <div class="level-item">
            <span v-if="searchedValue">Поиск "{{ searchedValue }}"</span>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    onSearch: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      searchedValue: "",
    };
  },
  methods: {
    handleSearch(e) {
      const { value } = e.target;
      this.searchedValue = value;
      this.onSearch(value);
    },
  },
};
</script>

<style scoped lang="scss">
.search-lookup-wrap {
  margin-top: 24px;
  margin-left: 112px;
  position: absolute;
  z-index: 2;
}

@media only screen and (min-width: 769px) {
  .search-lookup-wrap {
    margin-top: 56px;
    margin-left: 612px;
    position: absolute;
    z-index: 2;
  }
}
</style>
