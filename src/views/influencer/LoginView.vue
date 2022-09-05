<template>
  <kinesis-container class="main-bg__picture-wrap">
    <div class="wrapper wrapper_auth">

      <div class="auth-influencer" v-if="info">
        <h3>
          <translate>Добро пожаловать в ADVY.ai</translate>
        </h3>
        <div class="text">
          <translate>Для авторизации в личный кабинет мы используем Telegram. Также в Telegram'е ты сможешь получать уведомления о новых рекламных предложениях.</translate>
        </div>
        <a :href="constructLink"
          class="auth_link"
        >
          <translate>Войти через Telegram</translate>
        </a>

        <div class="footer-auth">
          <img src="@/assets/logo-gray.png" alt="logo" class="footer-auth__logo" style="height: 50px">
        </div>
      </div>
      <div class="main-bg auth">
        <kinesis-element
            class="main-bg__picture main auth-scene"
            :strength="-30"
            axis="x y"
            type="translate">
          <img src="@/assets/auth/auth-main.png" alt="">
        </kinesis-element>
        <kinesis-element class="main-bg__picture first auth-scene"
                         :strength="-10"
                         axis="x y"
                         type="translate">
          <img src="@/assets/auth/auth-1.png" alt="">
        </kinesis-element>
        <kinesis-element class="main-bg__picture second auth-scene"
                         :strength="-10"
                         axis="x y"
                         type="translate">
          <img src="@/assets/auth/auth-2.png" alt="">
        </kinesis-element>
        <kinesis-element class="main-bg__picture third auth-scene"
                         :strength="-10"
                         axis="x y"
                         type="translate">
          <img src="@/assets/auth/auth-3.png" alt="">
        </kinesis-element>
      </div>
    </div>
  </kinesis-container>
</template>

<script>
  import {KinesisContainer, KinesisElement} from 'vue-kinesis';
  import {mapActions} from "vuex";

  export default {
    name: 'IndexView',
    components: {
      KinesisContainer,
      KinesisElement
    },
    data() {
      return {
        info: {}
      }
    },
    computed: {
      constructLink() {
        let result = 'https://t.me/';
        if (this.info && this.info.bot_name) {
          result += this.info.bot_name.replace('https://', '').replace('t.me', '').replace('/', '')
        }
        return result
      }
    },
    mounted() {
      let goto = this.$route.query.g;
      delete this.$route.query.g;

      if (goto) {
        this.$store
          .dispatch('botLogin', this.$route.query)
          .then(() => this.$router.push({ path: goto }))
          .catch(() => {})
      }
      else {
        this.getCommonInfo().then(response => {
          this.info = response.data;
        })
      }
    },
    methods: {
      ...mapActions(['getCommonInfo']),
    }
  }
</script>

<style scoped lang="scss">
.main-bg {
  width: 50%;
  padding: 60px 25px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('@/assets/bg-main-1.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;

  &.register {
    padding: 60px 0 30px;
    background-image: url('@/assets/bg-main-2.jpg');
  }
}

.main-bg__picture-wrap {
  position: relative;
}

.main-bg__picture {
  &.first,
  &.second,
  &.third {
    position: absolute;
  }

  &.first {
    &.auth-scene {
      top: 31px;
      left: 0;
      max-width: 238px;
      @media (max-width: 1440px) {
        max-width: 125px;
      }
    }
  }

  &.second {
    &.auth-scene {
      top: 134px;
      right: -20px;
      width: 179px;
      @media (max-width: 1440px) {
        max-width: 140px;
      }
    }
  }

  &.third {
    &.auth-scene {
      bottom: -69px;
      left: 147px;
      max-width: 219px;
      @media (max-width: 1440px) {
        max-width: 165px;
      }
    }
  }
}

@media (max-width: 768px) {
  .main-bg {
    display: none;
  }
}
</style>
