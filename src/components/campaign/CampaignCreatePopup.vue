<template>
  <div class="overlay overlay_create" :key="scene">
    <!-- Create new ADS window -->
    <div v-if="scene === 'init'" class="popup popup_create">
      <h3 class="form__title form__title_create form__title_popup">
        <a @click.prevent="$emit('close-popup', false)" href="" class="popup__link">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M7.80481 2.86219C7.9298 2.98722 8.00001 3.15676 8.00001 3.33355C8.00001 3.51033 7.9298 3.67988 7.80481 3.80491L4.27597 7.33375H13.3338C13.5106 7.33375 13.6802 7.40399 13.8052 7.52902C13.9302 7.65405 14.0005 7.82363 14.0005 8.00045C14.0005 8.17727 13.9302 8.34684 13.8052 8.47188C13.6802 8.59691 13.5106 8.66715 13.3338 8.66715H4.27597L7.80481 12.196C7.92626 12.3217 7.99346 12.4901 7.99194 12.6649C7.99042 12.8398 7.9203 13.007 7.79669 13.1306C7.67308 13.2542 7.50586 13.3243 7.33106 13.3258C7.15625 13.3273 6.98784 13.2601 6.8621 13.1387L2.1952 8.4718C2.07021 8.34678 2 8.17723 2 8.00045C2 7.82366 2.07021 7.65412 2.1952 7.52909L6.8621 2.86219C6.98712 2.73721 7.15667 2.66699 7.33346 2.66699C7.51024 2.66699 7.67979 2.73721 7.80481 2.86219Z"
                  fill="#367BF2"/>
          </svg>
        </a>
        <template v-if="mode === 'edit'"><translate>Редактирование рекламной кампании</translate></template>
        <template v-else><translate>Создание новой рекламной кампании</translate></template>
      </h3>
      <form @submit.prevent="saveCampaign" action="#" class="form-document form-document_create">
        <h3 class="form-document__head"><translate>Общая информация</translate></h3>
        <input v-model="form.name" type="text"
               class="form__field"
               @blur="validate('name')"
               :class="{'hasError': !!errorForm.name}"
               :placeholder="$gettext('Название кампании')">
        <input v-model="form.comment" type="text"
               class="form__field"
               :placeholder="$gettext('Коммент')">
        <div class="form-document__inner auto form-document__inner_mob">
          <select v-if="mode === 'create' && accountsList && accountsList.length > 0"
                  v-model="form.accountId"
                  class="select select_create create-block"
                  @blur="validate('accountId')"
                  :class="{'hasError': !!errorForm.accountId}">
            <option value="" class="select__option"><translate>Выберите аккаунт</translate></option>
            <option v-for="account in accountsList" :key="account.id"
                    :value="account.id" class="select__option">{{ account.name }}
            </option>
          </select>
          <input v-model="form.budget" type="text"
                 class="form__field create-block"
                 @blur="validate('budget')"
                 :class="{'hasError': !!errorForm.budget}"
                 :placeholder="$gettext('Бюджет')">
          <UiDateRangePicker
              placeholder="31.12.2021 - 31.12.2021"
              :value.sync="form.dates"
              class="create-block"
              :class="{'hasError': !!errorForm.dates}"
          />

        </div>
        <textarea v-model="form.description"
                  class="form__field form__field_textarea"
                  :placeholder="$gettext('Описание')"></textarea>
        <UiUploadFile :files.sync="form.files" @delete-file="deleteFile($event)"/>

        <h3 class="form-document__head"><translate>Целевая аудитория</translate></h3>
        <UiTargetInput :placeholder="$gettext('Геолокация')" :list="form.geos"
                       @remove-item="removeGeo($event)"
                       style="margin-bottom: 1rem">
          <UiTargetButton class="ui-target-input__button">
            <UiTargetPopup :value.sync="currentGeo" :list="filteredGeos" @add-item="addGeo($event)"/>
          </UiTargetButton>
        </UiTargetInput>
        <UiTargetInput :placeholder="$gettext('Тематика')" :list="form.blogCategory"
                       @remove-item="removeTopic($event)"
                       style="margin-bottom: 1rem">
          <UiTargetButton class="ui-target-input__button">
            <UiTargetPopup :value.sync="currentBlogCategory" :list="filteredTopics" @add-item="addTopic($event)"/>
          </UiTargetButton>
        </UiTargetInput>

        <!-- Geo select Section -->
        <div class="form-document__inner form-document__inner_age form-document__inner_mob">
          <p class="form-document__text form-document__text_age"><translate>Возраст</translate></p>
          <input v-model.number="form.ageFrom" type="text"
                 class="form__field form__field_age"
                 @blur="validate('ageFrom')"
                 :class="{'hasError': !!errorForm.ageFrom}"
                 :placeholder="$gettext('От')">
          <p class="form-document__text">-</p>
          <input v-model.number="form.ageTo" type="text"
                 class="form__field form__field_age"
                 @blur="validate('ageTo')"
                 :class="{'hasError': !!errorForm.ageTo}"
                 :placeholder="$gettext('До')">
          <select v-model="form.sex"
                  class="select select_create select_sex"
                  @blur="validate('sex')"
                  :class="{'hasError': !!errorForm.sex}">
            <option value="both" class="select__option"><translate>Все</translate></option>
            <option value="male" class="select__option"><translate>Женский</translate></option>
            <option value="female" class="select__option"><translate>Мужской</translate></option>
          </select>
        </div>
        <h3 class="form-document__head"><translate>Бартер</translate></h3>
        <p class="form-document__text form-document__text_small"><translate>Оставьте блок пустым, если кампания без бартера</translate></p>
        <div class="form-document__inner form-document__inner_mob">
          <input v-model="form.barterName" type="text"
                 class="form__field form__field_price-name"
                 :placeholder="$gettext('Название товара/услуги')">
          <input v-model="form.barterPrice" type="text" class="form__field form__field_price"
                 :placeholder="$gettext('Цена, $')">
          <div class="price-text"><translate>Стоимость бартера может быть скорректирована системой</translate></div>
        </div>
        <textarea v-model="form.barterDescription" class="form__field form__field_textarea"
                  :placeholder="$gettext('Описание бартера')"></textarea>
        <div class="form-document__inner form-document__inner_buttons form-document__inner_mob">
          <div class="form-coverage">
            <p><translate>Охват:</translate></p>
            <p class="form-coverage__text campaign-coverage">{{ parseInt(this.form.budget * 57.347) }}</p>
          </div>
          <button @click.prevent="$emit('close-popup', false)"
                  class="ui-button outline blue form__button form__button_cancel btn-mrg" type="button">
            <translate>Отмена</translate>
          </button>
          <button class="form__button form__button_submit" type="submit">
            <template v-if="mode === 'edit'"><translate>Изменить</translate></template>
            <template v-else><translate>Создать</translate></template>
          </button>
        </div>
      </form>
    </div>

    <TheErrorPopup
        v-if="scene === 'error'"
        @repeat-popup="scene = 'init'"
        @cancel-popup="$emit('close-popup', false)"
    />
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import UiDateRangePicker from '@/components/ui/UiDateRangePicker'
import UiUploadFile from '@/components/ui/UiUploadFile'
import UiTargetInput from '@/components/ui/UiTargetInput'
import UiTargetButton from '@/components/ui/UiTargetButton'
import UiTargetPopup from '@/components/ui/UiTargetPopup'
import TheErrorPopup from '@/components/common/TheErrorPopup'

