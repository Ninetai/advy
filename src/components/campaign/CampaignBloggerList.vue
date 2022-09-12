<template>
  <div class="tab-block" id="tab2">
    <v-data-table v-if="windowWidth >= 1024" class="table manager-list" :headers="headers" :items="influencers"
      :itemsPerPage="perPage" :sort-by.sync="currentSortBy" :sort-desc.sync="currentSortDesc" hide-default-footer>
      <template v-slot:item="{ item }">
        <tr>
          <td class="campaign-bloggers-list__cell name">
            <a :href="networkList[item.influencer_network].link + item.influencer_network_account" target="_blank"
              class="icon-social" :class="[item.influencer_network]"></a>
            <a @click.prevent="$emit('open-popup', item.id)" href="#">{{ item.full_name }}</a>
          </td>
          <td class="campaign-bloggers-list__cell period">
            <span v-if="item && item.placement_date">
              {{ new Date(item.placement_date).toLocaleDateString("en-GB") || '&ndash;' }}
            </span>
            <span v-else>
              &ndash;
            </span>
          </td>
          <td class="campaign-bloggers-list__cell ctr">
            {{ item.influencer_er ? item.influencer_er.toFixed(0) : '0' }}%
          </td>
          <td class="campaign-bloggers-list__cell coverage">{{ item.influencer_reach_stories }}
            <img v-if="!item.influencer_reach_stories" class="opacity" src="@/assets/lock-alt.svg" />
          </td>
          <td class="campaign-bloggers-list__cell posts">{{ item.influencer_reach_post }}
            <img v-if="!item.influencer_reach_post" class="opacity" src="@/assets/lock-alt.svg" />
          </td>
          <!--td class="campaign-bloggers-list__cell costs">$ {{ item.spend }}</td>
          <td class="campaign-bloggers-list__cell crossing">$ {{ item.price }}</td>
          <td class="campaign-bloggers-list__cell barter">
            <span class="ui-barter" :class="{'yes': item.influencer_barter}">{{ item.influencer_barter }}</span>
          </td-->
        </tr>
      </template>
    </v-data-table>

    <div v-else>
      <UiCard v-for="influencer in influencers" :key="influencer.id" class="ui-item-card">
        <div @click="toggleItem(influencer.id)" class="ui-item-card__header">
          <div class="ui-item-card__header-item">
            <a :href="networkList[influencer.influencer_network].link + influencer.influencer_network_account"
              target="_blank" class="icon-social" :class="[influencer.influencer_network]"></a>
            <span @click="$emit('open-popup', influencer.id)">
              {{ influencer.full_name }}
            </span>
          </div>
          <div class="ui-item-card__header-item">
            <span v-if="influencer.placement_date">
              {{ new Date(influencer.placement_date2hh).toLocaleDateString("en-GB") || '&ndash;' }}
            </span>
            <span v-else>
              &ndash;
            </span>
          </div>
        </div>
        <div v-show="selectedItem === influencer.id" class="ui-item-card__inner">
          <div class="ui-item-card__item">
            <span class="ui-item-card__item-title">
              <translate>ER</translate>
            </span>
            {{ influencer.influencer_er ? influencer.influencer_er.toFixed(0) : '0' }}%
          </div>
          <div class="ui-item-card__item">
            <span class="ui-item-card__item-title">
              <translate>Охват сторис</translate>
            </span>
            {{ influencer.influencer_reach_stories }}
            <img v-if="!influencer.influencer_reach_stories" class="opacity" src="@/assets/lock-alt.svg" />
          </div>
          <div class="ui-item-card__item">
            <span class="ui-item-card__item-title">
              <translate>Охват постов</translate>
            </span>
            {{ influencer.influencer_reach_post }}
            <img v-if="!influencer.influencer_reach_post" class="opacity" src="@/assets/lock-alt.svg" />
          </div>
          <!--div class="ui-item-card__item">
            <span class="ui-item-card__item-title"><translate>Расходы</translate></span>
            $ {{ influencer.spend }}
          </div>
          <div class="ui-item-card__item">
            <span class="ui-item-card__item-title"><translate>Цена</translate></span>
            $ {{ influencer.price }}
          </div>
          <div class="ui-item-card__item">
            <span class="ui-item-card__item-title"><translate>Бартер</translate></span>
            <span class="ui-barter" :class="{'yes': influencer.influencer_barter}">
              {{ influencer.influencer_barter }}
            </span>
          </div-->
        </div>
      </UiCard>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UiCard from '@/components/ui/UiCard'
import UiStatus from '@/components/ui/UiStatus'
import { NETWORK_LIST } from "@/config";

export default {
  name: 'CampaignBloggersList',
  components: {
    UiCard,
    UiStatus,
  },
  props: ['sortBy', 'perPage', 'sortDesc'],
  data() {
    return {
      headers: [
        { text: this.$gettext('Блогер'), value: 'name', class: 'campaign-bloggers-list__cell name' },
        { text: this.$gettext('Размещение'), value: 'date', class: 'campaign-bloggers-list__cell period' },
        { text: this.$gettext('ER'), value: 'er', class: 'campaign-bloggers-list__cell ctr' },
        { text: this.$gettext('Охват сторис'), value: 'reach_stories', class: 'campaign-bloggers-list__cell coverage' },
        { text: this.$gettext('Охваты постов'), value: 'reach_post', class: 'campaign-bloggers-list__cell posts' },
        //{text: this.$gettext('Расходы, $'), value: 'costs', class: 'campaign-bloggers-list__cell costs'},
        //{text: this.$gettext('Цена, $'), value: 'crossing', class: 'campaign-bloggers-list__cell crossing'},
        //{text: this.$gettext('Бартер'), value: 'barter', class: 'campaign-bloggers-list__cell barter'},
      ],
      currentSortBy: 'name',
      currentSortDesc: false,
      selectedItem: null,
      windowWidth: window.innerWidth,
      networkList: NETWORK_LIST
    }
  },
  watch: {
    sortBy: {
      handler(value) {
        this.currentSortBy = value;
      },
      deep: true,
      immediate: true
    },
    currentSortBy(value) {
      this.$emit('update:sortBy', value)
    },
    sortDesc: {
      handler(value) {
        this.currentSortDesc = value;
      },
      deep: true,
      immediate: true
    },
    currentSortDesc(value) {
      this.$emit('update:sortDesc', value)
    }
  },
  methods: {
    toggleItem(id) {
      this.selectedItem === id ? this.selectedItem = null : this.selectedItem = id;
    },
  },
  computed: {
    ...mapState({ influencers: 'campaignInfluencers' }),
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', () => this.windowWidth = window.innerWidth);
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', () => this.windowWidth = window.innerWidth);
  },
}
</script>

<style scoped lang="scss">
.opacity {
  opacity: 0.5;
}

.campaign-bloggers-list__cell {
  text-align: center;

  &.name {
    text-align: left;
  }
}
</style>
