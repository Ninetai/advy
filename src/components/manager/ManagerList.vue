<template>
  <div data-app v-if="windowWidth >= 1024">
    <v-data-table class="table manager-list" :headers="headers" :items="campaignList" :itemsPerPage="perPage"
      :sort-by.sync="currentSortBy" :sort-desc.sync="currentSortDesc" dense hide-default-footer
      @page-count="pageCount = $event">
      <template v-slot:item="{ item }">
        <tr>
          <td class="manager-list__cell name">
            <router-link :to="{
               name: 'campaign',
               params: { id: item.id },
            }" class="manager-list__link" style="color:black;">
              {{ item.name }}
              <small>{{ item.comment }}</small>
            </router-link>
          </td>
          <td class="manager-list__cell status">
            <UiStatus :status="item.status" />
          </td>
          <td class="manager-list__cell date">{{ item.start_date }} - {{ item.end_date }}</td>
          <td class="manager-list__cell reach">{{ item.offers_reach }}</td>
          <td class="manager-list__cell ctr">{{ item.offers_ctr }}%</td>
          <td class="manager-list__cell spend">$&nbsp;{{ item.offers_spend }}</td>
          <td class="manager-list__cell budget">$&nbsp;{{ item.budget }}</td>
          <td class="manager-list__cell conversions">{{ item.offers_conversions }}</td>
          <td class="manager-list__cell barter">
            <span class="card-type card-type_company text-hidden">
              <translate>Бартер</translate>
            </span>
            <span class="ui-barter" :class="{'yes': item.barter !== 'no'}">{{ item.barter }}</span>
          </td>
          <td class="manager-list__cell action">
            <UiDropdown>
              <a @click.prevent="displayUpdateCampaignPopup(item.id)" href="#"
                class="dropdown__link dropdown__link_edit edit_campaign_link">
                <translate>Редактировать</translate>
              </a>
              <a @click.prevent="duplicateCampaign(item.id)" href="#" class="dropdown__link dropdown__link_copy">
                <translate>Дублировать</translate>
              </a>
              <a @click.prevent="payCampaign(item.id)" href="#" class="dropdown__link dropdown__link_pay">
                <translate>Оплата и запуск</translate>
              </a>
              <a @click.prevent="deleteCampaign(item.id)" href="#" class="dropdown__link dropdown__link_delete">
                <translate>Удалить</translate>
              </a>
            </UiDropdown>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>

  <div v-else>
    <UiCard v-for="campaign in campaignList" :key="campaign.id" class="ui-item-card">
      <div class="ui-item-card__name" style="cursor:pointer">
        <div @click="toggleItem(campaign.id)" class="ui-item-card__header">
          <router-link :to="{
             name: 'campaign',
             params: { id: campaign.id },
          }" class="ui-item-card__link" style="color:black;">
            {{ campaign.name }}
            <small>{{ campaign.comment }}</small>
          </router-link>
          <div class="ui-item-card__period">
            {{ campaign.start_date }} - {{ campaign.end_date }}
          </div>
          <div class="ui-item-card__status">
            <UiStatus :status="campaign.status" />
          </div>
        </div>
      </div>
      <div v-show="selectedItem === campaign.id" class="ui-item-card__inner">
        <div class="ui-item-card__item">
          <span class="ui-item-card__item-title">
            <translate>Охват</translate>
          </span>
          {{ campaign.offers_reach }}
        </div>
        <div class="ui-item-card__item">
          <span class="ui-item-card__item-title">
            <translate>CTR</translate>
          </span>
          {{ campaign.offers_ctr }}%
        </div>
        <div class="ui-item-card__item">
          <span class="ui-item-card__item-title">
            <translate>Расходы</translate>
          </span>
          $&nbsp;{{ campaign.offers_spend }}
        </div>
        <div class="ui-item-card__item">
          <span class="ui-item-card__item-title">
            <translate>Бюджет</translate>
          </span>
          $&nbsp;{{ campaign.budget }}
        </div>
        <div class="ui-item-card__item">
          <span class="ui-item-card__item-title">
            <translate>Переходы</translate>
          </span>
          {{ campaign.offers_conversions }}
        </div>
        <div class="ui-item-card__item">
          <span class="ui-item-card__item-title">
            <translate>Бартер</translate>
          </span>
          <span class="ui-barter" :class="{'yes': campaign.barter !== 'no'}">{{ campaign.barter }}</span>
        </div>
        <div class="ui-item-card__item wide">
          <UiDropdown>
            <a @click.prevent="displayUpdateCampaignPopup(campaign.id)" href="#"
              class="dropdown__link dropdown__link_edit edit_campaign_link">
              <translate>Редактировать</translate>
            </a>
            <a @click.prevent="duplicateCampaign(campaign.id)" href="#" class="dropdown__link dropdown__link_copy">
              <translate>Дублировать</translate>
            </a>
            <a @click.prevent="payCampaign(campaign.id)" href="#" class="dropdown__link dropdown__link_pay">
              <translate>Оплата и запуск</translate>
            </a>
            <a @click.prevent="deleteCampaign(campaign.id)" href="#" class="dropdown__link dropdown__link_delete">
              <translate>Удалить</translate>
            </a>
          </UiDropdown>
        </div>
      </div>
    </UiCard>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import UiStatus from '@/components/ui/UiStatus';
