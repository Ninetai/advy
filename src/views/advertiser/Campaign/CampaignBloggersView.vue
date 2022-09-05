<template>
  <main>
    <CampaignInfoPopup
        v-if="isInfoPopupOpened"
        :influencer="influencerData"
        @close-popup="isInfoPopupOpened = false"
    />

    <div class="wrapper wrapper_main">
      <!-- ADS companies -->
      <div class="main-content">
        <CampaignHead>
          <div class="campaign-bloggers-filter">
            <form action="#" class="campaign-bloggers-filter__row">
              <div class="campaign-bloggers-filter__field blogger">
                <input v-model="filters.name" type="search" class="ui-form-field search"
                       :placeholder="$gettext('Поиск по имени')">
              </div>
              <div class="campaign-bloggers-filter__field">
                <select v-model="filters.network" class="select select_field select_company">
                  <option value="" class="select__option"><translate>Соцсеть</translate></option>
                  <option v-for="(network, key) in networkList" :key="key" :value="key"
                          class="select__option">{{ network.name }}
                  </option>
                </select>
              </div>
              <div v-if="statusList && statusList.length > 0" class="campaign-bloggers-filter__field">
                <select v-model="filters.status" class="select select_field select_company">
                  <option value="" class="select__option"><translate>Статус</translate></option>
                  <option v-for="status in statusList" :key="status" :value="status"
                          class="select__option">{{ status }}
                  </option>
                </select>
              </div>
              <div class="campaign-bloggers-filter__field">
                <UiDateRangePicker
                    :value.sync="filters.dates"
                    class="ui-form-field"
                    placeholder="31.12.2021 - 31.12.2021"
                />
              </div>
              <div class="campaign-bloggers-filter__field action">
                <UiRefreshButton @refresh-emit="resetFilters"/>
              </div>
            </form>
          </div>
        </CampaignHead>

        <div class="main-content__inner" :key="scene">
          <template v-if="scene === 'loading'"><translate>Загружаем список блогеров...</translate></template>
          <template v-else-if="scene === 'error'">
            <translate>Не удалось получить список блогеров. Пожалуйста, попробуйте позже</translate>
          </template>
          <template v-else-if="scene === 'empty'"><translate>Список блогеров пуст</translate></template>
          <template v-else-if="scene === 'data'">
            <CampaignBloggersList
                :sortBy.sync="filters.sortBy"
                :sortDesc.sync="filters.sortDesc"
                :perPage="filters.perPage"
                @open-popup="displayInfluencerPopup($event)"
            />
            <UiPagination
                v-if="pageCount > 0"
                :page.sync="filters.page"
                :page-count.sync="pageCount"
                :per-page.sync="filters.perPage"
                :items="[10, 25, 50]"
            />
          </template>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {mapActions, mapState} from "vuex";
import UiDateRangePicker from '@/components/ui/UiDateRangePicker';
import UiRefreshButton from '@/components/ui/UiRefreshButton';
import UiPagination from '@/components/ui/UiPagination';
import CampaignHead from "@/components/campaign/CampaignHead";
import CampaignTabs from "@/components/campaign/CampaignTabs";
import CampaignBloggersList from "@/components/campaign/CampaignBloggerList";
import CampaignInfoPopup from "@/components/campaign/CampaignInfoPopup";
import {buildGetParams} from "@/functions/buildGetParams";
import { NETWORK_LIST } from "@/config";

