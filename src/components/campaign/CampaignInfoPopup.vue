<template>
  <div class="overlay-bloger">
    <div v-if="loading" class="popup popup_bloger">
      <translate>Загрузка...</translate>
    </div>
    <div v-else-if="item" class="popup popup_bloger">
      <h3 class="form__title form__title_create form__title_popup" v-if="item.network">
        <a @click.prevent="$emit('close-popup')" type="button" class="popup__link popup__link_comp">
          <svg class="head-companies__picture" width="16" height="16" viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M7.80481 2.86219C7.9298 2.98722 8.00001 3.15676 8.00001 3.33355C8.00001 3.51033 7.9298 3.67988 7.80481 3.80491L4.27597 7.33375H13.3338C13.5106 7.33375 13.6802 7.40399 13.8052 7.52902C13.9302 7.65405 14.0005 7.82363 14.0005 8.00045C14.0005 8.17727 13.9302 8.34684 13.8052 8.47188C13.6802 8.59691 13.5106 8.66715 13.3338 8.66715H4.27597L7.80481 12.196C7.92626 12.3217 7.99346 12.4901 7.99194 12.6649C7.99042 12.8398 7.9203 13.007 7.79669 13.1306C7.67308 13.2542 7.50586 13.3243 7.33106 13.3258C7.15625 13.3273 6.98784 13.2601 6.8621 13.1387L2.1952 8.4718C2.07021 8.34678 2 8.17723 2 8.00045C2 7.82366 2.07021 7.65412 2.1952 7.52909L6.8621 2.86219C6.98712 2.73721 7.15667 2.66699 7.33346 2.66699C7.51024 2.66699 7.67979 2.73721 7.80481 2.86219Z" />
          </svg>
        </a>
        <a :href="networkList[item.network].link + item.network_account" target="_blank" class="name">
          @{{ item.network_account }}
        </a>
        <a :href="networkList[item.network].link + item.network_account" target="_blank" class="icon-social"
          :class="[item.network]"></a>
      </h3>
      <div v-if="selection">
        <div class="selection-help-text">
          <img v-if="item.profile_pic" :src="'https://app.advy.ai' + item.profile_pic" />
          <p v-if="item.description">{{ item.description }}</p>
          <p v-else>
            <translate>Выберите, нравится или не нравится вам предложенный блогер. Понравившимся блогерам будет
              отправлено предложение разместить вашу рекламу.</translate>
          </p>
        </div>
        <div class="popup_selection" :key="selection.result">
          <a href="#" @click.prevent="vote('disliked')" class="ui-button thumbs thumbs-down"
            :class="{ 'active': selection.result == 'disliked' }">
            <span>Не нравится</span>
          </a>
          <a href="#" @click.prevent="vote('liked')" class="ui-button thumbs thumbs-up"
            :class="{ 'active': selection.result == 'liked' }">
            <span>Нравится</span>
          </a>
        </div>
        <div class="selection-help-text-second" v-if="item.description">
          <p>
            <translate>Выберите, нравится или не нравится вам предложенный блогер. Понравившимся блогерам будет
              отправлено предложение разместить вашу рекламу.</translate>
          </p>
        </div>
        <div class="selection-progress-row">
          <div class="selection-progress-budget">
            <div class="progress" :style="{ width: (likedBudget / campaignBudget * 100) + '%' }"></div>
            <p>
              <translate>Бюджет:</translate>
            </p>
            <p class="form-coverage__text campaign-coverage">${{ likedBudget }} / ${{ parseInt(campaignBudget) }}</p>
          </div>
          <div class="selection-progress-influencer">
            <p>
              <translate>Выбрано:</translate>
            </p>
            <p class="form-coverage__text campaign-coverage">{{ likedCount }}</p>
          </div>
        </div>
      </div>
      <h3 class="form-document__head">
        <translate>Общая информация</translate>
      </h3>
      <div class="popup-info">
        <div class="popup-info__block" v-if="item.blog_category">
          <p class="popup-info__head">
            <translate>Тематика</translate>
          </p>
          <p class="popup-info__text" v-if="item">
            <span v-for="(category, index) in item.blog_category" :key="index">
              <span v-if="category.emoji">{{ category.emoji }}</span> {{ category.name || '&mdash;' }}<span
                v-if="index < (item.blog_category.length - 1)">, </span>
            </span>
          </p>
        </div>
        <div class="popup-info__block" v-if="item.follower_count">
          <p class="popup-info__head">
            <translate>Подписчики</translate>
          </p>
          <p class="popup-info__text">{{ item.follower_count || '&mdash;' }}</p>
        </div>
        <div class="popup-info__block" v-if="item.er && item.er > 0">
          <p class="popup-info__head">
            <translate>ER</translate>
          </p>
          <p class="popup-info__text">{{ item.er ? item.er.toFixed(2) + '%' : '&mdash;' }}</p>
        </div>
        <div class="popup-info__block" v-if="item.ci && item.ci > 0">
          <p class="popup-info__head">
            <translate>Индекс цитирования</translate>
          </p>
          <p class="popup-info__text">{{ item.ci ? item.ci.toFixed(2) : '&mdash;' }}</p>
        </div>
        <div class="popup-info__block" v-if="item.reach_stories && item.reach_stories > 0">
          <p class="popup-info__head">
            <translate>Охват</translate>
          </p>
          <p class="popup-info__text">{{ item.reach_stories || '&mdash;' }}</p>
        </div>
        <div class="popup-info__block" v-if="item.reach_post && item.reach_post > 0">
          <p class="popup-info__head">
            <translate>Охват постов</translate>
          </p>
          <p class="popup-info__text">{{ item.reach_post || '&mdash;' }}</p>
        </div>
        <div class="popup-info__block" v-if="item.reach_post_without_repost && item.reach_post_without_repost > 0">
          <p class="popup-info__head">
            <translate>Охват рекламных постов</translate>
          </p>
          <p class="popup-info__text">{{ item.reach_post_without_repost || '&mdash;' }}</p>
        </div>
        <div class="popup-info__block" v-if="item.channels_citation && item.channels_citation > 0">
          <p class="popup-info__head">
            <translate>Цитирования в каналах</translate>
          </p>
          <p class="popup-info__text">{{ item.channels_citation || '&mdash;' }}</p>
        </div>
        <div class="popup-info__block" v-if="item.channels_mentions && item.channels_mentions > 0">
          <p class="popup-info__head">
            <translate>Упоминания в каналах</translate>
          </p>
          <p class="popup-info__text">{{ item.channels_mentions || '&mdash;' }}</p>
        </div>
        <div class="popup-info__block" v-if="item.channels_shares && item.channels_shares">
          <p class="popup-info__head">
            <translate>Репосты в каналах</translate>
          </p>
          <p class="popup-info__text">{{ item.channels_shares || '&mdash;' }}</p>
        </div>
        <div class="popup-info__block" v-if="influencer && item.desired_price && item.desired_price">
          <p class="popup-info__head">
            <translate>Предполагаемая цена</translate>
          </p>
          <p class="popup-info__text">{{ !item.desired_price ? '&mdash;' : '$' + item.desired_price }}</p>
        </div>
        <div class="popup-info__block">
          <p class="popup-info__head">
            <translate>Бартер</translate>
          </p>
          <p class="popup-info__text">{{ item.barter ? $gettext('Yes') : $gettext('No') }}</p>
        </div>
      </div>
      <div v-if="item.audience_age || item.audience_gender || item.audience_geo">
        <h3 class="form-document__head">
          <translate>Аудитория</translate>
        </h3>
        <div class="popup-auditory">
          <ul class="tabs tabs_auditory clearfix">
            <li class="tabs__item tabs__item_task tabs__item_auditory" v-if="item.audience_age">
              <a class="tabs__link" :class="{ active: selectedTab === 'age' }" @click.prevent="selectedTab = 'age'"
                href="#">
                <translate>Возраст</translate>
              </a>
            </li>
            <li class="tabs__item tabs__item_task tabs__item_auditory" v-if="item.audience_gender">
              <a class="tabs__link" :class="{ active: selectedTab === 'sex' }" @click.prevent="selectedTab = 'sex'"
                href="#">
                <translate>Пол</translate>
              </a>
            </li>
            <li class="tabs__item tabs__item_task tabs__item_auditory" v-if="item.audience_geo">
              <a class="tabs__link" :class="{ active: selectedTab === 'country' }"
                @click.prevent="selectedTab = 'country'" href="#">
                <translate>страна</translate>
              </a>
            </li>
            <li class="tabs__item tabs__item_task tabs__item_auditory" v-if="item.audience_geo">
              <a class="tabs__link" :class="{ active: selectedTab === 'city' }" @click.prevent="selectedTab = 'city'"
                href="#">
                <translate>город</translate>
              </a>
            </li>
          </ul>
          <div class="task__tab">
            <div class="tabgroup">
              <div v-if="selectedTab === 'age'" class="tab-block">
                <UiValueProgress v-for="(age, index) in item.audience_age" :key="index" :title="index" :value="age" />
              </div>
              <div v-if="selectedTab === 'sex'" class="tab-block">
                <UiValueProgress v-for="(sex, index) in item.audience_gender" :key="index" :title="index"
                  :value="sex" />
              </div>
              <div v-if="selectedTab === 'country'" class="tab-block">
                <UiValueProgress v-for="(country, index) in item.audience_country" :key="index" :title="index"
                  :value="country" />
              </div>
              <div v-if="selectedTab === 'city'" class="tab-block">
                <UiValueProgress v-for="(geo, index) in item.audience_geo" :key="index" :title="index" :value="geo" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="item.views_by_hour">
        <div class="statistics">
          <div class="statistics__wrap">
            <h3 class="descript__header descript__header_mrg">
              <translate>Статистика просмотров по часам</translate>
            </h3>
          </div>
          <div class="graph">
            <InfluencerViewHour :data="viewHours" />
          </div>
        </div>
      </div>
      <div v-if="item.offers && item.offers.length">
        <h3 class="form-document__head">
          <translate>Рекламные посты Advy</translate>
        </h3>
        <div class="popup-posts">
          <div class="popup-posts__block">
            <p class="popup-posts__head">
              <translate>Пост</translate>
            </p>
            <p v-for="offer in item.offers" class="popup-posts__text popup-posts__text_post">№{{ offer.id || '&mdash;'
            }}</p>
          </div>
          <div class="popup-posts__block">
            <p class="popup-posts__head">
              <translate>CTR</translate>
            </p>
            <p v-for="offer in item.offers" class="popup-posts__text">{{ offer.ctr ? offer.ctr + '%' : '&mdash;' }}</p>
          </div>
          <div class="popup-posts__block">
            <p class="popup-posts__head">
              <translate>Охват сторис</translate>
            </p>
            <p v-for="offer in item.offers" class="popup-posts__text">{{ offer.reach_stories || '&mdash;' }}</p>
          </div>
          <div class="popup-posts__block">
            <p class="popup-posts__head">
              <translate>Охват постов</translate>
            </p>
            <p v-for="offer in item.offers" class="popup-posts__text">{{ offer.reach_posts || '&mdash;' }}</p>
          </div>
        </div>
      </div>
      <div v-if="item.adverts && item.adverts.length">
        <div class="popup-info"></div>
        <h3 class="form-document__head">
          <translate>Рекламные посты в канале</translate>
        </h3>
        <div class="popup-posts-channel">
          <div class="popup-posts-channel__block">
            <p class="popup-posts-channel__head">
              <translate>Пост</translate>
            </p>
          </div>
          <div class="popup-posts-channel__block">
            <p class="popup-posts-channel__head">
              <translate>Просмотры</translate>
            </p>
          </div>
          <div class="popup-posts-channel__block">
            <p class="popup-posts-channel__head">
              <translate>Прирост</translate>
            </p>
          </div>
        </div>
        <div class="popup-posts-channel" v-for="(advert, index) in influencerAdvertsLimited" :key="index">
          <div class="popup-posts-channel__block">
            <p class="popup-posts-channel__text popup-posts-channel__text_post">
              <a :href="advert.link" target="_blank">
                {{ advert.name || '&mdash;' }}
              </a>
            </p>
          </div>
          <div class="popup-posts-channel__block">
            <p class="popup-posts-channel__text">{{ advert.views ? advert.views : '&mdash;' }}</p>
          </div>
          <div class="popup-posts-channel__block">
            <p class="popup-posts-channel__text">{{ advert.followers || '&mdash;' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import UiValueProgress from '@/components/ui/UiValueProgress'
import { NETWORK_LIST } from "@/config"
import InfluencerViewHour from '@/components/influencer/InfluencerViewHour'

export default {
  name: 'CampaignInfoPopup',
  components: { UiValueProgress, InfluencerViewHour },
  props: ['influencer', 'selection', 'likedBudget', 'likedCount', 'campaignBudget'],
  data() {
    return {
      loading: false,
      loadedInfluencer: {},
      selectedTab: '', // 'age' 'sex' 'geo'
      networkList: NETWORK_LIST
    }
  },
  methods: {
    ...mapActions(['getCampaignSelectionInfluencer']),
    loadSelectionInfluencer() {
      if (this.selection) {
        this.loading = true;
        this.getCampaignSelectionInfluencer(this.selection.id)
          .then((influencer) => {
            this.loadedInfluencer = influencer.data;
            this.loading = false;
            this.switchTab()
          })
      }
    },
    vote(result) {
      this.selection.result = result;
      this.$emit(`vote-${result}`);
    },
    switchTab() {
      console.log('changed item', this.item)
      if (this.item) {
        if (this.item.audience_age) {
          this.selectedTab = 'age'
        }
        else if (this.item.audience_gender) {
          this.selectedTab = 'sex'
        }
        else if (this.item.audience_geo) {
          this.selectedTab = 'geo'
        }
      }
    }
  },
  mounted() {
    this.loadSelectionInfluencer();
    this.switchTab()
  },
  watch: {
    selection: {
      deep: true,
      handler(newVal, oldVal) {
        if (newVal.id != oldVal.id) {
          this.loadSelectionInfluencer()
        }
      }
    }
  },
  computed: {
    item() {
      if (this.influencer) {
        return this.influencer
      }
      else if (this.selection) {
        return this.loadedInfluencer
      }
      else {
        return {}
      }
    },
    influencerAdvertsLimited() {
      if (this.influencer && this.influencer.adverts) {
        return this.influencer.adverts.slice(0, 6)
      }
      return []
    },
    viewHours() {
      if (this.influencer && this.influencer.views_by_hour) {
        return this.influencer.views_by_hour['absolute']
      }
      return {}
    }
  }
}
</script>

<style scoped lang="scss">
.overlay-bloger {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.54);
  z-index: 9999;
  overflow-x: hidden;
  overflow-y: scroll;

  @media (max-width: 480px) {
    width: 100%;
    background: var(--white);
  }
}

.popup_bloger {
  left: 50%;
  transform: translate(-50%, 0px);
}

.popup_selection {
  display: flex;
  flex-direction: row;
  padding-bottom: 20px;
  gap: 10px;
}

.selection-progress-row {
  display: flex;
  gap: 10px;
  border-bottom: 1px solid var(--very-light-gray);
  padding-bottom: 20px;
  margin-bottom: 24px;
}

.selection-help-text {
  display: flex;
  margin-bottom: 24px;
  gap: 24px;
  align-items: center;
}

.selection-help-text p {
  text-align: justify;
  color: #8c8c8c;
}

.selection-help-text img {
  max-width: 100px;
  border-radius: 50%;
}

.selection-help-text-second {
  display: flex;
  margin-bottom: 24px;
  gap: 24px;
  align-items: center;
}

.selection-help-text-second p {
  text-align: justify;
  color: #585858;
  font-size: 90%;
}

.selection-progress-row>* {
  flex: 1 1 0;
}

.selection-progress-budget {
  display: flex;
  justify-content: center;
  background: #d6edfc;
  border-radius: 8px;
  padding: 18px;
  position: relative;
}

.selection-progress-budget .progress {
  background: #b0dfff;
  border-radius: 8px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
  transition: all 0.5s ease;
}

.selection-progress-budget p {
  z-index: 10;
}

.selection-progress-influencer {
  display: flex;
  justify-content: center;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.76), rgba(255, 255, 255, 0.76)), #FDD835;
  border-radius: 8px;
  padding: 18px;
}
</style>
