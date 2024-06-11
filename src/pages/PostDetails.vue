<template>
  <div v-if="post && post.slug" class="page-wrapper page-wrapper-margin-top">
    <section class="hero is-secondary">
      <div class="hero-body">
        <div class="container has-text-white">
          <h3 class="title has-text-white">
            {{ post.title }}
          </h3>
          <div class="user-tile">
            <div class="user-tile-author center">
              <div class="user-tile-author-name">
                {{ post.country }}, {{ post.city }}<br />
                {{
                  post.createdAt.toDate().toLocaleDateString("ru-RU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                }}<br /><br />
                <span class="pre-description">{{ post.description }}</span>
              </div>
              <span v-if="isAuthenticated"><br /><br /></span>
              <button
                class="button is-block is-danger is-fullwidth mt-1"
                v-if="isAuthenticated"
                @click="deletePost(post.id)"
              >
                <font-awesome-icon icon="trash" />&nbsp;Удалить публикацию
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-2">
            <a v-if="post.image" href="#"
              ><img v-once :src="post.image" @click="open(-1)"
            /></a>
            <modal :image="post.image" ref="modalmain" />
          </div>
          <div
            v-for="(image, index) in post.images"
            :key="image"
            class="column is-2"
          >
            <a v-if="image" href="#"
              ><img :src="image" @click="open(index)"
            /></a>
            <modal :image="image" ref="modal" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import useAuth from "../composition/useAuth";
import { db } from "../db";
import { doc, deleteDoc } from "firebase/firestore";
import Modal from "../components/ImageModal.vue";
export default {
  components: {
    Modal,
  },
  created() {
    const { slug } = this.$route.params;
    this.$store.dispatch("post/getPostBySlug", slug);
  },
  computed: {
    post() {
      return this.$store.state.post.item;
    },
    modal() {
      return this.$refs.modal;
    },
    modalmain() {
      return this.$refs.modalmain;
    },
  },
  setup() {
    return useAuth();
  },
  methods: {
    deletePost(post) {
      if (confirm("Вы уверены, что хотите удалить данную публикацию?")) {
        deleteDoc(doc(db, "posts", post));
        this.$router.push("/");
      }
    },
    open(index) {
      if (index === -1) {
        this.modalmain.open();
      } else {
        this.modal[index].open();
      }
    },
  },
};
</script>

<style scoped lang="scss">
// CARD
.card {
  z-index: 9999;
  min-width: 330px;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0 0 1px 1px rgba(20, 23, 28, 0.1),
    0 3px 1px 0 rgba(20, 23, 28, 0.1);

  .product-features {
    font-size: 17px;
  }
  .main-price {
    font-size: 17px;
    color: #7d7d7d;
    text-decoration: line-through;
  }
}
// CARD
// WHOLE HEADER
.hero-body {
  padding: 3rem 1.5rem;
  position: relative;
}
.hero-img {
  opacity: 0.8;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  filter: sepia(0.1) grayscale(0.1) saturate(0.8);
}
.pre-description {
  white-space: pre-wrap;
}
.image-view {
  margin: 30px;
}
.column-right {
  position: absolute;
}
@media screen and (max-width: 770px) {
  .column-right {
    position: inherit;
  }
}
.user-avatar {
  display: inline-block;
}
.title {
  font-weight: bold;
}
.subtitle {
  /*font-weight: bold;*/
  font-size: 25px;
}
.author-name {
  font-size: 20px;
  font-weight: bold;
}
.rate {
  font-size: 29px;
  font-style: italic;
}
// WHOLE HEADER END
.more-details {
  background-color: #f9f9f9;
  border: 1px solid #dedfe0;
  padding: 10px 15px;
  &-title {
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  &-items {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  &-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 19px;
    width: 45%;
  }
}
.product-description {
  padding-top: 0;
  &-title {
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  &-details {
    font-size: 18px;
    ul {
      list-style: disc;
      margin-left: 20px;
    }
    ol {
      margin-left: 20px;
    }
    strong {
      font-size: 20px;
    }
    p {
      min-height: 30px;
    }
  }
}
// USERS
.user-tile {
  display: flex;
  &-author {
    align-self: center;
    margin-left: 10px;
    &-name {
      font-size: 17px;
    }
  }
  .date {
    font-size: 14px;
  }
}
</style>
