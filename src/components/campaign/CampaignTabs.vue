<template>
  <div class="company-tabs">
    <ul class="tabs tabs_company clearfix" data-tabgroup="first-tab-group">
      <li class="tabs__item tabs__item_company tabs__item_stat">
        <router-link :to="{name: 'companyDescription'}"
                     class="tabs__link tabs__link_first tabs__link_one"
                     :class="{active: $route.name === 'companyDescription'}">
          <translate>Описание</translate>
        </router-link>
      </li>
      <li class="tabs__item tabs__item_company tabs__item_bloger">
        <router-link :to="{name: 'companyBloggers'}"
                     class="tabs__link tabs__link_first tabs__link_two"
                     :class="{active: $route.name === 'companyBloggers'}">
          <translate>Блогеры</translate>
        </router-link>
      </li>
      <li class="tabs__item tabs__item_company tabs__item_result">
        <router-link :to="{name: 'companyResult'}"
                     class="tabs__link tabs__link_first tabs__link_three"
                     :class="{active: $route.name === 'companyResult'}">
          <translate>Результаты</translate>
        </router-link>
      </li>
      <li class="tabs__item tabs__item_company tabs__item_barter" v-if="showBarter">
        <router-link :to="{name: 'companyBarter'}"
                     class="tabs__link tabs__link_first tabs__link_four"
                     :class="{active: $route.name === 'companyBarter'}">
          <translate>Настроить бартер</translate>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CampaignTabs',
  props: {
    description: Object
  },
  computed: {
    showBarter() {
      return this.description && this.description.barter != 'no'
    }
  }
}
</script>

<style scoped lang="scss">
.company-tabs {
  margin-top: 16px;
  @media (max-width: 655px) {
    width: 100%;
    margin-top: 36px;
  }
  @media (max-width: 525px) {
    padding: 0 16px;
  }
}
</style>
