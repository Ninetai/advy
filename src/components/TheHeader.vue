<template>
  <header class="header">
    <div>
      <!-- <form class="header__bar" action="#">
        <div class=" ">
          <input type="search" class="ui-form-field search">
        </div>
        <div class="">
          <select class="select select_field select_company">
            <option value="" class="select__option">
              <translate>Соцсеть</translate>
            </option>
            <option class="select__option">
              network.name

            </option>
          </select>
        </div>
        <div class="">
          <select class="select select_field select_company">
            <option value="" class="select__option">
              <translate>Статус</translate>
            </option>
            <option class="select__option"> status
            </option>
          </select>
        </div>
        <div>
          <button class="setting_img">
            <img src="@/assets/list-buttons.svg" alt="" class="user__imag profile-link" style="cursor: pointer;">
          </button>
        </div>
      </form> -->

      <!-- <router-link :to="{ name: 'manager' }" class="logo logo_header">
        <img src="@/assets/icons/logo.svg" class="logo__image logo__image_header" alt="logo">
      </router-link> -->
    </div>
    <div class="header__user">
      <TheNotificate />
      <TheUser />
    </div>
  </header>
</template>

<script>
import TheUser from '@/components/TheUser';
import TheNotificate from '@/components/TheNotificate';
import { mapActions, mapState } from "vuex";

export default {
  name: 'TheHeader',
  components: {
    TheNotificate,
    TheUser,
  },
  computed: {
    ...mapState(['authToken'])
  },
  watch: {
    authToken() {
      this.loadPageInfo()
    }
  },
  created() {
    //this.loadPageInfo();
  },
  methods: {
    ...mapActions(['getUsersAccount', 'getUsersProfilePage']),
    loadPageInfo() {
      this.getUsersAccount()
        .then((response) => this.accountId = response.data[0][0].id)
        .then(() => this.getUsersProfilePage(this.accountId));
    }
  },
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  background-color: #f0f2fa;
  box-shadow: 0px -8px 0px rgba(0, 0, 0, 0.05);
}


.header__user {
  display: flex;
  align-items: center;
  justify-content: center;
}

.header__bar {
  display: flex;
  gap: 25px;
  align-items: center;
  flex-wrap: wrap;
}

@media (max-width: 655px) {
  .header {
    padding: 10px;

  }
}
</style>