export default {
  name: 'CampaignBloggersView',
  components: {
    UiDateRangePicker,
    UiRefreshButton,
    UiPagination,
    CampaignInfoPopup,
    CampaignHead,
    CampaignTabs,
    CampaignBloggersList,
  },
  data() {
    return {
      scene: 'loading',
      influencerData: null,
      isInfoPopupOpened: false,
      isEditPopupOpened: false,
      isStopPopupOpened: false,
      filters: {
        name: '',
        dates: '',
        status: '',
        network: '',
        sortBy: 'name',
        sortDesc: false,
        page: 1,
        perPage: 50,
      },
      pageCount: 0,
      statusList: [],
      networkList: NETWORK_LIST
    }
  },
  beforeCreate() {
    if (this.$route.query) {
      const dates = this.$route.query.dates;
      this.filters = {
        ...this.filters,
        name: this.$route.query.name || '',
        status: this.$route.query.status || '',
        network: this.$route.query.network || '',
        dates: dates ? `${dates[0].split('-').reverse().join('.')} \u2013 ${dates[1].split('-').reverse().join('.')}` : '',
      }
    }
  },
  created() {
    this.loadStatusList();
    this.loadCampaignDescription();
    this.loadCompanyInfo();
  },
  mounted() {
    this.$watch(vm => [vm.filters], () => {
      this.submitFilters();
    }, {
      immediate: true, // run immediately
      deep: true // detects changes inside objects. not needed here, but maybe in other cases
    })
  },
  watch: {
    $route: {
      handler() {
        if (!this.$route.query) {
          return;
        }

        this.loadCompanyInfo();
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions([
      'getCampaignInfo',
      'getCampaignDescription',
      'getCampaignInfluencers',
      'getCampaignResults',
      'getCampaignBarter',
      'getInfluencerData',
      'getCampaignStatuses',
      'getOfferStatuses',
    ]),
    loadCampaignDescription() {
      const campaignId = this.$route.params.id;

      this.getCampaignDescription(campaignId);
    },
    loadCompanyInfo() {
      this.scene = 'loading';
      const campaignId = this.$route.params.id;

      if (!campaignId) {
        this.$router.push({name: 'manager'});
      }

      let params = {};
      if (this.$route.query) {
        params = {
          ...params,
          ...this.$route.query,
        }
      }

      this.getCampaignInfluencers({id: campaignId, query: buildGetParams(params)})
          .then(list => {
            this.scene = list.results.length > 0 ? 'data' : 'empty';
            if (list.count) {
              this.pageCount = Math.ceil(list.count / this.filters.perPage) || 0;
            }
          }).catch(err => this.scene = 'error');
    },
    displayInfluencerPopup(id) {
      this.getInfluencerData(id).then(response => {
        this.influencerData = response.data;
        this.isInfoPopupOpened = true;
      });
    },
    submitFilters() {
      const filter = {};

      if (this.filters.page) {
        filter.page = this.filters.page;
      }

      if (this.filters.perPage) {
        filter.per_page = this.filters.perPage;
      }

      if (this.filters.sortDesc !== undefined && this.filters.sortBy !== undefined) {
        filter.ordering = this.filters.sortDesc ? `-${this.filters.sortBy}` : this.filters.sortBy;
      } else {
        delete filter.ordering;
      }

      if (!!this.filters.name) {
        filter.name = this.filters.name;
      }

      if (!!this.filters.dates) {
        const [dateFrom, separator, dateTo] = this.filters.dates.split(' ');
        if (dateFrom && dateTo) {
          filter.dates = [dateFrom.split('.').reverse().join('-') || '', dateTo.split('.').reverse().join('-') || ''];
        }
      }

      if (!!this.filters.status) {
        filter.status = [this.filters.status];
      }

      if (!!this.filters.network) {
        filter.network = [this.filters.network];
      }

      if (JSON.stringify(this.$route.query) === JSON.stringify(filter)) {
        return;
      }

      this.$router.replace({query: filter}).catch(() => {
      });
    },
    resetFilters() {
      this.filters = {
        name: '',
        dates: '',
        status: '',
        network: '',
      }
    },
    loadStatusList() {
      this.getOfferStatuses().then(response => {
        this.statusList = response.data;
      })
    },
  },
  computed: {
    ...mapState({
      campaign: 'campaignData',
      transactions: 'transactionList',
      totalCount: 'campaignInfluencersCount',
    }),
  },
}
</script>

<style scoped lang="scss">
.campaign-bloggers-filter__row {
  margin: 1rem -0.5rem -0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 1200px) {
    flex-wrap: wrap;
  }
  @media (max-width: 655px) {
    flex-direction: column;
    align-items: stretch;
  }
}

.campaign-bloggers-filter__field {
  margin: .5rem;
  display: flex;
  align-items: center;
  @media (max-width: 655px) {
    flex-direction: column;
    align-items: stretch;
  }

  &.blogger {
    flex-basis: 55%;
  }

  input, select {
    flex-basis: 100%;
  }

  &.action {
    @media (max-width: 1024px) {
      flex: 1 auto;
    }
  }
}
</style>
