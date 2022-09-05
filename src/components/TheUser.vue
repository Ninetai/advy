<template>
  <div class="user">
    <div class="user__info">
      <p v-if="user" class="user__email header-user-email">{{ user.user_email }}</p>
      <a @click.prevent="logOut" href="#" class="user__link log-out"><translate>Выйти</translate></a>
    </div>
    <router-link :to="{name: 'cabinet'}">
      <img src="@/assets/avatar.png" alt=""
           class="user__imag profile-link"
           style="cursor: pointer;">
    </router-link>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import { mapActions } from 'vuex';

export default {
  name: 'TheUser',
  methods: {
    ...mapActions(['logoutClient']),
    logOut() {
      this.logoutClient()

      this.$router.push({ name: 'start' })
    },
  },
  computed: {
    ...mapState({
      user: 'user',
    }),
  },
}
</script>

<style scoped lang="scss">
.user {
  display: flex;
  align-items: center;
}

.user__info {
  margin-right: 8px;
  font-size: var(--body-small);
  text-align: right;
}

.user__link {
  color: var(--blue);
  font-size: var(--logo-link);
  text-transform: uppercase;
  font-weight: 600;
}
</style>
