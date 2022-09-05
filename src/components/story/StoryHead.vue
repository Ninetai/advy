<template>
  <UiPageHead class="story-head">
    <template v-slot:title>
      <div class="story-head__title">
        <UiPageTitle :name="'cabinet'"><translate>История оплат</translate></UiPageTitle>
        <button @click.prevent="$emit('download-list')" type="button"
                class="download-btn download-btn_mob"></button>
      </div>
    </template>
    <template v-slot:action>
      <div class="story-filters filter filter_story">
        <form action="#" class="story-filters__row filter__form">
          <div v-if="accountsList && accountsList.length > 0" class="story-filters__field">
            <select v-model="currentAccount" @change="$emit('update:account', currentAccount)"
                    class="select select_field">
              <option :value="'all'" class="select__option"><translate>Выберите аккаунт</translate></option>
              <option v-for="account in accountsList" :value="account.id" class="select__option">
                {{ account.name }}
              </option>
            </select>
          </div>
          <div class="story-filters__field">
            <UiDateRangePicker
                :value.sync="currentDates"
                placeholder="31.12.2021 - 31.12.2021"
            />
          </div>
          <div v-if="statusList && statusList.length > 0" class="story-filters__field">
            <select v-model="currentStatus" @change="$emit('update:status', currentStatus)"
                    class="select select_field">
              <option :value="'all'" class="select__option"><translate>Выберите статус</translate></option>
              <option v-for="status in statusList" :key="status" :value="status"
                      class="select__option">{{ status }}
              </option>
            </select>
          </div>
          <div class="story-filters__field action">
            <UiRefreshButton class="story-filters__button" @refresh-emit="$emit('reset-filters')"/>
            <button @click.prevent="$emit('download-list')" type="button"
                    class="story-filters__button download-btn download-btn_desktop"><translate>Скачать</translate>
            </button>
          </div>
        </form>
      </div>
    </template>
  </UiPageHead>
</template>

<script>
import {mapActions, mapState} from "vuex";
import UiPageHead from '@/components/ui/UiPageHead';
import UiPageTitle from '@/components/ui/UiPageTitle';
import UiDateRangePicker from "@/components/ui/UiDateRangePicker";
import UiRefreshButton from "@/components/ui/UiRefreshButton";

export default {
  name: 'StoryHead',
  components: {
    UiPageHead,
    UiPageTitle,
    UiDateRangePicker,
    UiRefreshButton,
  },
  props: ['account', 'status', 'dates'],
  data() {
    return {
      isInProgress: false,
      currentAccount: '',
      currentStatus: '',
      currentDates: null,
      statusList: [],
    }
  },
  created() {
    this.loadStatusList();
  },
  watch: {
    account: {
        handler(value) {
          this.currentAccount = value;
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
    dates: {
        handler(value) {
          this.currentDates = value;
        },
        deep: true,
        immediate: true
    },
    currentDates(value) {
      this.$emit('update:dates', value)
    },
  },
  methods: {
    ...mapActions(['getTransactionStatuses']),
    loadStatusList() {
      this.getTransactionStatuses().then(response => {
        this.statusList = response.data;
      })
    },
  },
  computed: {
    ...mapState({
      accountsList: 'accountsList',
    }),
  },
}
</script>

<style scoped lang="scss">
.story-head__title {
  @media (max-width: 900px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.story-filters__row {
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

.story-filters__field {
  margin: .5rem;
  display: flex;
  align-items: center;
  @media (max-width: 655px) {
    flex-direction: column;
    align-items: stretch;
  }

  input, select {
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

.story-filters__button + .story-filters__button {
  margin-left: 1rem;
}
</style>
