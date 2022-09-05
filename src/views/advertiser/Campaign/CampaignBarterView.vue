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
          <div class="campaign-barter-filters">
            <form action="#" class="campaign-barter-filters__row">
              <div class="campaign-barter-filters__field search">
                <input v-model="filters.name" type="search" class="ui-form-field search"
                       placeholder="Поиск по имени, адресу">
              </div>
              <div class="campaign-barter-filters__field">
                <p class="form-document__text form-document__text_tabs form-document__text_filter"><translate>Отправлено</translate></p>
                <UiDatePicker
                    :value.sync="filters.sent_date"
                    class="ui-form-field"
                    placeholder="31.12.2021"
                />
              </div>
              <div class="campaign-barter-filters__field">
                <p class="form-document__text form-document__text_tabs form-document__text_filter"><translate>Доставлено</translate></p>
                <UiDatePicker
                    :value.sync="filters.recieved_date"
                    class="ui-form-field"
                    placeholder="31.12.2021"
                />
              </div>
              <div class="campaign-barter-filters__field action">
                <UiRefreshButton @refresh-emit="resetFilters"/>
              </div>
            </form>
          </div>
        </CampaignHead>

        <div class="main-content__inner" :key="scene">
          <template v-if="scene === 'loading'"><translate>Загружаем список бартеров...</translate></template>
          <template v-else-if="scene === 'error'">
            <translate>Не удалось получить список бартеров. Пожалуйста, попробуйте позже</translate>
          </template>
          <template v-else-if="scene === 'empty'"><translate>Список бартеров пуст</translate></template>
          <template v-else-if="scene === 'data'">
            <CampaignBarterList
                :sortBy.sync="filters.sortBy"
                :sortDesc.sync="filters.sortDesc"
                :perPage="filters.perPage"
                @open-popup="displayInfluencerPopup($event)"
                @reload-list="loadCompanyInfo()"
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
import UiRefreshButton from "@/components/ui/UiRefreshButton";
import UiPagination from "@/components/ui/UiPagination";
import UiDatePicker from "@/components/ui/UiDatePicker";
import CampaignInfoPopup from "@/components/campaign/CampaignInfoPopup";
import CampaignHead from "@/components/campaign/CampaignHead";
import CampaignTabs from "@/components/campaign/CampaignTabs";
import CampaignBarterList from "@/components/campaign/CampaignBarterList";
import {buildGetParams} from "@/functions/buildGetParams";

export default {
  name: 'CampaignBarterView',
  components: {
    CampaignInfoPopup,
    UiRefreshButton,
    UiPagination,
    UiDatePicker,
    CampaignHead,
    CampaignTabs,
    CampaignBarterList,
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
        sent_date: '',
        recieved_date: '',
        sortBy: 'name',
        sortDesc: false,
        page: 1,
        perPage: 50,
      },
      pageCount: 0,
    }
  },
  beforeCreate() {
    if (this.$route.query) {
      this.filters = {
        ...this.filters,
        name: this.$route.query.name || '',
        sent_date: this.$route.query.sent_date ? this.$route.query.sent_date.split('-').reverse().join('.') : '',
        recieved_date: this.$route.query.recieved_date ? this.$route.query.recieved_date.split('-').reverse().join('.') : '',
      }
    }
  },
  created() {
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

      this.getCampaignBarter({id: campaignId, query: buildGetParams(params)})
          .then(list => {
            this.scene = list.results.length > 0 ? 'data' : 'empty';
            this.pageCount = Math.ceil(list.count / this.filters.perPage) || 0;
          })
          .catch(err => this.scene = 'error');
    },
    displayInfluencerPopup(id) {
      this.getInfluencerData(id).then(response => {
        this.influencerData = response.data;
        this.isInfoPopupOpened = true;
      });
    },
    resetFilters() {
      this.filters = {
        name: '',
        sent_date: '',
        recieved_date: '',
        sortBy: 'name',
        sortDesc: false,
        page: 1,
        perPage: 10,
      }
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

      if (!!this.filters.sent_date) {
        filter.sent_date = [
          this.filters.sent_date.split('.').reverse().join('-') || undefined,
          this.filters.sent_date.split('.').reverse().join('-') || undefined
        ];
      }

      if (!!this.filters.recieved_date) {
        filter.recieved_date = [
          this.filters.recieved_date.split('.').reverse().join('-') || undefined,
          this.filters.recieved_date.split('.').reverse().join('-') || undefined
        ];
      }

      if (JSON.stringify(this.$route.query) === JSON.stringify(filter)) {
        return;
      }

      this.$router.replace({query: filter}).catch(()=>{});
    },
  },
  computed: {
    ...mapState({
      campaign: 'campaignData',
      transactions: 'transactionList',
    })
  },
}
</script>

<style scoped lang="scss">
.campaign-barter-filters__row {
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

.campaign-barter-filters__field {
  margin: .5rem;
  display: flex;
  align-items: center;
  @media (max-width: 655px) {
    flex-direction: column;
    align-items: stretch;
  }

  &.search {
    flex-basis: 72.7%;
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
