<template>
  <div class="section section-margin-top">
    <div class="container">
      <h2>Создание публикации</h2>
      <form>
        <div class="field">
          <label class="label text-primary">Заголовок</label>
          <div class="control">
            <input
              v-model="form.title"
              class="input"
              type="text"
              placeholder="Пример нашей работы..."
            />
            <div v-if="v$.form.title.$error" class="form-error">
              <div
                v-if="v$.form.title.required.$invalid"
                class="help is-danger"
              >
                Пожалуйста, укажите заголовок
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label text-primary">Описание</label>
          <div class="control">
            <textarea
              v-model="form.description"
              class="textarea"
              placeholder=""
            >
            </textarea>
            <div v-if="v$.form.description.$error" class="form-error">
              <div
                v-if="v$.form.description.required.$invalid"
                class="help is-danger"
              >
                Пожалуйста, укажите описание
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label text-primary">Заглавное фото</label>
          <div
            class="file has-name"
            title="Названия для всех файлов на сайте должны быть не дублирующиеся"
          >
            <label class="file-label">
              <input
                @change="handleMainUpload"
                class="file-input"
                type="file"
                name="resumemain"
              />
              <span class="file-cta">
                <span class="file-icon">
                  <font-awesome-icon icon="upload" />
                </span>
                <span class="file-label"> Выберите файл...</span>
              </span>
            </label>
          </div>
          <div v-if="v$.form.image.$error" class="form-error">
            <div v-if="v$.form.image.required.$invalid" class="help is-danger">
              Пожалуйста, загрузите заглавное фото
            </div>
          </div>
          <img v-if="form.image" class="image-preview" :src="form.image" />
        </div>
        <div class="field">
          <label class="label text-primary">Фото</label>
          <div
            class="file has-name"
            title="Названия для всех файлов на сайте должны быть не дублирующиеся"
          >
            <label class="file-label">
              <input
                @change="handleUpload"
                class="file-input"
                type="file"
                name="resume"
                multiple
              />
              <span class="file-cta">
                <span class="file-icon">
                  <font-awesome-icon icon="upload" />
                </span>
                <span class="file-label"> Выберите файл...</span>
              </span>
            </label>
          </div>
          <span v-for="image in form.images" :key="image">
            <img v-if="image" class="image-preview" :src="image" />
          </span>
          <progress class="progress" :value="progress" max="100">
            {{ progress }}%
          </progress>
        </div>
        <div class="field">
          <label class="label text-primary">Стоимость</label>
          <div class="control">
            <input
              v-model="form.price"
              class="input"
              type="number"
              placeholder="0"
            />
          </div>
        </div>
        <div class="field">
          <label class="label text-primary">Страна</label>
          <div class="control">
            <input
              v-model="form.country"
              class="input"
              type="text"
              placeholder="Россия"
            />
            <div v-if="v$.form.country.$error" class="form-error">
              <div
                v-if="v$.form.country.required.$invalid"
                class="help is-danger"
              >
                Пожалуйста, укажите страну
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label text-primary">Населённый пункт</label>
          <div class="control">
            <input
              v-model="form.city"
              class="input"
              type="text"
              placeholder="Тольятти"
            />
            <div v-if="v$.form.city.$error" class="form-error">
              <div v-if="v$.form.city.required.$invalid" class="help is-danger">
                Пожалуйста, укажите населённый пункт
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label text-primary">Дата</label>
          <div class="control">
            <input v-model="form.createdAt" class="input" type="date" />
          </div>
        </div>
        <div class="field">
          <label class="label text-primary">Теги</label>
          <div class="control">
            <input
              @input="handleTags"
              class="input"
              type="text"
              placeholder="Кухня"
              title="Тег добавится после ввода запятой"
            />
            <div
              v-for="tag in form.tags"
              :key="tag"
              class="tag is-secondary is-medium"
            >
              {{ tag }}
            </div>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button type="button" @click="createPost" class="button is-success">
              Создать
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const setupInitialData = () => ({
  title: "",
  description: "",
  image: "",
  images: [],
  price: null,
  country: "Россия",
  city: "Тольятти",
  createdAt: new Date().toJSON().slice(0, 10),
  tags: [],
});

export default {
  data() {
    return {
      form: setupInitialData(),
      progress: 0,
    };
  },
  validations() {
    return {
      form: {
        title: { required },
        description: { required },
        image: { required },
        country: { required },
        city: { required },
      },
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  methods: {
    async createPost() {
      const isValid = await this.v$.$validate();
      if (isValid) {
        this.v$.$reset();
        this.$store.dispatch("post/createPost", {
          data: this.form,
          onSuccess: () => {
            this.form = setupInitialData();
          },
        });
      }
    },
    handleTags(event) {
      const { value } = event.target;

      if (value && value.trim().length > 1 && value.substr(-1) === ",") {
        const _value = value.split(",")[0].trim();
        if (!this.form.tags.includes(_value)) {
          this.form.tags.push(_value);
        }
        event.target.value = "";
      }
    },
    handleUpload(e) {
      const self = this;
      const files = e.target.files;

      for (let i = 0; i < files.length; i++) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(files[i]);

        reader.onload = function () {
          self.$store.dispatch("post/uploadImage", {
            bytes: reader.result,
            name: files[i].name,
            onSuccess: (url) => {
              self.form.images.push(url);
            },
            onProgress: (progress) => {
              self.progress = progress;
            },
          });
        };
      }
    },
    handleMainUpload(e) {
      const self = this;
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = function () {
        self.$store.dispatch("post/uploadImage", {
          bytes: reader.result,
          name: file.name,
          onSuccess: (url) => {
            self.form.image = url;
          },
          onProgress: (progress) => {
            self.progress = progress;
          },
        });
      };
    },
  },
};
</script>

<style scoped>
.form-container {
  max-width: 960px;
  margin: 0 auto;
  margin-top: 40px;
}
.tag {
  background-color: #4d6150;
  color: #ffffff;
  margin: 3px;
}

.image-preview {
  height: 200px;
  margin: 30px;
}

.progress {
  margin-top: 15px;
}
</style>
