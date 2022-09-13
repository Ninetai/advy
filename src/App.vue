<template>
  <div id="app">
    <div v-if="$route && $route.name !== 'start'">
      <div class="app">
        <TheLayout />
        <div class="navbar">
          <!-- <TheHeader /> -->
          <router-view />
        </div>
      </div>
      <TheFooter />
    </div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from "vuex"
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'
import TheLayout from '@/components/TheLayout'

import Vue from 'vue'
import VueCookies from 'vue-cookies'

let cookieDomain = (process.env.VUE_APP_BASE_URL_LANDING || "advy.ai");
cookieDomain = cookieDomain.replace('https://', '');
Vue.use(VueCookies, { expire: '7d', path: '/', domain: cookieDomain })

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
    TheLayout,
  },
  computed: {
    ...mapGetters(['getAuthToken']),
  },
  methods: {
    ...mapActions([
      'postClientRefresh',
      'fetchClientLogin'
    ]),
  },
  mounted() {

  },
  created() {
    let autologin = this.$cookies.get('autologin');
    if (autologin) {
      localStorage.setItem('accessToken', autologin.access);
      localStorage.setItem('refreshToken', autologin.refresh);
      let campaignId = autologin.campaign;
      this.$cookies.remove('autologin');
      if (campaignId) {
        window.location.href = '/a/campaign/init/' + campaignId
      }
      else {
        window.location.href = '/a/campaign'
      }
    }
    this.fetchClientLogin();
    this.postClientRefresh();
  }
}
</script>

<style lang="scss">
.app {
  display: flex;
}

.navbar {
  width: calc(100vw - 270px);
  min-height: calc(100vh - 62px);
  background-color: #f0f2fa;
}
</style>
