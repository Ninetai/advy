<template>
  <div v-if="userInfo" class="cabinet-user">
    <div class="cabinet-user__image">
      <img src="@/assets/icons/user.svg" class="cabinet-user__picture" alt="user">
    </div>
    <div class="cabinet-user__block">
      <p class="cabinet-user__title"><translate>Имя</translate></p>
      <p class="cabinet-user__text">{{ userInfo.user_first_name }}</p>
    </div>
    <div class="cabinet-user__block">
      <p class="cabinet-user__title"><translate>Фамилия</translate></p>
      <p class="cabinet-user__text">{{ userInfo.user_last_name }}</p>
    </div>
    <div class="cabinet-user__block">
      <p class="cabinet-user__title"><translate>Email</translate></p>
      <p class="cabinet-user__text">{{ userInfo.user_email }}</p>
    </div>
    <div class="cabinet-user__block">
      <p class="cabinet-user__title"><translate>Телефон</translate></p>
      <p class="cabinet-user__text">{{ userInfo.user_phone ? userInfo.user_phone : "-" }}</p>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'CabinetUser',
  computed: {
    ...mapState({
      userInfo: 'user',
    })
  },
}
</script>

<style scoped>
.cabinet-user {
  display: flex;
  align-items: center;
  column-gap: 16px;
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--very-light-gray);
}

.cabinet-user__image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin-right: 8px;
  background-color: rgba(122, 93, 235, 0.05);
  border-radius: 8px;
}

.cabinet-user__block {
  flex-basis: 22%;
}

.cabinet-user__title {
  font-size: var(--caps-small);
  color: var(--light-gray);
  margin-bottom: 8px;
}

.cabinet-user__text {
  font-weight: 600;
}

@media (max-width: 1310px) {
  .cabinet-user {
    font-size: 13px;
  }
}

@media (max-width: 1130px) {
  .cabinet-user {
    flex-wrap: wrap;
    font-size: var(--body);
  }

  .cabinet-user__image {
    margin-right: 0;
    margin-bottom: 16px;
  }

  .cabinet-user__block {
    flex-basis: 100%;
  }

  .cabinet-user__block {
    margin-bottom: 16px;
  }
}

@media (max-width: 900px) {
  .cabinet-user {
    font-size: var(--body);
  }
}

@media (max-width: 420px) {
  .cabinet-user {
    padding-bottom: 8px;
  }
}
</style>
