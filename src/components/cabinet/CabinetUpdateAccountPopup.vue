<template>
  <div class="overlay overlay_create">
    <div class="popup popup_update_account">
      <h3 class="form__title form__title_popup form__title_acc"><translate>Обновить аккаунт</translate></h3>
      <form @submit.prevent="saveAccountData" action="#" class="form-document ">
        <input v-model="form.userid" type="hidden">
        <input v-model="form.name" type="text" class="form__field form__field_acc"
               :placeholder="$gettext('Account name')" required>
        <input v-model="form.office" type="text" class="form__field form__field_acc"
               :placeholder="$gettext('Head office address')" required>
        <input v-model="form.phone" type="text" class="form__field form__field_acc"
               :placeholder="$gettext('Phone number')" required>
        <input v-model="form.website" type="text" class="form__field form__field_acc"
               :placeholder="$gettext('Website address')" required>
        <input v-model="form.unp" type="text" class="form__field form__field_acc"
               :placeholder="gettext('UNP')" required>

        <button class="form__button form__button_acc" type="submit"><translate>Обновить</translate></button>
        <button @click.prevent="$emit('close-popup', false)"
                class="ui-button outline blue form__button form__button_cancel form__button_account" type="button">
                  <translate>Отмена</translate>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'CabinetUpdateAccountPopup',
  props: ['id'],
  data() {
    return {
      form: {
        section: '',
        userid: '',
        name: '',
        office: '',
        phone: '',
        website: '',
        unp: '',
      }
    }
  },
  created() {
    this.loadAccountData();
  },
  methods: {
    ...mapActions(['getAccountData', 'putUsersAccount']),
    loadAccountData() {
      this.getAccountData(this.id).then(response => {
        let userdata = response.data[1];

        this.form = {
          userid: response.data[0].id,
          name: userdata.name,
          office: userdata.head_office_address,
          phone: userdata.phone,
          website: userdata.website,
          unp: userdata.unp,
        }
      });
    },
    saveAccountData() {
      const reqData = {
        account_id : this.form.userid,
        name: this.form.name,
        head_office_address: this.form.office,
        phone: this.form.phone,
        website: this.form.website,
        unp: this.form.unp,
      };

      this.putUsersAccount(reqData).then(() => this.$emit('close-popup', true));
    }
  }
}
</script>

<style scoped>

</style>
