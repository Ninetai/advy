<template>
  <div class="overlay overlay_create">
    <div class="popup popup_success hidden">
      <div class="create__image create__image_success">
        <svg class="create__picture create__picture_success" viewBox="0 0 33 32" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M15.1307 6.59227C14.864 7.94301 14.416 9.96977 12.7759 11.6099C12.6266 11.7592 12.4625 11.9165 12.2892 12.0845C10.7665 13.5526 8.49968 15.7394 8.49968 19.3342C8.49968 21.285 9.33972 23.1344 10.6345 24.5012C11.9372 25.8759 13.6053 26.6679 15.1667 26.6679H21.8337C22.303 26.6679 22.695 26.5479 22.9271 26.3919C23.1204 26.2639 23.1671 26.1519 23.1671 26.0012C23.1671 25.8519 23.1204 25.7385 22.9271 25.6105C22.695 25.4559 22.303 25.3345 21.8337 25.3345H20.5003C20.1466 25.3345 19.8075 25.194 19.5574 24.944C19.3074 24.6939 19.1669 24.3548 19.1669 24.0011C19.1669 23.6475 19.3074 23.3083 19.5574 23.0583C19.8075 22.8082 20.1466 22.6677 20.5003 22.6677H22.5004C22.9697 22.6677 23.3617 22.5477 23.5938 22.3917C23.7871 22.2637 23.8338 22.1517 23.8338 22.001C23.8338 21.8517 23.7871 21.7383 23.5938 21.6103C23.3617 21.4557 22.9697 21.3343 22.5004 21.3343H21.167C20.8133 21.3343 20.4742 21.1938 20.2241 20.9438C19.9741 20.6937 19.8336 20.3546 19.8336 20.0009C19.8336 19.6473 19.9741 19.3081 20.2241 19.0581C20.4742 18.808 20.8133 18.6675 21.167 18.6675H23.1671C23.6364 18.6675 24.0284 18.5475 24.2605 18.3915C24.4538 18.2635 24.5005 18.1515 24.5005 18.0008C24.5005 17.8515 24.4538 17.7382 24.2605 17.6101C24.0284 17.4555 23.6364 17.3341 23.1671 17.3341H21.8337C21.48 17.3341 21.1409 17.1936 20.8908 16.9436C20.6408 16.6935 20.5003 16.3544 20.5003 16.0007C20.5003 15.6471 20.6408 15.3079 20.8908 15.0579C21.1409 14.8078 21.48 14.6673 21.8337 14.6673H23.1671C23.6364 14.6673 24.0284 14.5473 24.2605 14.3913C24.4538 14.2633 24.5005 14.1513 24.5005 14.0006C24.5005 13.8513 24.4538 13.738 24.2605 13.61C24.0284 13.4553 23.6364 13.3339 23.1671 13.3339H17.1668C16.9548 13.334 16.7458 13.2835 16.5572 13.1866C16.3687 13.0898 16.2059 12.9494 16.0824 12.777C15.959 12.6047 15.8784 12.4054 15.8474 12.1957C15.8164 11.986 15.8358 11.7719 15.904 11.5712V11.5698L15.9094 11.5565L15.9267 11.5032L15.9974 11.2765C16.0561 11.0765 16.1374 10.7871 16.2214 10.4391C16.4242 9.6235 16.5483 8.79032 16.5921 7.95101C16.6267 7.03763 16.5054 6.33759 16.2614 5.91091C16.1174 5.65756 15.9 5.42955 15.3947 5.35755C15.3307 5.57622 15.272 5.87491 15.1867 6.31226L15.1307 6.59227ZM18.9042 10.6671C19.0669 9.9231 19.2215 8.99639 19.2575 8.04968C19.2975 6.96296 19.1909 5.66289 18.5775 4.58951C17.8975 3.39478 16.6947 2.66675 15.0333 2.66675C14.524 2.66675 14.0466 2.83476 13.6599 3.17344C13.3093 3.48012 13.1092 3.86147 12.9852 4.16815C12.7879 4.65751 12.6652 5.29221 12.5625 5.82824L12.5145 6.07492C12.2559 7.39098 11.9172 8.69771 10.8905 9.72443C10.7731 9.84177 10.6305 9.97777 10.4678 10.1311C8.97037 11.5498 5.83289 14.5247 5.83289 19.3342C5.83289 22.0504 6.99294 24.5345 8.69836 26.3346C10.3958 28.1267 12.7279 29.3347 15.1667 29.3347H21.8337C22.6977 29.3347 23.6391 29.1214 24.4071 28.6107C25.2138 28.072 25.8339 27.1839 25.8339 26.0012C25.8339 25.3759 25.6605 24.8345 25.3805 24.3811C26.0325 23.8344 26.5006 23.0304 26.5006 22.001C26.5006 21.3757 26.3272 20.833 26.0472 20.3823C26.6992 19.8356 27.1673 19.0302 27.1673 18.0008C27.1673 17.1888 26.8766 16.5168 26.4326 16.0007C26.8752 15.4847 27.1673 14.8127 27.1673 14.0006C27.1673 12.8166 26.5472 11.9299 25.7405 11.3912C24.9725 10.8792 24.0311 10.6671 23.1671 10.6671H18.9042Z"/>
        </svg>
      </div>
      <h3 class="form__title form__title_popup form__title_success"><translate>?????????????? ?????????????? ????????????</translate></h3>
      <button class="form__button" type="button"><translate>??????????????</translate></button>
    </div>

    <!-- Create new ADS window -->
    <div class="popup popup_accaunt">
      <h3 class="form__title form__title_popup form__title_acc"><translate>?????????? ??????????????</translate></h3>
      <form @submit.prevent="createAccount" action="#" class="form-document add-account-section">
        <div class="form-document__field">
          <input v-model="form.name" type="text"
                 @blur="validate(['name'])"
                 class="form__field form__field_acc"
                 :placeholder="$gettext('Account name')" required>
          <div v-if="formError.name" class="form__error">{{ formError.name }}</div>
        </div>
        <div class="form-document__field">
          <input v-model="form.office" type="text"
                 @blur="validate(['office'])"
                 class="form__field form__field_acc"
                 :placeholder="$gettext('Head office address')" required>
          <div v-if="formError.office" class="form__error">{{ formError.office }}</div>
        </div>
        <div class="form-document__field">
          <input v-model="form.phone" type="text"
                 @blur="validate(['phone'])"
                 class="form__field form__field_acc"
                 :placeholder="$gettext('Phone number')" required>
          <div v-if="formError.phone" class="form__error">{{ formError.phone }}</div>
        </div>
        <div class="form-document__field">
          <input v-model="form.website" type="text"
                 @blur="validate(['website'])"
                 class="form__field form__field_acc"
                 :placeholder="$gettext('Website address')" required>
          <div v-if="formError.website" class="form__error">{{ formError.website }}</div>
        </div>
        <div class="form-document__field">
          <input v-model="form.unp" type="text"
                 @blur="validate(['unp'])"
                 class="form__field form__field_acc"
                 :placeholder="$gettext('UNP')" required>
          <div v-if="formError.unp" class="form__error">{{ formError.unp }}</div>
        </div>

        <button class="form__button form__button_acc"
                type="submit">
          <translate>????????????????</translate>
        </button>
        <button @click.prevent="$emit('close-popup', false)"
                class="ui-button outline blue form__button form__button_cancel form__button_account"
                type="button">
          <translate>????????????</translate>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: 'NewAccountPopup',
  data() {
    return {
      form: {
        name: '',
        office: '',
        phone: '',
        website: '',
        unp: '',
      },
      formError: {
        name: null,
        office: null,
        phone: null,
        website: null,
        unp: null,
      }
    }
  },
  methods: {
    ...mapActions(['postUsersAccount']),
    validate(field) {
      this.formError[field] = this.form[field] ? null : this.$gettext('?????????????????? ????????');
    },
    createAccount() {
      for (let key in this.formError) {
        this.validate(key);
      }
      if (this.hasFormErrors) {
        return;
      }
      const data = {
        name: this.form.name,
        head_office_address: this.form.office,
        phone: this.form.phone,
        website: this.form.website,
        unp: this.form.unp,
      }

      this.postUsersAccount(data).then(() => this.$emit('close-popup', true));
    },
  },
  computed: {
    ...mapState(['accountsList']),
    hasFormErrors() {
      return this.formError.name !== null
          || this.formError.office !== null
          || this.formError.phone !== null
          || this.formError.website !== null
          || this.formError.unp !== null;
    },
  }
}
</script>

<style scoped>
.form-document__field {
  position: relative;
}

.form__field {
  width: 100%;
}

.form__error {
  position: absolute;
  bottom: 4px;
  left: 16px;
  color: red;
}
</style>
