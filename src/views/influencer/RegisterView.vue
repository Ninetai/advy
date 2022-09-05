<template>
  <main>
    <div class="cabinet-wrapper influencer-register">
      <UiCard>
        <h3 class="descript__header descript__header_user">Регистрация</h3>
        <div v-if="completed">
          <div class="my-10">
            <img style="width:100px; height:100px" src="@/assets/icons/check.svg" />
          </div>

          <h1 class="mb-5">Спасибо за регистрацию!</h1>
          <p class="mb-12">
            Информация о твоем аккаунте успешно сохранена. Совсем скоро мы вернемся с рекламными предложениями!
          </p>
          <router-link 
            class="btn-offers" 
            to="/i/offers"
          >
            Перейти в кабинет
          </router-link>
        </div>
        <div v-else>
          <ValidationObserver v-slot="{ handleSubmit, invalid }">
            <h3 class="form__title form__title_popup form__title_acc"><translate>Заполни информацию о своем аккаунте</translate></h3>
            <form @submit.prevent="handleSubmit(onSubmit)" action="#" class="form-document">
              <ValidationProvider rules="required" v-slot="{ errors, valid }" :custom-messages="customMessages.first_name" slim>
                <input v-model="form.first_name" type="text" class="form__field form__field_acc" :class="{'form-err' : errors.length}" :placeholder="$gettext('Имя')">
              </ValidationProvider>
              <ValidationProvider rules="required" v-slot="{ errors, valid }" :custom-messages="customMessages.sex" slim>
                <div class="form__field form__field_radio" :class="{'form-err' : errors.length}">
                  <span class="form__field_radio-name"><translate>Пол</translate></span>
                  <label class="form-label form-label_filter">
                    <span class="form-label__check-con form-label__check-filter">
                      <input v-model="form.sex" class="form-label__check" type="radio" name="check" value="male">
                      <span class="form-label__marker form-label__marker_filter"></span>
                    </span>
                    <span class="form-label__name form-label__name_filter"><translate>Мужской</translate></span>
                  </label>
                  <label class="form-label form-label_filter">
                    <span class="form-label__check-con form-label__check-filter">
                      <input v-model="form.sex" class="form-label__check" type="radio" name="check" value="female">
                      <span class="form-label__marker form-label__marker_filter"></span>
                    </span>
                    <span class="form-label__name form-label__name_filter"><translate>Женский</translate></span>
                  </label>
                </div>
              </ValidationProvider>
              <ValidationProvider :rules="{ required: true, regex: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/ }" v-slot="{ errors, valid }" :custom-messages="customMessages.network_account" slim>
                <input v-model="form.network_account" type="text" class="form__field form__field_acc" :class="{'form-err' : errors.length}" :placeholder="$gettext('Ник в Instagram')">
              </ValidationProvider>
              
              <ValidationProvider rules="required" v-slot="{ errors, valid }" :custom-messages="customMessages.country" slim>
                <CountriesWidget v-model="form.country" :class="{'form-err' : errors.length}"></CountriesWidget>
              </ValidationProvider>
              <ValidationProvider rules="required" v-slot="{ errors, valid }" :custom-messages="customMessages.blog_category" slim>
                <BlogCategoriesWidget v-model="form.blog_category" :class="{'form-err' : errors.length}"></BlogCategoriesWidget>
              </ValidationProvider>
              <ValidationProvider rules="required" v-slot="{ errors, valid }" :custom-messages="customMessages.ad_category" slim>
                <AdCategoriesWidget v-model="form.ad_category" :class="{'form-err' : errors.length}"></AdCategoriesWidget>
              </ValidationProvider>

              <ValidationProvider rules="files" v-slot="{ errors, valid, validate }" :skipIfEmpty="false" :custom-messages="customMessages.stats_screenshots" slim>
                <ScreenshotsWidget v-model="form.stats_screenshots" @change="validate($event)" :cls="{'form-err' : errors.length}"></ScreenshotsWidget>
              </ValidationProvider>

              <label class="form__field form__field_acc form-label">
                <span class="form-label__check-con">
                  <input class="form-label__check register-privacy" type="checkbox" v-model="show_compaign_stats">
                  <span class="form-label__marker form-label__marker_rules"></span>
                </span>
                <span class="form-label__name"><translate>Размещал рекламу раньше?</translate></span>
              </label>

              <ValidationProvider rules="required" v-slot="{ errors, valid }" :custom-messages="customMessages.about_me" slim>
                <textarea v-model="form.about_me" class="form__field form__field_textarea" :class="{'form-err' : errors.length}"
                  :placeholder="$gettext('Чем еще любишь делиться с аудиторией?')"></textarea>
              </ValidationProvider>
              
              <ValidationProvider rules="required" v-slot="{ errors, valid }" :custom-messages="customMessages.frequency" slim>
                <FrequencyWidget v-model="form.frequency" :class="{'form-err' : errors.length}"></FrequencyWidget>
              </ValidationProvider>

              <ValidationProvider rules="required|numeric" v-slot="{ errors, valid }" :custom-messages="customMessages.desired_price" slim>
                <input v-model.numeric="form.desired_price" type="text" class="form__field form__field_acc" :class="{'form-err' : errors.length}" :placeholder="$gettext('Стоимость рекламы')">
              </ValidationProvider>
              <p class="form-document__text form-document__text_small"><translate>Сколько на твой взгляд стоит реклама в твоем аккаунте (например за 4 сторис)?</translate></p>
              
              <ValidationProvider rules="required|oneOf:1" v-slot="{ errors, valid }" :custom-messages="customMessages.agree" slim>
                <label class="form__field form__field_acc form-label" :class="{'form-err' : errors.length}">
                  <span class="form-label__check-con">
                    <input class="form-label__check register-privacy" type="checkbox" value="1" v-model="agree">
                    <span class="form-label__marker form-label__marker_rules"></span>
                  </span>
                  <span class="form-label__name"><translate>Я согласен</translate> <a href="https://app.advy.ai/privacy" class="ml-2"><translate>с правилами</translate></a></span>
                </label>
              </ValidationProvider>

              <button class="form__button form__button_acc" type="submit"><translate>Сохранить</translate></button>
            </form>
          </ValidationObserver>

        </div>
      </UiCard>
    </div>
  </main>
