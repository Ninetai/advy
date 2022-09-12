<template>
  <div class="filter filter_manager manager-filters">
    <form action="#" class="manager-filters__row">
      <div class="manager-filters__field">
        <input v-model="currentName" @change="$emit('update:name', currentName)" type="search"
          class="ui-form-field search" :placeholder="$gettext('Поиск по названию')">
      </div>
      <div class="manager-filters__field">
        <UiDateRangePicker :value.sync="currentDates" placeholder="31.12.2021 - 31.12.2021" />
      </div>
      <div v-if="statusList && statusList.length > 0" class="manager-filters__field">
        <select v-model="currentStatus" @change="$emit('update:status', currentStatus)"
          class="select select_field select_manager">
          <option :value="'all'" class="select__option">
            <translate>Выберите статус</translate>
          </option>
          <option v-for="status in statusList" :key="status" :value="status" class="select__option">{{ status }}
          </option>
        </select>
      </div>
      <div>
        <button class="setting_img">
          <img src="@/assets/list-buttons.svg" alt="" class="user__imag profile-link" style="cursor: pointer;">
        </button>
      </div>
      <!-- <div class="manager-filters__field">
        <p class="form-document__text form-document__text_filter form-document__text_manager">
          <translate>Бюджет</translate>
        </p>
        <input v-model.number="currentBudgetFrom" @input="$emit('update:budgetFrom', currentBudgetFrom)" type="text"
          class="ui-form-field budget" :placeholder="$gettext('От')">
        <p class="form-document__text form-document__text_divide">-</p>
        <input v-model.number="currentBudgetTo" @input="$emit('update:budgetTo', currentBudgetTo)" type="text"
          class="ui-form-field budget" :placeholder="$gettext('До')">
      </div>
      <div class="manager-filters__field">
        <p class="form-document__text form-document__text_filter form-document__text_manager">
          <translate>Бартер</translate>
        </p>
        <div class="filter__inner">
          <div v-for="value in barterList" class="filter__block">
            <label class="form-label form-label_filter">
              <span class="form-label__check-con form-label__check-filter">
                <input v-model="currentBarter" @change="$emit('update:barter', currentBarter)" class="form-label__check"
                  type="radio" name="check" :value="value.key" checked>
                <span class="form-label__marker form-label__marker_filter"></span>
              </span>
              <span class="form-label__name form-label__name_filter">{{ value.title }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="manager-filters__field action">
        <UiRefreshButton @refresh-emit="reset" />
      </div> -->
    </form>
    <div class="header__user">
      <TheNotificate />
      <TheUser />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import TheUser from '@/components/TheUser';
import TheNotificate from '@/components/TheNotificate';
import UiDateRangePicker from '@/components/ui/UiDateRangePicker'
import UiRefreshButton from '@/components/ui/UiRefreshButton'

export default {
  name: 'ManagerFilters',
  components: {
    UiDateRangePicker,
    UiRefreshButton,
    TheUser,
    TheNotificate,
  },
  props: [
    'name',
    'status',
    'barter',
    'budgetFrom',
    'budgetTo',
    'dates',
  ],
  data() {
    return {
      statusList: [],
      barterList: [{ key: 'all', title: this.$gettext('Все') }, { key: 'yes', title: this.$gettext('Да') }, { key: 'no', title: this.$gettext('Нет') }],
      currentName: '',
      currentStatus: '',
      currentDates: '',
      currentBarter: 'all',
      currentBudgetFrom: '',
      currentBudgetTo: '',
    }
  },
  created() {
    this.loadStatusList();
  },
  watch: {
    name: {
      handler(value) {
        this.currentName = value;
      },
      deep: true,
      immediate: true
    },
    status: {
      handler(value) {
        this.currentStatus = value;
      },
      deep: true,
      immediate: true
    },
    barter: {
      handler(value) {
        this.currentBarter = value;
      },
      deep: true,
      immediate: true
    },
    budgetFrom: {
      handler(value) {
        this.currentBudgetFrom = value;
      },
      deep: true,
      immediate: true
    },
    budgetTo: {
      handler(value) {
        this.currentBudgetTo = value;
      },
      deep: true,
      immediate: true
    },
    dates: {
      handler(value) {
        this.currentDates = value;
      },
      deep: true,
      immediate: true
    },
    currentDates(value) {
      this.$emit('update:dates', value)
    }
  },
  methods: {
    ...mapActions(['getCampaignStatuses', 'getUsersAccount', 'getUsersProfilePage']),
    reset() {
      this.$emit('update:name', '');
      this.$emit('update:status', '');
      this.$emit('update:dates', '');
      this.$emit('update:barter', 'all')
      this.$emit('update:budgetFrom', '')
      this.$emit('update:budgetTo', '')
    },
    loadStatusList() {
      this.getUsersAccount()
        .then((response) => this.accountId = response.data[0][0].id)
        .then(() => this.getUsersProfilePage(this.accountId));
      this.getCampaignStatuses().then(response => {
        this.statusList = response.data;
      })
    },
  },
}
</script>

<style scoped lang="scss">
.manager-filters__row {
  margin: 0 -.5rem;
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

.manager-filters__field {
  margin: .5rem;
  display: flex;
  align-items: center;

  @media (max-width: 655px) {
    flex-direction: column;
    align-items: stretch;
  }

  input,
  select {
    flex-basis: 100%;
  }

  .ui-form-field.budget {
    @media (min-width: 655.02px) {
      max-width: 90px;
    }
  }

  &.action {
    @media (max-width: 1024px) {
      flex: 1 auto;
    }
  }
}

.header__user {
  display: flex;
  align-items: center;
  justify-content: center;
}

.setting_img {
  padding: 7px;
  margin-left: 15px;
  background-color: white;
  border-radius: 50%;
  display: flex;
}
</style>
