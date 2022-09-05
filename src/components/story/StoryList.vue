<template>
  <v-data-table v-if="windowWidth >= 1024"
                class="table story-list"
                :headers="headers"
                :items="transactionList"
                :sort-by.sync="currentSortBy"
                :sort-desc.sync="currentSortDesc"
                :no-data-text="$gettext('История оплат пуста')"
                hide-default-footer>
    <template v-slot:item="{ item }">
      <tr>
        <td class="story-list__cell id">{{ item.ref_id }}</td>
        <td class="story-list__cell">{{ new Date(item.created_at).toLocaleDateString() }}</td>
        <td class="story-list__cell">$&nbsp;{{ item.amount }}</td>
        <td class="story-list__cell">
          <span class="card-type text-hidden"><translate>Visa</translate></span>
          {{ item.type || '&mdash;' }}
        </td>
        <td class="story-list__cell">
          <UiStatus :status="item.status"/>
        </td>
        <td class="story-list__cell">
          <span class="account-number text-hidden"><translate>Номер счета</translate></span> {{ item.account }}
        </td>
        <td class="story-list__cell download">
          <div @click.prevent="$emit('download-item')" class="story-list__download"><translate>Скачать</translate></div>
        </td>
      </tr>
    </template>
  </v-data-table>
  <div v-else>
    <UiCard v-for="transaction in transactionList" :key="transaction.id" class="ui-item-card">
      <div class="ui-item-card__header">
        <div class="ui-item-card__header-item">
          {{ transaction.ref_id }}
        </div>
        <div class="ui-item-card__header-item">
          {{ new Date(transaction.created_at).toLocaleDateString() }}
        </div>
        <div class="ui-item-card__header-item">
          $ {{ transaction.amount }}
        </div>
      </div>
      <div class="ui-item-card__inner">
        <div class="ui-item-card__item">
          <span class="ui-item-card__item-title"><translate>Visa</translate></span> {{ transaction.type || '&mdash;' }}
        </div>
        <div class="ui-item-card__item">
          <UiStatus :status="transaction.status"/>
        </div>
        <div class="ui-item-card__item">
          <span class="ui-item-card__item-title"><translate>Номер счета</translate></span> {{ transaction.account }}
        </div>
        <div class="ui-item-card__item wide">
          <div @click.prevent="$emit('download-item')" class="story-list__download"><translate>Скачать</translate></div>
        </div>
      </div>
    </UiCard>
  </div>
</template>

<script>
import {mapState} from "vuex";
import UiCard from "@/components/ui/UiCard";
import UiStatus from "@/components/ui/UiStatus";

export default {
  name: 'StoryList',
  components: {UiCard, UiStatus},
  data() {
    return {
      headers: [
        {text: this.$gettext('ID'), value: 'id', class: 'story-list__cell id', sortable: false},
        {text: this.$gettext('Дата операции'), value: 'date', class: 'story-list__cell', sortable: false},
        {text: this.$gettext('Сумма'), value: 'summ', class: 'story-list__cell', sortable: false},
        {text: this.$gettext('Номер карты'), value: 'card', class: 'story-list__cell', sortable: false},
        {text: this.$gettext('Статус'), value: 'status', class: 'story-list__cell', sortable: false},
        {text: this.$gettext('Номер счета'), value: 'number', class: 'story-list__cell', sortable: false},
        {text: ' ', value: 'download', class: 'story-list__cell download', sortable: false},
      ],
      currentSortBy: 'name',
      currentSortDesc: false,
      windowWidth: window.innerWidth,
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
  computed: {
    ...mapState(['transactionList']),
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
.story-list__cell {
  text-align: center;

  &.id {
    max-width: 2rem;
  }

  &.download {
    max-width: 2rem;
  }
}

.story-list__download {
  cursor: pointer;
  background-color: var(--very-light-gray);
  @media (min-width: 768.02px) {
    height: 1.5rem;
    width: 1.5rem;
    font-size: 0;
    mask: url('@/assets/icons/download.svg') center / contain no-repeat;
    -webkit-mask: url('@/assets/icons/download.svg') center / contain no-repeat;
  }
  @media (max-width: 768px) {
    padding-left: 20px;
    font-size: var(--body-small);
    font-weight: 500;
    text-align: left;
    color: var(--blue);
    mask: none;
    -webkit-mask: none;
    background: transparent url('@/assets/icons/download-blue.svg') center left / 14px no-repeat;
  }

  &:hover {
    background-color: var(--blue);
    @media (max-width: 768px) {
      background-color: transparent;
    }
  }
}
</style>
