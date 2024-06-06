<template>
  <div>
    <n-s-searchbar :onSearch="filterPosts" />
    <n-s-posts :posts="posts" />
    <n-s-pagination
      :onNextPage="getMorePosts"
      :isFetching="isFetchingMoreData"
      :page="currentPage"
    />
  </div>
</template>

<script>
import NSSearchbar from "../components/SearchBar.vue";
import NSPosts from "../components/Posts.vue";
import NSPagination from "../components/Pagination.vue";

export default {
  components: {
    NSPosts,
    NSPagination,
    NSSearchbar,
  },
  data() {
    return {
      searchedPostTitle: "",
    };
  },
  computed: {
    posts() {
      return this.$store.getters["post/filterPosts"](this.searchedPostTitle);
    },
    isFetchingMoreData() {
      return this.$store.state.post.pagination.isFetchingData;
    },
    currentPage() {
      return this.$store.getters["post/currentPage"];
    },
  },
  created() {
    this.$store.dispatch("post/getPosts");
  },
  methods: {
    getMorePosts({ page }) {
      this.$store.dispatch("post/getMorePosts", { page });
    },
    filterPosts(searchValue) {
      this.searchedPostTitle = searchValue;
    },
  },
};
</script>

<style scoped>
.counter-container {
  padding: 200px;
  font-size: 60px;
}
</style>
