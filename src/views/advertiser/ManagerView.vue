<template>
  <main>
    <div class="wrapper wrapper_main">
      <CampaignCreatePopup v-if="isNewCampaign" :mode="'create'" @close-popup="onPopupClose($event)" />
      <CampaignCreatePopup v-if="isEditCampaignPopupOpened" :id="editCampaignId" :mode="'edit'"
        @close-popup="onPopupClose($event)" />

      <!-- ADS companies -->
      <div class="main-content">
        <!-- <ManagerHead class="manager-page__head" @toggle-filters="isFiltersOpened = !isFiltersOpened"
          @create-campaign="isNewCampaign = true">
        </ManagerHead> -->
        <ManagerHeader :name.sync="filters.name" :status.sync="filters.status" :barter.sync="filters.barter"
          :budget-from.sync="filters.budgetFrom" :budget-to.sync="filters.budgetTo" :dates.sync="filters.dates">
        </ManagerHeader>


        <div class="main-content__inner" :key="scene" style="text-align:center; align-items:center;">
          <template v-if="scene === 'loading'">
            <translate>Загружаем список кампаний...</translate>
          </template>
          <template v-else-if="scene === 'error'">
            <translate>Не удалось получить список кампаний. Пожалуйста, попробуйте позже</translate>
          </template>
          <template v-else-if="scene === 'empty'">
            <translate>Список кампаний пуст</translate><br />
            <!-- <translate>Нет ни одной кампании соответствующей заданным параметрам. </translate><br />
            <translate>Добавьте кампанию или измените фильтры.</translate> -->
          </template>
          <template v-else-if="scene === 'data'">
            <ManagerList :sortBy.sync="filters.sortBy" :sortDesc.sync="filters.sortDesc" :perPage="filters.perPage"
              @reload-list="loadCampaignList" @open-edit-popup="openEditPopup($event)" />
            <UiPagination :page.sync="filters.page" :page-count.sync="pageCount" :per-page.sync="filters.perPage"
              :items="[5, 10, 15]" />
          </template>
        </div>
      </div>

    </div>
    <ManagerFoot />
  </main>
</template>

<script>
import { mapActions } from "vuex";
import ManagerList from '@/components/manager/ManagerList';
import ManagerHeader from '@/components/manager/ManagerHeader';
import ManagerFoot from '@/components/manager/ManagerFoot';
import CampaignCreatePopup from '@/components/campaign/CampaignCreatePopup';
import UiPagination from '@/components/ui/UiPagination';
import { buildGetParams } from "@/functions/buildGetParams";

export default {
  name: 'ManagerView',
  components: {
    CampaignCreatePopup,
    ManagerHeader,
    ManagerList,
    ManagerFoot,
    UiPagination,
  },
  data() {
    return {
      scene: 'loading',
      isFiltersOpened: false,
      accountsList: [],
      accountId: null,
      isNewCampaign: false,
      isEditCampaignPopupOpened: false,
      editCampaignId: null,
      totalCount: 0,
      pageCount: 0,
      filters: {
        name: '',
        status: 'all',
        dates: '',
        barter: 'all',
        budgetFrom: '',
        budgetTo: '',
        sortBy: 'name',
        sortDesc: false,
        page: 1,
        perPage: 10,
      },
    }
  },
  beforeCreate() {
    if (this.$route.query) {
      const dates = this.$route.query.dates;
      this.filters = {
        ...this.filters,
        name: this.$route.query.name || '',
        barter: this.$route.query.barter || 'all',
        dates: dates ? `${dates[0].split('-').reverse().join('.')} \u2013 ${dates[1].split('-').reverse().join('.')}` : '',
        budgetFrom: this.$route.query.budget ? this.$route.query.budget[0] : '',
        budgetTo: this.$route.query.budget ? this.$route.query.budget[1] : '',
        status: this.$route.query.status || 'all',
      }
    }
  },
  created() {
    this.loadPageInfo();
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', () => this.windowWidth = window.innerWidth);
    });
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
        this.loadCampaignList();
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(['getUsersAccount', 'getCampaignList', 'getUsersProfilePage']),
    onPopupClose(value) {
      this.isNewCampaign = false;
      this.isEditCampaignPopupOpened = false;
      if (value) {
        this.loadCampaignList();
      }
    },
    openEditPopup(id) {
      this.isEditCampaignPopupOpened = true;
      this.editCampaignId = id;
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

      if (!!this.filters.barter && this.filters.barter !== 'all') {
        filter.barter = this.filters.barter;
      } else {
        delete filter.barter;
      }

      if (!!this.filters.dates) {
        const [dateFrom, separator, dateTo] = this.filters.dates.split(' ');
        filter.dates = [dateFrom.split('.').reverse().join('-') || '', dateTo.split('.').reverse().join('-') || ''];
      }

      if (!!this.filters.budgetFrom || !!this.filters.budgetTo) {
        filter.budget = [this.filters.budgetFrom || '', this.filters.budgetTo || ''];
      }

      if (!!this.filters.status && this.filters.status !== 'all') {
        filter.status = [this.filters.status];
      }

      if (JSON.stringify(this.$route.query) === JSON.stringify(filter)) {
        return;
      }

      this.$router.push({ query: filter }).catch(() => {
      });
    },
    loadPageInfo() {
      this.getUsersAccount()
        .then((response) => this.accountId = response.data[0][0].id)
        .then(() => this.loadCampaignList())
    },
    loadCampaignList() {
      this.scene = 'loading';
      const accountId = this.accountId;
      let params = {};

      if (!accountId) {
        return;
      }

      if (this.$route.query) {
        params = {
          ...params,
          ...this.$route.query,
        }
        // console.log(params)
      }

      this.getCampaignList({ id: accountId, query: buildGetParams(params) })
        .then(list => {
          this.totalCount = list.count;
          this.pageCount = Math.ceil(this.totalCount / this.filters.perPage);
          this.scene = list.results && list.results.length > 0 ? 'data' : 'empty'
        })
        .catch(() => this.scene = 'error');
    },
  },
}
</script>

<style scoped lang="scss">

</style>
