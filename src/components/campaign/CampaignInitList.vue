<template>
  <div data-app v-if="windowWidth >= 1024">
    <div :key="selections.length">
      <v-data-table
          class="table manager-list"
          :headers="headers"
          :items.sync="selections"
          :itemsPerPage="1000"
          dense
          hide-default-footer
      >
        <template v-slot:item="{ item }">
          <tr>
            <td class="manager-list__cell name">
              <a :href="networkList[item.influencer_network].link + item.influencer_network_account" target="_blank" class="icon-social" :class="[item.influencer_network]"></a>
              <a @click.prevent="$emit('open-popup', item.id)" href="#">{{ item.full_name }}</a>
            </td>
            <td class="manager-list__cell thumb">
            <span class="icon-thumb"
              :class="{'up': item.result == 'liked', 'down': item.result == 'disliked'}"></span>
            </td>
            <td class="manager-list__cell er">{{ item.influencer_er }}%</td>
            <!--td class="manager-list__cell reach_stories">{{ item.influencer_reach_stories }}</td>
            <td class="manager-list__cell reach_post">{{ item.influencer_reach_post }}</td-->
          </tr>
        </template>
      </v-data-table>
    </div>
  </div>
  <div v-else>
    <UiCard v-for="item in selections" :key="item.id" class="ui-item-card">
      <div class="ui-item-card__name"
           style="cursor:pointer">
        <div @click="toggleItem(item.id)" class="ui-item-card__header">
          <div class="ui-item-card__link">
            <a :href="networkList[item.influencer_network].link + item.influencer_network_account" target="_blank" class="icon-social" :class="[item.influencer_network]"></a>
            <a @click.prevent="$emit('open-popup', item.id)" href="#" style="color:black;">{{ item.full_name }}</a>
            <span class="icon-thumb"
              :class="{'up': item.result == 'liked', 'down': item.result == 'disliked'}"></span>
          </div>
        </div>
      </div>
      <div v-show="selectedItem === item.id" class="ui-item-card__inner">
        <div class="ui-item-card__item">
          <span class="ui-item-card__item-title"><translate>ER</translate></span>
          {{ item.influencer_er }}%
        </div>
        <!--div class="ui-item-card__item">
          <span class="ui-item-card__item-title"><translate>Охват сторис</translate></span>
          {{ item.influencer_reach_stories }}
        </div>
        <div class="ui-item-card__item">
          <span class="ui-item-card__item-title"><translate>Охват постов</translate></span>
          {{ item.influencer_reach_post }}
        </div-->
      </div>
    </UiCard>
  </div>
</template>

<script>
import UiStatus from '@/components/ui/UiStatus';
import UiDropdown from '@/components/ui/UiDropdown';
import UiDropdownContent from '@/components/ui/UiDropdownContent';
import UiCard from "@/components/ui/UiCard";
import { NETWORK_LIST } from "@/config";

export default {
  name: 'CampaignInitList',
  components: {
    UiCard,
    UiStatus,
    UiDropdown,
    UiDropdownContent,
  },
  props: ['selections'],
  data() {
    return {
      headers: [
        {text: this.$gettext('Блогер'), value: 'name', class: 'manager-list__cell name', sortable: false},
        {text: '', value: ' ', class: 'manager-list__cell', sortable: false},
        {text: this.$gettext('ER'), value: 'er', class: 'manager-list__cell er', sortable: false},
        //{text: this.$gettext('Охват сторис'), value: 'reach_stories', class: 'manager-list__cell reach', sortable: false},
        //{text: this.$gettext('Охват постов'), value: 'reach_post', class: 'manager-list__cell reach', sortable: false},
      ],
      selectedItem: null,
      windowWidth: window.innerWidth,
      networkList: NETWORK_LIST
    }
  },
  watch: {
  },
  created() {
  },
  methods: {
    toggleItem(id) {
      this.selectedItem === id ? this.selectedItem = null : this.selectedItem = id;
    },
  },
  computed: {
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
</style>