export default {
  name: 'CampaignCreatePopup',
  props: ['mode', 'id'], // mode === 'create' || 'edit' || 'influencer'
  components: {
    UiDateRangePicker,
    UiUploadFile,
    UiTargetInput,
    UiTargetButton,
    UiTargetPopup,
    TheErrorPopup,
  },
  data() {
    return {
      scene: 'init',
      currentGeo: '',
      currentBlogCategory: '',
      filteredGeos: [],
      filteredTopics: [],
      form: {
        name: '',
        comment: '',
        accountId: '',
        budget: '',
        description: '',
        dates: null,
        blogCategory: [],
        geos: [],
        ageFrom: '',
        ageTo: '',
        sex: 'both',
        barterId: null,
        barterName: null,
        barterPrice: '',
        barterDescription: '',
        files: [],
      },
      errorForm: {
        name: null,
        accountId: null, // @todo required if mode === 'create'
        budget: null,
        dates: null,
        ageFrom: null,
        ageTo: null,
        sex: null,
      },
      sharedState: {
        activeTargetPopup: false
      },
    }
  },
  created() {
    if (this.mode === 'edit') {
      this.getCampaignInfo(this.id).then(response => {
        let dates = [];
        if (response.start_date) {
          dates.push(new Date(response.start_date).toLocaleDateString("en-GB").split('/').join('.'))
        }
        if (response.end_date) {
          dates.push(new Date(response.end_date).toLocaleDateString("en-GB").split('/').join('.'))
        }
        this.form = {
          ...this.form,
          name: response.name || '',
          comment: response.comment || '',
          budget: response.budget || '',
          dates: dates ? dates.join(' — ') : null,
          description: response.initial_description || '',
          blogCategory: response.blog_category || [],
          files: response.files || [],
          geos: response.geos || [],
          ageFrom: response.desired_age[0] || '',
          ageTo: response.desired_age[1] || '',
          sex: response.sex || 'both',
        }
        if (response.barters.length) {
          this.form['barterId'] = response.barters[0].id;
          this.form['barterName'] = response.barters[0].name || '';
          this.form['barterPrice'] = response.barters[0].price || '';
          this.form['barterDescription'] = response.barters[0].description || '';
        }
      })
    }
  },
  watch: {
    currentGeo(value) {
      this.getGeoList(value).then(response => this.filteredGeos = response.data);
    },
    currentBlogCategory(value) {
      this.getTopicsList(value).then(response => this.filteredTopics = response.data);
    }
  },
  methods: {
    ...mapActions([
      'getGeoList',
      'getTopicsList',
      'getCampaignInfo',
      'postCampaignCreate',
      'postInfluencerCampaignCreate',
      'putCampaignData'
    ]),
    addGeo(item) {
      if (this.form.geos.filter(geo => geo.id === item.id).length > 0) {
        return;
      }

      this.form.geos = [
        ...this.form.geos,
        item
      ];
    },
    removeGeo(id) {
      this.form.geos = this.form.geos.filter(geo => geo.id !== id);
    },
    addTopic(item) {
      if (this.form.blogCategory.filter(category => category.id === item.id).length > 0) {
        return;
      }
      this.form.blogCategory = [
        ...this.form.blogCategory,
        item
      ];
    },
    removeTopic(id) {
      this.form.blogCategory = this.form.blogCategory.filter(category => category.id !== id);
    },
    validate(field) {
      this.errorForm[field] = this.form[field] ? null : this.$gettext('Заполните поле');
    },
    invalidate(field) {
      this.errorForm[field] = this.$gettext('Заполните поле');
    },
    deleteFile(id) {
      this.form.files = this.form.files.filter(file => file.id !== id);
    },
    saveCampaign() {
      for (let key in this.errorForm) {
        if (!(key == 'accountId' && this.mode == 'edit')) {
          this.validate(key);
        }
      }

      if (this.hasFormErrors) {
        return;
      }
      const [dateFrom, separator, dateTo] = this.form.dates.split(' ');

      if (this.mode === 'create') {
        const reqData = {
          name: this.form.name,
          comment: this.form.comment,
          account_id: this.form.accountId,
          budget: this.form.budget,
          initial_description: this.form.description,
          start_date: dateFrom.split('.').reverse().join('-'),
          end_date: dateTo.split('.').reverse().join('-'),
          blog_category: this.form.blogCategory.map(category => category.id),
          geos: this.form.geos.map(geo => geo.id),
          desired_age: [this.form.ageFrom, this.form.ageTo],
          sex: this.form.sex,
          barters: [
            {
              name: this.form.barterName ?? null,
              price: this.form.barterPrice ?? 0,
              description: this.form.barterDescription ?? null
            }
          ],
          files: this.form.files.map(file => file.id),
        };

        this.postCampaignCreate(reqData)
            .then(res => {
              if (res) {
                this.$emit('close-popup', true)
              }
            })
            .catch(err => {
              const {data} = err.response;
              let highlighted = false;
              for (const [key, value] of Object.entries(data)) {
                if (key == 'desired_age') {
                  highlighted = true;
                  this.invalidate('ageFrom'); this.invalidate('ageTo');
                }
              }
              if (!highlighted) {
                this.scene = 'error'
              }
            });
      }
      if (this.mode === 'influencer') {
        const reqData = {
          influencer: this.id,
          name: this.form.name,
          comment: this.form.comment,
          account_id: this.form.accountId,
          budget: this.form.budget,
          initial_description: this.form.description,
          start_date: dateFrom.split('.').reverse().join('-'),
          end_date: dateTo.split('.').reverse().join('-'),
          blog_category: this.form.blogCategory.map(category => category.id),
          geos: this.form.geos.map(geo => geo.id),
          desired_age: [this.form.ageFrom, this.form.ageTo],
          sex: this.form.sex,
          barters: [
            {
              id: this.form.barterId ?? null,
              name: this.form.barterName ?? null,
              price: this.form.barterPrice ?? 0,
              description: this.form.barterDescription ?? null
            }
          ],
          files: this.form.files.map(file => file.id),
        };

        this.postInfluencerCampaignCreate(reqData)
            .then(res => {
              if (res) {
                this.$emit('close-popup', true)
              }
            })
            .catch(err => {
              const {data} = err.response;
              let highlighted = false;
              for (const [key, value] of Object.entries(data)) {
                if (key == 'desired_age') {
                  highlighted = true;
                  this.invalidate('ageFrom'); this.invalidate('ageTo');
                }
              }
              if (!highlighted) {
                this.scene = 'error'
              }
            });
      }
      if (this.mode === 'edit') {
        const reqData = {
          campaignId: this.id,
          name: this.form.name,
          budget: this.form.budget,
          initial_description: this.form.description,
          start_date: dateFrom.split('.').reverse().join('-'),
          end_date: dateTo.split('.').reverse().join('-'),
          blog_category: this.form.blogCategory.map(category => category.id),
          geos: this.form.geos.map(geo => geo.id),
          desired_age: [this.form.ageFrom, this.form.ageTo],
          sex: this.form.sex,
          barters: [
            {
              id: this.form.barterId ?? null,
              name: this.form.barterName ?? null,
              price: this.form.barterPrice ?? 0,
              description: this.form.barterDescription ?? null
            }
          ],
          files: this.form.files.map(file => file.id),
        };

        this.putCampaignData(reqData)
            .then(res => {
              if (res) {
                this.$emit('close-popup', true)
              }
            })
            .catch(err => {
              const {data} = err.response;
              let highlighted = false;
              for (const [key, value] of Object.entries(data)) {
                if (key == 'desired_age') {
                  highlighted = true;
                  this.invalidate('ageFrom'); this.invalidate('ageTo');
                }
              }
              if (!highlighted) {
                this.scene = 'error'
              }
            });
      }
    }
  },
  computed: {
    ...mapState(['accountsList']),
    hasFormErrors() {
      return this.errorForm.name !== null
          || this.errorForm.accountId !== null
          || this.errorForm.budget !== null
          || this.errorForm.dates !== null
          || this.errorForm.sex !== null
          || this.errorForm.ageFrom !== null
          || this.errorForm.ageTo !== null;
    },
  },
}
</script>

<style scoped lang="scss">
.popup_create {
  transform: translate(0, 0);
}
</style>
