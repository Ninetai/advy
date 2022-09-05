<template>
  <main>
    <IsInProgressPopup
        v-show="isInProgress"
        @close-popup="isInProgress = false"
    />
    <div class="wrapper wrapper_main">
      <!-- ADS companies -->
      <div class="main-content story">
        <StoryHead
            :account.sync="filters.account"
            :status.sync="filters.status"
            :dates.sync="filters.dates"
            @download-list="isInProgress = true"
            @reset-filters="resetFilters()"
        />

        <StoryList
            class="story__table"
            :sortBy.sync="filters.sortBy"
            :sortDesc.sync="filters.sortDesc"
            @download-item="isInProgress = true"
        />
        <!--<UiPagination
            v-if="transactionList && transactionList.length > 0 && pageCount > 0"
            :page.sync="filters.page"
            :page-count.sync="pageCount"
            :per-page.sync="filters.perPage"
            :items="[5, 10, 15]"
        />-->
      </div>
    </div>
  </main>
</template>

<script>
import {mapActions, mapState} from "vuex";
import UiPagination from "@/components/ui/UiPagination";
import StoryHead from "@/components/story/StoryHead";
import StoryList from "@/components/story/StoryList";
import IsInProgressPopup from "@/components/IsInProgressPopup";
import {buildGetParams} from "@/functions/buildGetParams";

export default {
  name: 'StoryView',
  components: {
    UiPagination,
    StoryHead,
    StoryList,
    IsInProgressPopup,
  },
  data() {
    return {
      isInProgress: false,
      filters: {
        account: 'all',
        status: 'all',
        dates: null,
        // sortBy: 'name',
        // sortDesc: false,
        // page: 1,
        // perPage: 10,
      },
      pageCount: 0,
    }
  },
  beforeCreate() {
    if (this.$route.query) {
      const dates = this.$route.query.dates;
      this.filters = {
        ...this.filters,
        account: this.$route.query.account || 'all',
        status: this.$route.query.status || 'all',
        dates: dates ? `${dates[0].split('-').reverse().join('.')} \u2013 ${dates[1].split('-').reverse().join('.')}` : '',
      }
    }
  },
  created() {
    this.updateTransactions();
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
        this.updateTransactions();
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(['getTransactionsList']),
    updateTransactions() {
      let accountId = this.$route.params.id;
      let params = {};

      if (this.$route.query) {
        params = {
          ...params,
          ...this.$route.query,
        }
      }
      this.getTransactionsList({id: accountId, query: buildGetParams(params)}).then(list => {
        if (list.count) {
          this.pageCount = Math.ceil(list.count / this.filters.perPage) || 0;
        }
      });
    },
    submitFilters() {
      const filter = {};

      // if (this.filters.page) {
      //   filter.page = this.filters.page;
      // }

      // if (this.filters.perPage) {
      //   filter.per_page = this.filters.perPage;
      // }

      // if (this.filters.sortDesc !== undefined && this.filters.sortBy !== undefined) {
      //   filter.ordering = this.filters.sortDesc ? `-${this.filters.sortBy}` : this.filters.sortBy;
      // } else {
      //   delete filter.ordering;
      // }

      if (!!this.filters.account && this.filters.account !== 'all') {
        filter.status = [this.filters.account];
      }

      if (!!this.filters.status && this.filters.status !== 'all') {
        filter.status = [this.filters.status];
      }

      if (!!this.filters.dates) {
        const [dateFrom, separator, dateTo] = this.filters.dates.split(' ');
        filter.dates = [dateFrom.split('.').reverse().join('-') || '', dateTo.split('.').reverse().join('-') || ''];
      }

      if (JSON.stringify(this.$route.query) === JSON.stringify(filter)) {
        return;
      }

      this.$router.push({query: filter}).catch(() => {
      });
    },
    resetFilters() {
      this.filters = {
        account: 'all',
        status: 'all',
        dates: null,
        sortBy: 'name',
        sortDesc: false,
      }
    },
  },
  computed: {
    ...mapState({
      transactionList: 'transactionList',
    }),
  },
}
</script>

<style scoped>
.story__table {
  margin-top: 1rem;
}
</style>
