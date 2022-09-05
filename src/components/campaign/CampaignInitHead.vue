<template>
  <UiPageHead class="head-companies head-companies_company">
   <template v-slot:title>
      <UiPageTitle :name="'manager'">
        <span v-if="description" class="head-companies__title">
          {{ description.name }}
          <small>{{ description.comment }}</small>
        </span>
      </UiPageTitle>
    </template>
    <template v-slot:action>
      <div v-if="finished">
        <button @click.prevent="$emit('contact-manager')" type="button"
                class="ui-button btn-popup form__button form__button_selection form__button_manager">
          <span class="form__arr form__arr_create"><translate>Запустить рекламу</translate></span>
        </button>
      </div>
      <div v-else>
        <button @click.prevent="$emit('start-selection')" type="button"
                class="ui-button btn-popup form__button form__button_selection form__button_manager">
          <span class="form__arr form__arr_create"><translate>Подбор блогеров</translate></span>
        </button>
      </div>
    </template>
  </UiPageHead>
</template>

<script>
import {mapState} from "vuex";
import UiPageHead from '@/components/ui/UiPageHead';
import UiPageTitle from "@/components/ui/UiPageTitle";

export default {
  name: 'CampaignInitHead',
  props: ['finished'],
  components: {
    UiPageHead,
    UiPageTitle,
  },
  computed: {
    ...mapState({
      description: 'campaignDescription',
    })
  }
}
</script>

<style scoped lang="scss">
.head-companies__title {
  small {
    display: block;
    font-weight: 400;
    color: grey;
  }
}
</style>