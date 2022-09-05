<template>
  <div class="overlay overlay_auth" :key="scene">
    <!-- First window access recovery -->
    <div v-if="scene === 'email'" class="popup popup_index email">
      <h3 class="form__title form__title_popup"><translate>Восстановление доступа</translate></h3>
      <p class="form__paragraph form__paragraph_popup"><translate>Введите email, указанный при регистрации. На него мы вышлем
        инструкцию для восстановление доступа</translate></p>
      <form @submit.prevent="submitEmail()" action="#" class="form-document password-reset">
        <span class="email-error" style="color:red">{{ emailError }}</span>
        <input v-model="email" type="email"
               class="form__field form__field_recovery form__field_auth password-reset-email"
               :placeholder="$gettext('Email')" required>
        <button class="form__button" type="submit"><translate>Подтвердить</translate></button>
      </form>
      <div class="form__info form__info_register">
        <a href="#" @click.prevent="$emit('return-auth', 'auth')"
           class="form__link form__link_register"><translate>Войти</translate></a>
      </div>
    </div>

    <!-- Second window access recovery -->
    <div v-if="scene === 'confirmation'" class="popup popup_index confirmation-message">
      <h3 class="form__title form__title_popup"><translate>Восстановление доступа</translate></h3>
      <p class="form__paragraph form__paragraph_popup form__paragraph_recovery"><translate>Проверьте почту и следуйте инструкции
        из письма</translate></p>
      <button @click.prevent="$emit('return-auth', 'auth')" class="form__button" type="submit">OK</button>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'EmailRecoveryPopup',
  data() {
    return {
      scene: 'email', // 'email' | 'confirmation' | 'error'
      email: '',
      emailError: null,
    }
  },
  methods: {
    ...mapActions(['putPasswordReset']),
    submitEmail() {
      if (!this.email) {
        return;
      }

      this.putPasswordReset({
        email: this.email
      })
          .then(() => this.scene = 'confirmation')
          .catch(err => {
            if (err.response) {
              console.log(err.response.data);
              if (err.response.data.detail === 'Not found.') {
                this.emailError = $gettext('Email not found!');
              }
            } else if (err.request) {
              console.log(err.request.data);
            } else {
              console.log(err.message);
            }
          })
    }
  }
}
</script>

<style scoped></style>
