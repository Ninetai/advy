<template>
  <div class="form form_auth">
    <h3 class="form__title"><translate>Авторизация</translate></h3>
    <form @submit.prevent="submitAuth" action="#" class="form-document login-form">
      <span class="email-error">{{ formError.email }}</span>
      <input v-model="form.email" type="email"
             class="form__field form__field_auth login-email" :placeholder="$gettext('Email')" required>
      <span class="password-error" style="color: red">{{ formError.password }}</span>
      <input v-model="form.password" type="password"
             class="form__field form__field_auth login-password" :placeholder="$gettext('Пароль')" required>
      <p class="form__text"><translate>Язык интерфейса</translate></p>
      <select v-model="form.lang" class="select">
        <option :value="code" v-for="(name, code) in AVAILABLE_LANGUAGES" :key="code">{{name}}</option>
      </select>
      <button class="form__button" type="submit"><span class="form__arr"><translate>Войти</translate></span></button>
    </form>

    <div class="form__info login-form__actions">
      <span @click="$emit('change-scene', 'recovery')" class="form__link form__link_register"><translate>Забыли пароль?</translate></span>
      <span @click="$emit('change-scene', 'register')" class="form__link form__link_register"><translate>Регистрация</translate></span>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import { AVAILABLE_LANGUAGES, setLanguage, getLanguage } from "@/services/locale.service";

export default {
  name: 'AuthForm',
  data() {
    return {
      AVAILABLE_LANGUAGES: AVAILABLE_LANGUAGES,
      form: {
        email: '',
        password: '',
        lang: getLanguage(),
      },
      formError: {
        email: null,
        password: null,
        lang: null,
      }
    }
  },
  methods: {
    ...mapActions(['postClientLogin']),
    submitAuth() {
      this.postClientLogin({
        email: this.form.email,
        password: this.form.password,
      })
          .then((response) => {
            /*const {user, token} = response.data;
            const lastLogin = Date.now().toString();

            localStorage.setItem('userId', user);
            localStorage.setItem('accessToken', token.access);
            localStorage.setItem('lastLogin', lastLogin);*/

            setLanguage(this.form.lang);

            this.$router.push({
              name: 'manager',
            });
          })
          .catch(err => {
            if (err.response) {
              if (
                (err.response.data.detail === 'Password is not valid') ||
                (err.response.data.detail === 'Password is not valid')
              ) {
                this.formError.password = this.$gettext("Invalid Password!");
              } else if (
                (err.response.data.detail === 'Not found.') ||
                (err.response.data.detail === 'Страница не найдена.')
              ) {
                this.formError.email = this.$gettext("Email not found!");
              }
            } else if (err.request) {
              console.log(err.request);
            } else {
              console.log(err.message);
            }
          })
    }
  },
  watch: {
    'form.lang': function(val) {
      if (val != getLanguage()) {
        setLanguage(val);
        window.location.reload()
      }
    }
  } 
}
</script>

<style scoped lang="scss">
.login-form__actions {
  display: flex;
  flex-direction: column;
  align-items: center;

  .form__link + .form__link {
    margin-top: 1rem;
  }
}
</style>
