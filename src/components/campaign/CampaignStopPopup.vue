<template>
  <div class="overlay overlay_create">
    <div class="popup popup_new-acc popup_delete-company">
      <h3 v-if="campaignInfo && campaignDescription"
          class="form__title form__title_new-acc"><translate>Вы точно хотите удалить</translate> {{ campaignInfo.name }}?
        <translate>Вы потеряете</translate>
        {{
          campaignDescription.budget > 0
              ? ((1 - (campaignDescription.offers_spend / campaignDescription.budget)) * 100)
              : 100
        }}<translate>% бюджета</translate></h3>
      <button @click.prevent="stopCampaign" class="form__button form__button_acc" type="submit"><translate>Удалить</translate></button>
      <button @click.prevent="$emit('close-popup')" type="button"
              class="ui-button outline blue form__button form__button_cancel form__button_account"><translate>Отмена</translate>
      </button>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'CampaignStopPopup',
  props: ['id'],
  data() {
    return {
      campaignInfo: null,
      campaignDescription: null,
    }
  },
  created() {
    this.getCampaignData();
  },
  methods: {
    ...mapActions(['getCampaignInfo', 'getCampaignDescription', 'putCampaignDelete']),
    getCampaignData() {
      this.getCampaignInfo(this.id)
          .then(response => this.campaignInfo = response)
          .then(() => this.getCampaignDescription(this.id))
          .then(response => this.campaignDescription = response);
    },
    stopCampaign() {
      this.putCampaignDelete(this.id)
          .then(() => this.$router.push({
            name: 'manager',
          }))
    }
  }
}
</script>

<style scoped>

</style>