import UiDropdown from '@/components/ui/UiDropdown';
import UiCard from "@/components/ui/UiCard";

export default {
  name: 'ManagerList',
  components: {
    UiCard,
    UiStatus,
    UiDropdown,
  },
  props: ['sortBy', 'perPage', 'sortDesc'],
  data() {
    return {
      headers: [
        { text: this.$gettext('Название'), value: 'name', class: 'manager-list__cell name' },
        { text: this.$gettext('Статус'), value: 'status', class: 'manager-list__cell status' },
        { text: this.$gettext('Период'), value: 'date', class: 'manager-list__cell date', sortable: false },
        { text: this.$gettext('Охват'), value: 'reach', class: 'manager-list__cell reach', sortable: false },
        { text: this.$gettext('CTR'), value: 'ctr', class: 'manager-list__cell ctr', sortable: false },
        { text: this.$gettext('Расходы'), value: 'spend', class: 'manager-list__cell spend', sortable: false },
        { text: this.$gettext('Бюджет'), value: 'budget', class: 'manager-list__cell budget' },
        { text: this.$gettext('Переходы'), value: 'conversions', class: 'manager-list__cell conversions', sortable: false },
        { text: this.$gettext('Бартер'), value: 'barter', class: 'manager-list__cell barter' },
        { text: ' ', value: 'action', class: 'manager-list__cell action', sortable: false },
      ],
      selectedItem: null,
      windowWidth: window.innerWidth,
      currentSortBy: 'name',
      currentSortDesc: false,
      page: 1,
      pageCount: 0,
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
  created() {
    this.pageCount = Math.round(this.totalCount / this.perPage);
  },
  methods: {
    ...mapActions(['putCampaignDuplicate', 'putCampaignDelete', 'putCampaignPayment']),
    displayUpdateCampaignPopup(campaignId) {
      this.$emit('open-edit-popup', campaignId);
    },
    duplicateCampaign(campaignId) {
      this.putCampaignDuplicate(campaignId).then(() => this.$emit('reload-list'));
    },
    payCampaign(campaignId) {
      //@todo добавить обработку ошибок
      this.putCampaignPayment(campaignId).then(() => this.$emit('reload-list'))
    },
    deleteCampaign(campaignId) {
      this.putCampaignDelete(campaignId).then(() => this.$emit('reload-list'))
    },
    toggleItem(id) {
      this.selectedItem === id ? this.selectedItem = null : this.selectedItem = id;
    },
  },
  computed: {
    ...mapState({
      campaignList: 'campaignList',
      totalCount: 'campaignTotalCount'
    }),
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', () => this.windowWidth = window.innerWidth);
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', () => this.windowWidth = window.innerWidth);
  },
}
</script>

<style scoped lang="scss">
.manager-list__cell {
  text-align: center;

  &.name {
    text-align: left;
  }

  &.reach,
  &.ctr,
  &.spend,
  &.budget,
  &.conversions,
  &.barter {
    max-width: 4rem;
  }

  &.action {
    max-width: 3.2rem;
  }
}

.manager-list__link {
  small {
    display: block;
    font-weight: 400;
    color: grey;
  }
}

.v-data-table__wrapper {
  overflow: hidden;
}
</style>
