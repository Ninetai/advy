<template>
  <div class="tab-block">
    <div class="tab-block__inner">
      <v-data-table v-if="windowWidth >= 1024"
                    :headers="headers"
                    :items="results"
                    :itemsPerPage="perPage"
                    :sort-by.sync="currentSortBy"
                    :sort-desc.sync="currentSortDesc"
                    class="table"
                    hide-default-footer>
        <template v-slot:item="{ item }">
          <tr>
            <td class="campaign-result-list__cell id">
              <a :href="networkList[item.influencer_network].link + item.influencer_network_account" target="_blank" class="icon-social" :class="[item.influencer_network]"></a>
              <a @click.prevent="$emit('open-popup', item.id)" href="#">{{ item.full_name }}</a>
            </td>
            <td class="campaign-result-list__cell">
              <span v-if="item.placement_date">
                {{ new Date(item.placement_date).toLocaleDateString("en-GB") || '&mdash;' }}
              </span>
              <span v-else>
                &mdash;
              </span>
            </td>
            <td class="campaign-result-list__cell">{{ (item.ctr).toFixed(0) || 0 }}%</td>
            <td class="campaign-result-list__cell">{{ item.reach_stories || 0 }}</td>
            <td class="campaign-result-list__cell">{{ item.reach_posts || 0 }}</td>
            <!--td class="campaign-result-list__cell">$&nbsp;{{ item.price }}</td-->
          </tr>
        </template>
      </v-data-table>

      <div v-else>
        <UiCard v-for="result in results" :key="result.id" class="ui-item-card">
          <div @click="toggleItem(result.id)" class="ui-item-card__header">
            <div class="ui-item-card__header-item">
              <a :href="networkList[result.influencer_network].link + result.influencer_network_account" target="_blank" class="icon-social" :class="[result.influencer_network]"></a>
              <span @click="$emit('open-popup', result.id)">
                {{ result.full_name }}
              </span>
            </div>
            <div class="ui-item-card__header-title ui-item-card__period">
              <span v-if="result && result.placement_date">
                {{ new Date(result.placement_date).toLocaleDateString("en-GB") || '&mdash;' }}
              </span>
              <span v-else>
                &ndash;
              </span>
            </div>
          </div>
          <div v-show="selectedItem === result.id" class="ui-item-card__inner">
            <div class="ui-item-card__item double">
              <span class="ui-item-card__item-title"><translate>ER</translate></span>
              {{ (result.ctr).toFixed(0) || 0 }}%
            </div>
            <div class="ui-item-card__item double">
              <span class="ui-item-card__item-title"><translate>Охват сторис</translate></span>
              {{ result.reach_stories || 0 }}
            </div>
            <div class="ui-item-card__item double">
              <span class="ui-item-card__item-title"><translate>Охват постов</translate></span>
              {{ result.reach_posts || 0 }}
            </div>
            <!--div class="ui-item-card__item double">
              <span class="ui-item-card__item-title"><translate>Цена</translate></span>
              ${{ result.price }}
            </div-->
          </div>
        </UiCard>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import UiCard from '@/components/ui/UiCard';
import { NETWORK_LIST } from "@/config";

export default {
  name: 'CampaignResultList',
  components: {
    UiCard,
  },
  props: ['sortBy', 'perPage', 'sortDesc'],
  data() {
    return {
      headers: [
        //  id, price, date, ctr, reach_stories, reach_posts
        {text: this.$gettext('Блогер'), value: 'id', class: 'campaign-result-list__cell id'},
        {text: this.$gettext('Размещение'), value: 'date', class: 'campaign-result-list__cell date'},
        {text: this.$gettext('CTR'), value: 'ctr', class: 'campaign-result-list__cell ctr'},
        {text: this.$gettext('Охват сторис'), value: 'reach_stories', class: 'campaign-result-list__cell reach_stories'},
        {text: this.$gettext('Охваты постов'), value: 'reach_posts', class: 'campaign-result-list__cell reach_posts'},
        //{text: this.$gettext('Цена, $'), value: 'price', class: 'campaign-result-list__cell price'},
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
    ...mapState({results: 'campaignResults'}),
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
.campaign-result-list__cell {
  text-align: center;

  &.id {
    text-align: left;
  }
}
</style>
