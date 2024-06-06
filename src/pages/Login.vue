<template>
  <div class="page-wrapper page-wrapper-margin-top">
    <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">
        <h3 class="title has-text-grey">Авторизация</h3>
        <p class="subtitle has-text-grey">
          Пожалуйста, войдите, чтобы продолжить.
        </p>
        <div class="box">
          <form>
            <div class="field">
              <div class="control has-icons-left">
                <input
                  v-model="form.email"
                  class="input"
                  type="email"
                  placeholder="Адрес электронной почты"
                  autofocus=""
                  autocomplete="email"
                />
                <span class="icon is-small is-left"> &#64; </span>
                <div v-if="v$.form.email.$error" class="form-error">
                  <div
                    v-if="v$.form.email.required.$invalid"
                    class="help is-danger"
                  >
                    Пожалуйста, укажите адрес электронной почты
                  </div>
                  <div v-if="v$.form.email.$validate" class="help is-danger">
                    Пожалуйста, укажите адрес электронной почты в правильном
                    формате
                  </div>
                </div>
              </div>
            </div>
            <div class="field">
              <div class="control has-icons-left">
                <input
                  v-model="form.password"
                  class="input"
                  type="password"
                  placeholder="Пароль"
                  autocomplete="current-password"
                />
                <span class="icon is-small is-left"> &#9919; </span>
                <div v-if="v$.form.password.$error" class="form-error">
                  <div
                    v-if="v$.form.password.required.$invalid"
                    class="help is-danger"
                  >
                    Пожалуйста, укажите пароль
                  </div>
                </div>
              </div>
            </div>
            <button
              @click="login"
              :disabled="isProcessing"
              type="button"
              class="button is-block is-primary is-fullwidth"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useAuth from "../composition/useAuth";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  validations() {
    return {
      form: {
        email: { required, email },
        password: { required },
      },
    };
  },
  setup() {
    return {
      ...useAuth(),
      v$: useVuelidate(),
    };
  },
  watch: {
    isAuthenticated(isAuth) {
      if (isAuth) {
        this.$router.push("/");
      }
    },
  },
  methods: {
    async login() {
      const isValid = await this.v$.$validate();
      if (isValid) {
        this.$store.dispatch("user/login", this.form);
      }
    },
  },
};
</script>

<style scoped>
.hero.is-success {
  background: #f2f6fa;
}
.hero .nav,
.hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.box {
  margin-top: 1rem;
}
.avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}
.avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
input {
  font-weight: 300;
}
p {
  font-weight: 700;
}
p.subtitle {
  padding-top: 1rem;
}
</style>