</template>

<script>
  import UiCard from "@/components/ui/UiCard";
  import {mapActions} from "vuex";

  import CountriesWidget from "@/components/influencer/register/CountriesWidget";
  import BlogCategoriesWidget from "@/components/influencer/register/BlogCategoriesWidget";
  import AdCategoriesWidget from "@/components/influencer/register/AdCategoriesWidget";
  import ScreenshotsWidget from "@/components/influencer/register/ScreenshotsWidget";
  import FrequencyWidget from "@/components/influencer/register/FrequencyWidget";

  import { ValidationObserver, ValidationProvider, extend } from 'vee-validate/dist/vee-validate.full.esm';

  export default {
    name: 'IndexView',
    components: {
      UiCard,
      CountriesWidget,
      BlogCategoriesWidget,
      AdCategoriesWidget,
      ScreenshotsWidget,
      FrequencyWidget,
      ValidationObserver,
      ValidationProvider
    },
    data() {
      return {
        completed: false,
        show_compaign_stats: false,
        agree: false,
        touched_files: false,
        form: {
          first_name: "",
          sex: "",
          network_account: "",
          country: null,
          blog_category: null,
          ad_category: [],
          desired_price: "",
          campaign_description: "",
          stats_screenshots: null,
          about_me: "",
          frequency: ""
        },
        customMessages: {}
      }
    },
    computed: {

    },
    mounted() {
      extend('files', value => {
        if (value) {
          if (value.length >= 2 && value.length <= 10) {
            return true
          }
        }
        return false
      });
      this.customMessages = {
        first_name: {
          required: this.$gettext("Enter your name")
        },
        sex: {
          required: this.$gettext("Select your sex")
        },
        network_account: {
          required: this.$gettext("Enter your username in Instagram"),
          regex: this.$gettext("Enter valid username")
        },
        country: {
          required: this.$gettext("Select your country")
        },
        blog_category: {
          required: this.$gettext("Select your category")
        },
        ad_category: {
          required: this.$gettext("Select your category")
        },
        stats_screenshots: {
          files: this.$gettext("Upload screenshots")
        },
        about_me: {
          required: this.$gettext("Enter about you text")
        },
        frequency: {
          required: this.$gettext("Select frequency")
        },
        desired_price: {
          required: this.$gettext("Enter your desired price"),
          numeric: this.$gettext("Please enter digits")
        },
        agree: {
          oneOf: this.$gettext("You should agree with rules")
        },
      }
    },
    methods: {
      ...mapActions(['createProfile']),
      showFiles() {
        console.log(this.form.stats_screenshots)
      },
      onSubmit: function() {
        let blog_category = [];
        for (var i=0; i<this.form.blog_category.length; i++) {
          blog_category.push(this.form.blog_category[i].id)
        }
        let ad_category = [];
        for (var i=0; i<this.form.ad_category.length; i++) {
          ad_category.push(this.form.ad_category[i].id)
        }
        let data = {
          first_name: this.form.first_name,
          sex: this.form.sex,
          network_account: this.form.network_account,
          country: this.form.country,
          blog_category: blog_category,
          ad_category: ad_category,
          desired_price: this.form.desired_price,
          frequency: this.form.frequency,
          about_me: this.form.about_me,
          stats_screenshots: Object.values(this.form.stats_screenshots)
        }
        this.createProfile(data).then(() => {
          this.completed = true
        }).catch((err) => {
          alert('Возникла ошибка: ' + err)
        })
      }
    }
  }
</script>
