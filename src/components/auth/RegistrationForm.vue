<template>
  <div class="form form_register">
    <h3 class="form__title form__title_register"><translate>Регистрация</translate></h3>
    <form @submit.prevent="submitRegistration" action="#" class="form-document register-form">
      <input v-model="form.name" type="text"
             class="form__field form__field_auth"
             :placeholder="$gettext('Ваше имя')" required>
      <span class="email-error">{{ formError.email }}</span>
      <input v-model="form.email" type="email"
             class="form__field form__field_auth"
             :placeholder="$gettext('Email')" required>
      <input v-model="form.phone" type="tel"
             class="form__field form__field_auth"
             :placeholder="$gettext('Номер телефона')" required>
      <span class="password-error">{{ formError.password }}</span>
      <input v-model="form.password" type="password"
             class="form__field form__field_auth"
             :placeholder="$gettext('Придумайте пароль')" required>
      <input v-model="form.confirmPassword" type="password"
             class="form__field form__field_auth"
             :placeholder="$gettext('Повторите пароль')" required>
      <p class="form__text"><translate>Язык интерфейса</translate></p>
      <select class="select select_register">
        <option :value="code" v-for="(name, code) in AVAILABLE_LANGUAGES" :key="code">{{name}}</option>
      </select>
      <label class="form-label">
        <span class="privacy-error">{{ formError.privacyPolicy }}</span>
        <span class="form-label__check-con">
          <input class="form-label__check register-privacy" type="checkbox" v-model="form.privacyPolicy" value="1" required>
          <span class="form-label__marker form-label__marker_rules"></span>
        </span>
        <span class="form-label__name"><translate>Ознакомлен с политикой конфиденциальности и правилами сервиса</translate></span>
      </label>
      <button class="form__button" type="submit"><translate>Зарегистрироваться</translate></button>
    </form>
    <div class="form__info form__info_register">
      <a @click.prevent="$emit('change-scene', 'auth')" href="#"
         class="form__link form__link_register"><translate>Войти</translate></a>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import { AVAILABLE_LANGUAGES, setLanguage } from "@/services/locale.service";

export default {
  name: 'RegistrationForm',
  data() {
    return {
      AVAILABLE_LANGUAGES: AVAILABLE_LANGUAGES,
      form: {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        privacyPolicy: false,
      },
      formError: {
        name: null,
        email: null,
        phone: null,
        password: null,
        confirmPassword: null,
        privacyPolicy: null,
      }
    }
  },
  methods: {
    ...mapActions(['postClientRegister', 'postClientLogin', 'logoutClient']),
    submitRegistration() {
      this.$set(this, 'formError', {
        name: null,
        email: null,
        phone: null,
        password: null,
        confirmPassword: null,
        privacyPolicy: null,
      });

      const {name, email, phone, password, confirmPassword, privacyPolicy} = this.form;

      if (!privacyPolicy) {
        this.formError.privacyPolicy = this.$gettext('You have to agree on the privacy policy');
        // document.querySelector('.privacy-error').style.color = 'red';
        return;
      }

      if (password !== confirmPassword) {
        this.formError.password = this.$gettext('Passwords do not match');
        return;
      }

      this.logoutClient();
      
      this.postClientRegister({
        first_name: name.split(' ')[0],
        last_name: name.split(' ')[1],
        email: email,
        phone: phone,
        password: password,
        confirm_password: confirmPassword,
      })
      .then(() => {
        setLanguage(this.form.lang);

        this.postClientLogin({
          email: email,
          password: password,
        })
        .then(() => this.$router.push({name: 'cabinet'}));

      }).catch(err => {
        console.log(err.message);
        if (err.response) {
          if (err.response.data.password) {
            if (err.response.data.password[0] === 'This password is too short. It must contain at least 8 characters.') {
              // const passwordError = document.querySelector('.password-error-register');
              // passwordError.style = "color: red;";
              this.formError.password = this.$gettext('Password must be at least 8 characters');
            }
            else {
              this.formError.password = err.response.data.password[0]
            }
          } else if (err.response.data.email) {
            if (err.response.data.email[0] === 'user with this email already exists.') {
              // const emailError = document.querySelector('.email-error-register');
              // emailError.style = "color: red;";
              this.formError.email = this.$gettext('user with this email already exists.');
            }
            else {
              this.formError.email = err.response.data.email[0]
            }
          }
        } else if (err.request) {
          console.log(err.request.data);
          if (err.request.data.password) {
            if (err.request.data.password[0] === 'This password is too short. It must contain at least 8 characters.') {
              // const passwordError = document.querySelector('.password-error');
              // passwordError.style = "color: red;";
              this.formError.password = this.$gettext('Password must be atleast 8 characters');
            }
            else {
              this.formError.password = err.request.data.password[0]
            }
          }
        } else {
          console.log(err.message);
        }
      })
    },
  },
}
</script>

<style scoped>
</style>
