<template>
  <kinesis-container class="main-bg__picture-wrap">
    <div class="wrapper wrapper_auth" :key="scene">
      <!-- Access recovery window start -->
      <EmailRecoveryPopup
          v-if="scene === 'recovery'"
          @return-auth="scene = $event"
      />
      <!-- Access recovery window end -->

      <div class="auth">
        <TheSuccessPopup v-if="scene === 'sent_email'" @close-popup="scene = 'auth'">
          <translate>Пароль успешно обновлен!</translate>
          <translate>Проверьте почту - мы отправили письмо с новым паролем.</translate>
        </TheSuccessPopup>
        <!-- Autorize form start -->
        <AuthForm
            v-if="scene === 'auth'"
            @change-scene="scene = $event"
        />
        <!-- Autorize form end -->

        <!-- Registration form start -->
        <RegistrationForm
            v-if="scene === 'register'"
            @change-scene="scene = $event"
        />
        <!-- Registration form end -->

        <div class="footer-auth">
          <img src="@/assets/logo-gray.png" alt="logo" class="footer-auth__logo" style="height: 50px">
        </div>
      </div>
      <div class="main-bg" :class="scene">
        <kinesis-element
            class="main-bg__picture main" :class="`${scene}-scene`"
            :strength="-30"
            axis="x y"
            type="translate">
          <img v-if="scene === 'auth'" src="@/assets/auth/auth-main.png" alt="">
          <img v-if="scene === 'register'" src="@/assets/auth/register-main.png" alt="">
        </kinesis-element>
        <kinesis-element class="main-bg__picture first" :class="`${scene}-scene`"
                         :strength="-10"
                         axis="x y"
                         type="translate">
          <img src="@/assets/auth/auth-1.png" alt="">
        </kinesis-element>
        <kinesis-element class="main-bg__picture second" :class="`${scene}-scene`"
                         :strength="-10"
                         axis="x y"
                         type="translate">
          <img v-if="scene === 'auth'" src="@/assets/auth/auth-2.png" alt="">
          <img v-if="scene === 'register'" src="@/assets/auth/register-2.png" alt="">
        </kinesis-element>
        <kinesis-element class="main-bg__picture third" :class="`${scene}-scene`"
                         :strength="-10"
                         axis="x y"
                         type="translate">
          <img v-if="scene === 'auth'" src="@/assets/auth/auth-3.png" alt="">
          <img v-if="scene === 'register'" src="@/assets/auth/register-3.png" alt="">
        </kinesis-element>
      </div>
    </div>
  </kinesis-container>
</template>

<script>
import {KinesisContainer, KinesisElement} from 'vue-kinesis';
import AuthForm from '@/components/auth/AuthForm'
import EmailRecoveryPopup from '@/components/auth/EmailRecoveryPopup'
import RegistrationForm from '@/components/auth/RegistrationForm'
import TheSuccessPopup from '@/components/common/TheSuccessPopup'

export default {
  name: 'IndexView',
  components: {
    AuthForm,
    EmailRecoveryPopup,
    RegistrationForm,
    TheSuccessPopup,
    KinesisContainer,
    KinesisElement
  },
  data() {
    return {
      scene: 'auth', // 'recovery' | 'auth' | 'register' | 'sent_email'
    }
  },
  created() {
    if (this.$route.query.sent_email == 'yes') {
      this.scene = 'sent_email'
    }
  }
}
</script>

<style scoped lang="scss">
.auth .popup {
  background: none;
  box-shadow: none;
}
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
    position: relative;
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

    &.register-scene {
      top: 92px;
      left: 69px;
      max-width: 217px;
      @media (max-width: 1440px) {
        top: 35px;
        left: 45px;
        max-width: 145px;
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

    &.register-scene {
      top: 304px;
      right: 6px;
      width: 152px;
      @media (max-width: 1440px) {
        top: 140px;
        max-width: 125px;
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

    &.register-scene {
      bottom: 11px;
      left: 163px;
      max-width: 219px;
      @media (max-width: 1440px) {
        bottom: 40px;
        max-width: 125px;
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
