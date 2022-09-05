<template>
  <div class="">
    <h3 class="descript__header"><translate>Аккаунты</translate></h3>
    <div class="accaunt-block">
      <p class="accaunt-block__name"><translate>Personal</translate></p>
      <p v-if="user" class="accaunt-block__email">{{ user.user_email }}</p>
    </div>

    <div v-for="account in accountsList" class="accaunt-block">
      <p class="accaunt-block__name">{{ account.name }}</p>
      <p class="accaunt-block__users">{{ account.users.length }}</p>
      <div class="accaunt-block__menu">
        <UiDropdown class="table-block__item dropdown">
          <a @click.prevent="$emit('edit-account', account.id)" href="#"
             class="dropdown__link dropdown__link_edit">
            <translate>Редактировать</translate>
          </a>
          <a @click.prevent="$emit('open-users', account.id)" href="#"
             class="dropdown__link dropdown__link_users">
            <translate>Пользователи</translate>
          </a>
          <a @click.prevent="$emit('delete-account', account.id)" href="#"
             class="dropdown__link dropdown__link_delete">
            <translate>Удалить</translate>
          </a>
        </UiDropdown>
      </div>
    </div>
    <button @click.prevent="$emit('add-account')"
            type="button"
            class="card-btn acc-btn_acc add-card">
      <translate>Добавить аккаунт</translate>
    </button>
  </div>
</template>

<script>
import {mapState} from "vuex";
import UiDropdown from "@/components/ui/UiDropdown";

export default {
  name: 'CabinetAccounts',
  components: {UiDropdown},
  computed: {
    ...mapState(['user', 'accountsList']),
  },
}
</script>

<style scoped lang="scss">
.accaunt-block {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid rgba(190, 194, 205, 0.5);
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
}

.accaunt-block__users {
  width: 112px;
  font-weight: 600;
  padding-left: 35px;
  background-image: url('@/assets/icons/users.svg');
  background-repeat: no-repeat;
  background-position: center left;
  background-size: 24px;
}

.accaunt-block__name {
  flex-basis: 37%;
  font-weight: 600;
  margin-right: 24px;
}

.accaunt-block__menu {
  margin-left: auto;
}

@media (max-width: 360px) {
  .accaunt-block__email {
    display: none;
  }
  .accaunt-block__users {
    display: none;
  }
}
</style>
