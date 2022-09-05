<template>
  <div class="overlay overlay_create">
    <div v-if="account && account.users.length > 0"
         class="popup popup_card popup-users account-member-users">
      <h3 class="form__title form__title_popup form__title_users">{{ account.name }}</h3>
      <p class="users-head"><translate>Пользователи</translate></p>
      <div v-for="user in account.users" class="users-block">
        <div class="users-block__user">
          <p class="users-block__name">{{ user.first_name }} {{ user.last_name }}</p>
          <p class="users-block__email">{{ user.email }}</p>
        </div>
        <div class="users-block__status users-block__status_process"><translate>Выслано</translate></div>
        <div class="users-block__icons">
          <!--<div class="users-block__image">
                      <img src="@/assets/icons/refresh-cw.svg" alt="" class="users-block__picture">
                    </div>-->
          <div class="users-block__image">
            <img src="@/assets/icons/trash.svg" alt=""
                 class="users-block__picture"
                 @click="deleteUser(user.id)">
          </div>
        </div>
      </div>
      <p class="users-head"><translate>Добавить пользователя</translate></p>
      <form action="#" class="form-document add-user-form">
        <div class="form-document__inner form-document__inner_card form-document__inner_users">
          <span v-show="formError.email" class="add-user-email-error" style="color: red">{{ formError.email }}</span>
          <input v-model="form.email" type="email"
                 class="form__field form__field_acc form__field_users add-user-email" style="width:100%;"
                 :placeholder="$gettext('Email')" required>
          <button @click.prevent="addUser" type="submit" class="users-button"><translate>Пригласить</translate></button>
        </div>
        <div class="form-document__inner">
          <button @click.prevent="$emit('close-popup')"
                  class="ui-button outline blue form__button form__button_cancel form__button_account" type="button">
            <translate>Назад</translate>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {buildGetParams} from "@/functions/buildGetParams";

export default {
  name: 'CabinetUsersPopup',
  props: ['account'],
  data() {
    return {
      form: {
        email: '',
      },
      formError: {
        email: null,
      },
    }
  },
  methods: {
    ...mapActions(['putUsersMember', 'deleteUsersMember']),
    addUser() {
      if (!this.form.email) {
        return;
      }

      const data = {
        account_id: this.account.id,
        email: this.form.email,
      }

      this.putUsersMember(data).then(res => {
        if (!!res) {
          // @todo add reload account info
          // this.
        }
      }).catch(err => {
        if (err.response) {
          if (err.response.data.detail) {
            this.formError.email = err.response.data.detail;
          }
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log(err.message);
        }
      });
    },
    deleteUser(id) {
      const data = {
        account_id: this.account.id,
        user_id: id,
      };

      this.deleteUsersMember(buildGetParams(data));
    }
  },
}
</script>

<style scoped>

</style>
