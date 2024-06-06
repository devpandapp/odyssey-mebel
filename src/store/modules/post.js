import { db } from "../../db";
import {
  getDocs,
  getDoc,
  doc,
  addDoc,
  query,
  where,
  limit,
  startAfter,
  startAt,
  collection,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import slugify from "slugify";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import router from "../../router";

const initPagination = () => ({
  itemCount: 8,
  lastItem: null,
  paginationHistory: [],
  isFetchingData: false,
});

export default {
  namespaced: true,
  state() {
    return {
      items: [],
      item: {},
      pagination: initPagination(),
    };
  },
  getters: {
    currentPage(state) {
      if (!state.pagination.paginationHistory) {
        return 1;
      }

      return state.pagination.paginationHistory.length;
    },
    filterPosts: (state) => (searchedTitle) => {
      const { items } = state;

      if (!searchedTitle) {
        return items;
      }

      const filteredPosts = items.filter((item) => {
        return (
          (item.title &&
            item.title.toLowerCase().includes(searchedTitle.toLowerCase())) ||
          (item.description &&
            item.description
              .toLowerCase()
              .includes(searchedTitle.toLowerCase())) ||
          (item.tags &&
            item.tags
              .toString()
              .toLowerCase()
              .includes(searchedTitle.toLowerCase()))
        );
      });

      return filteredPosts;
    },
  },
  actions: {
    // context -> state, commit
    async getPostBySlug({ commit }, slug) {
      commit("setPost", {});
      const docQuery = query(
        collection(db, "posts"),
        where("slug", "==", slug)
      );

      const querySnap = await getDocs(docQuery);
      if (!querySnap.docs.length) return router.push("/404");
      const post = querySnap.docs[0].data();
      post.id = querySnap.docs[0].id;

      const userSnap = await getDoc(post.user);
      post.user = userSnap.data();
      post.user.id = userSnap.id;
      commit("setPost", post);
    },
    async getMorePosts({ commit, state }, { page }) {
      let queryData;

      if (state.pagination.isFetchingData) {
        return;
      }
      commit("setIsFetchingData", true);

      if (page === "next") {
        queryData = query(
          collection(db, "posts"),
          orderBy("createdAt", "desc"),
          startAfter(state.pagination.lastItem),
          limit(state.pagination.itemCount)
        );
      } else {
        const lastItemIndex = state.pagination.paginationHistory.length - 1;
        const previousItem =
          state.pagination.paginationHistory[lastItemIndex - 1];

        if (!previousItem) {
          commit("setIsFetchingData", false);
          return;
        }

        state.pagination.paginationHistory.splice(lastItemIndex, 1);
        queryData = query(
          collection(db, "posts"),
          orderBy("createdAt", "desc"),
          startAt(previousItem),
          limit(state.pagination.itemCount)
        );
      }

      const snapshot = await getDocs(queryData);
      commit("setIsFetchingData", false);
      if (snapshot.docs.length === 0) {
        return;
      }

      const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      commit("setPosts", posts);
      commit("setLastItem", snapshot.docs[snapshot.docs.length - 1]);

      if (page === "next") {
        commit("setPaginationHistory", snapshot.docs[0]);
      }
    },
    async getPosts({ commit, state }) {
      commit("resetPagination");

      const postQuery = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc"),
        limit(state.pagination.itemCount)
      );
      const snapshot = await getDocs(postQuery);
      const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      commit("setPosts", posts);
      commit("setLastItem", snapshot.docs[snapshot.docs.length - 1]);
      commit("setPaginationHistory", snapshot.docs[0]);
    },
    async createPost({ rootState, dispatch }, { data, onSuccess }) {
      const userRef = doc(db, "users", rootState.user.data.id);

      if (data.posts) {
        delete data.posts;
      }

      data.user = userRef;
      data.slug = slugify(`${data.title} ${Date.now()}`, {
        lower: true,
        strict: true,
      });
      data.createdAt = Timestamp.fromDate(new Date(data.createdAt));

      await addDoc(collection(db, "posts"), data);

      dispatch("toast/success", "Публикация успешно создана!", { root: true });
      onSuccess();
    },
    async uploadImage(_, { bytes, name, onSuccess, onProgress }) {
      const storage = getStorage();
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, bytes);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress(progress);
        },
        (error) => {
          console.error(error.message);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          onSuccess(downloadUrl);
        }
      );
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.items = posts;
    },
    setPost(state, post) {
      state.item = post;
    },
    setLastItem(state, item) {
      state.pagination.lastItem = item;
    },
    setPaginationHistory(state, item) {
      state.pagination.paginationHistory.push(item);
    },
    setIsFetchingData(state, isFetching) {
      state.pagination.isFetchingData = isFetching;
    },
    resetPagination(state) {
      state.pagination = initPagination();
    },
  },
};
