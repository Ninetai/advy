<template>
  <UiPageHead class="manager-head">
    <template v-slot:title>
      <h2 class="manager-head__title"><translate>Рекламные кампании</translate></h2>
      <span class="manager-head__subtitle">
        <translate>Всего</translate> <strong>{{ $store.state.campaignList.length }}</strong>
      </span>
    </template>
    <template v-slot:action>
      <button @click.prevent="$emit('toggle-filters')" type="button" class="ui-button outline filter-button">
        <translate>Фильтр</translate>
      </button>
      <button @click.prevent="$emit('create-campaign')" type="button"
              class="ui-button btn-popup form__button form__button_create form__button_manager">
        <span class="form__arr form__arr_create"><translate>Создать</translate></span>
      </button>
    </template>

    <template v-slot:filters>
      <slot></slot>
    </template>
  </UiPageHead>
</template>

<script>
import UiPageHead from '@/components/ui/UiPageHead';

export default {
  name: 'ManagerHead',
  components: {
    UiPageHead,
  },
}
</script>

<style scoped lang="scss">
.manager-head {
  .ui-button:not(:last-child) {
    margin-right: 1rem;
  }
}
.manager-head__title {
  font-size: var(--heading-two);
  color: var(--black);
  font-weight: 700;
}

.manager-head__subtitle {
  color: var(--not-vary-dark-gray);
  font-size: var(--body-small);
}
</style>
