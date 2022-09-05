<template>
  <div>
    <CampaignCreatePopup
        v-if="isEditPopupOpened"
        :mode="'edit'"
        :id="$route.params.id"
        @close-popup="isEditPopupOpened = false"
    />
    <CampaignStopPopup
        v-if="isStopPopupOpened"
        :id="$route.params.id"
        @close-popup="isStopPopupOpened = false"
    />
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
        <button @click.prevent="isEditPopupOpened = true" type="button"
                class="button-edit button-edit_edit btn-popup">
          <translate>Редактировать</translate>
        </button>
        <button @click.prevent="isStopPopupOpened = true" type="button"
                class="form__button form__button_create form__button_stop">
          <translate>Остановить</translate>
        </button>
      </template>
      <template v-slot:filters>
        <CampaignTabs :description="description" />
        <slot></slot>
      </template>
    </UiPageHead>
  </div>
</template>

<script>
import {mapState} from "vuex";
import UiPageHead from "@/components/ui/UiPageHead";
import UiPageTitle from "@/components/ui/UiPageTitle";
import CampaignTabs from "@/components/campaign/CampaignTabs";
import CampaignStopPopup from "@/components/campaign/CampaignStopPopup";
import CampaignInfoPopup from "@/components/campaign/CampaignInfoPopup";
import CampaignCreatePopup from "@/components/campaign/CampaignCreatePopup";

export default {
  name: 'CampaignHead',
  components: {
    UiPageHead,
    UiPageTitle,
    CampaignTabs,
    CampaignStopPopup,
    CampaignInfoPopup,
    CampaignCreatePopup,
  },
  data() {
    return {
      isEditPopupOpened: false,
      isStopPopupOpened: false,
    }
  },
  computed: {
    ...mapState({
      description: 'campaignDescription',
    })
  },
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
