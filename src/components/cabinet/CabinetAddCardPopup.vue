<template>
  <div class="overlay overlay_create" :key="scene">
    <div v-if="scene === 'init'" class="popup popup_card">
      <h3 class="form__title form__title_popup form__title_new-card"><translate>Добавление новой карты</translate></h3>
      <form @submit.prevent="addCard" class="form-document">
        <input v-model="form.number" v-mask="'#### #### #### ####'"
               type="text" class="form__field form__field_acc add-card-number"
               :placeholder="$gettext('Номер карты')" required>
        <div class="form-document__inner form-document__inner_card">
          <input v-model="form.name" type="text" class="form__field form__field_acc form__field_card"
                 :placeholder="$gettext('Имя владельца')" required>
          <span class="add-cabinet-date-error"></span>
          <input v-model="form.date" v-mask="'##/##'"
                 type="text" class="form__field form__field_acc form__field_date-use"
                 :placeholder="$gettext('MM/YY')" required>
          <div v-if="formError.date" style="color: red" class="add-card-date-error">{{ formError.date }}</div>
          <input v-model="form.cvc" v-mask="'###'"
                 type="text" class="form__field form__field_acc form__field_cvc"
                 :placeholder="$gettext('CVC')" required>
        </div>
        <div class="form-document__inner">
          <button @click.prevent="$emit('close-popup')"
                  class="ui-button outline blue form__button form__button_cancel form__button_account" type="button">
            <translate>Отмена</translate>
          </button>
          <button class="form__button" type="submit">
            <translate>Добавить</translate>
          </button>
        </div>
      </form>
    </div>
    <TheErrorPopup
        v-if="scene === 'error'"
        @repeat-popup="scene = 'init'"
        @cancel-popup="$emit('close-popup')"
    />
    <TheSuccessPopup v-if="scene === 'success'"
                     @close-popup="$emit('close-popup', true)">
      <translate>Карта успешно добавлена</translate>
    </TheSuccessPopup>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import {mask} from 'vue-the-mask';
import TheErrorPopup from '@/components/common/TheErrorPopup'
import TheSuccessPopup from '@/components/common/TheSuccessPopup'

export default {
  name: 'CabinetAddCardPopup',
  components: {
    TheErrorPopup,
    TheSuccessPopup,
  },
  directives: {mask},
  props: ['accountId'],
  data() {
    return {
      scene: 'init',
      form: {
        name: '',
        number: '',
        date: '',
        cvc: '',
      },
      formError: {
        name: null,
        number: null,
        date: null,
        cvc: null,
      }
    };
  },
  methods: {
    ...mapActions(['postCard']),
    addCard() {
      if (!this.accountId) {
        return;
      }
      if (this.form.date.length !== 5) {
        this.formError.date = this.$gettext('Not a correct date format');

        return;
      }

      const cardInfoDate = this.form.date.split('/')
      const params = {
        card_holder_name: this.form.name,
        card_number: this.form.number,
        expiry_year: cardInfoDate[1],
        expiry_month: cardInfoDate[0],
      }

      this.postCard({id: this.accountId, params})
          .then(res => this.scene = res.status === 201 ? 'success' : 'error')
          .catch(err => this.scene = 'error');
    },
  },
}
</script>

<style scoped>

</style>
