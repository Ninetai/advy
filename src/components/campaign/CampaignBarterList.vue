<template>
  <v-data-table v-if="windowWidth >= 1024"
                class="table"
                :headers="headers"
                :items="barters"
                :itemsPerPage="perPage"
                :sort-by.sync="currentSortBy"
                :sort-desc.sync="currentSortDesc"
                hide-default-footer>
    <template v-slot:item="{ item }">
      <tr>
        <td class="campaign-barter-list__cell name">
          <a :href="networkList[item.influencer_network].link + item.influencer_network_account" target="_blank" class="icon-social" :class="[item.influencer_network]"></a>
          <a @click.prevent="$emit('open-popup', item.id)" href="#">{{ item.full_name }}</a>
        </td>
        <td class="campaign-barter-list__cell address">{{ item.address || `&mdash;` }}</td>
        <td class="campaign-barter-list__cell phone">{{ item.phone || `&mdash;` }}</td>
        <td class="campaign-barter-list__cell sent_date">
          <span class="card-type card-type_company text-hidden"><translate>Отправлено</translate></span>
          <template v-if="item.sent_date">{{ item.sent_date|date }}</template>
          <template v-else>
            <UiDatePicker
                :value.sync="form[item.id]"
                @picker-change="changeBarterDate(form[item.id], item.id)"
            />
          </template>
        </td>
        <td class="campaign-barter-list__cell recieved_date">
          <span class="card-type card-type_company text-hidden"><translate>Доставлено</translate></span>
          {{ item.received_date || '&mdash;' }}
        </td>
      </tr>
    </template>
  </v-data-table>

  <div v-else>
    <UiCard v-for="barter in barters" :key="barter.id" class="ui-item-card">
      <div class="ui-item-card__header">
        <div class="ui-item-card__header-item">
          <a :href="networkList[barter.influencer_network].link + barter.influencer_network_account" target="_blank" class="icon-social" :class="[barter.influencer_network]"></a>
          <span @click="$emit('open-popup', barter.id)">
            {{ barter.full_name }}
          </span>
        </div>
        <div class="ui-item-card__header-title">{{ barter.address || '&mdash;' }}</div>
        <div class="ui-item-card__header-title">{{ barter.phone || '&mdash;' }}</div>
      </div>
      <div class="ui-item-card__inner">
        <div class="ui-item-card__item double">
          <span class="ui-item-card__item-title"><translate>Отправлено</translate></span>
          <template v-if="barter.sent_date">{{ barter.sent_date|date }}</template>
          <template v-else>
            <UiDatePicker
                :value.sync="form[barter.id]"
                @picker-change="changeBarterDate(form[barter.id], barter.id)"
                class="date-bloger form__field_tab-date create-block form__field_date-filter form__field_date-result form__field_tab-date"
            />
          </template>
        </div>
        <div class="ui-item-card__item double">
          <span class="ui-item-card__item-title"><translate>Доставлено</translate></span>
          {{ barter.received_date || '&mdash;' }}
        </div>
      </div>
    </UiCard>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import UiDatePicker from '@/components/ui/UiDatePicker';
import UiCard from "@/components/ui/UiCard";
import { NETWORK_LIST } from "@/config";

export default {
  name: 'CampaignBarterList',
  components: {
    UiCard,
    UiDatePicker,
  },
  props: ['sortBy', 'perPage', 'sortDesc'],
  data() {
    return {
      form: {},
      headers: [
        {text: this.$gettext('Блогер'), value: 'name', class: 'campaign-barter-list__cell name'},
        {text: this.$gettext('Адрес'), value: 'address', class: 'campaign-barter-list__cell address'},
        {text: this.$gettext('Телефон'), value: 'phone', class: 'campaign-barter-list__cell phone'},
        {text: this.$gettext('Отправлено'), value: 'sent_date', class: 'campaign-barter-list__cell sent_date'},
        {text: this.$gettext('Доставлено'), value: 'recieved_date', class: 'campaign-barter-list__cell recieved_date'},
      ],
      windowWidth: window.innerWidth,
      currentSortBy: 'name',
      currentSortDesc: false,
      networkList: NETWORK_LIST
    }
  },
  filters: {
    date(value) {
      return new Date(value).toLocaleDateString()
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
    ...mapActions(['putOfferSentdate']),
    changeBarterDate(date, offer_id) {
      const reqData = {
        "offer_id": offer_id,
        "sent_date": date.split('.').reverse().join('-')
      };

      this.putOfferSentdate(reqData)
          .then(() => this.$emit('reload-list'))
    },
  },
  computed: {
    ...mapState({
      barters: 'campaignBarter',
    }),
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
.campaign-barter-list__cell {
  text-align: center;

  &.name {
    text-align: left;
  }

  &.sent_date {
    max-width: 15rem;
  }
}
</style>
