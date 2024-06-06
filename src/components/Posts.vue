<template>
  <section class="posts section-margin-top">
    <div class="container">
      <div class="posts-type level" id="works">
        <div class="level">
          <div class="level-item">
            <span class="text-link">Наши работы &nbsp;</span>
            <button class="button is-primary is-small" v-if="isAuthenticated">
              <a href="/posts/new">
                <span class="has-text-white"
                  ><font-awesome-icon icon="plus" />&nbsp;Добавить</span
                >
              </a></button
            >&nbsp;
          </div>
        </div>
      </div>
      <div class="columns is-multiline">
        <div
          v-for="post in posts"
          :key="post.id"
          class="column is-12-mobile is-6-tablet is-3-widescreen is-6-desktop"
        >
          <div class="item post-card bottom-border">
            <router-link
              :to="{ name: 'PostDetails', params: { slug: post.slug } }"
              class="item-link"
            >
              <figure
                class="is-flex is-align-items-center is-justify-content-center image"
              >
                <img :src="post.image" class="post-image" />
              </figure>
              <h2 class="title item-title is-size-4 has-text-weight-extra-bold">
                <a class="item-link">{{ post.title }}</a>
              </h2>
            </router-link>
            <div class="item-tags">
              <a
                v-for="tag in post.tags"
                :key="tag"
                class="button is-rounded is-small is-secondary item-tag"
                href="#"
              >
                #{{ tag }}
              </a>
            </div>
            <div class="level">
              <div class="level-right">
                {{
                  post.createdAt.toDate().toLocaleDateString("ru-RU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import useAuth from "../composition/useAuth";

export default {
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  setup() {
    return useAuth();
  },
};
</script>

<style scoped lang="scss">
.posts {
  padding-top: 45px;
}

.posts-type {
  font-size: 34px;
  margin-bottom: 10px;
}

.exchange-icon {
  color: #ffbc8c;
  height: 25px;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.post-image {
  height: 213px;
}
</style>
