<template>
  <main>
    <CampaignInfoPopup
        v-if="isInfoPopupOpened"
        :influencer="influencerData"
        @close-popup="isInfoPopupOpened = false"
    />

    <div class="wrapper wrapper_main">
      <!-- ADS companies -->
      <div class="main-content">
        <CampaignHead />

        <div class="main-content__inner">
          <div id="first-tab-group" class="tabgroup">
            <CampaignStat/>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {mapActions, mapState} from "vuex";
import CampaignInfoPopup from "@/components/campaign/CampaignInfoPopup";
import CampaignHead from "@/components/campaign/CampaignHead";
import CampaignTabs from "@/components/campaign/CampaignTabs";
import CampaignStat from "@/components/campaign/CampaignStat";

export default {
  name: 'CampaignDescriptionView',
  components: {
    CampaignInfoPopup,
    CampaignHead,
    CampaignTabs,
    CampaignStat,
  },
  data() {
    return {
      influencerData: null,
      isInfoPopupOpened: false,
      isEditPopupOpened: false,
      isStopPopupOpened: false,
    }
  },
  created() {
    this.loadCompanyInfo();
  },
  methods: {
    ...mapActions([
      'getCampaignInfo',
      'getCampaignDescription',
      'getCampaignInfluencers',
      'getCampaignResults',
      'getCampaignBarter',
      'getInfluencerData',
    ]),
    loadCompanyInfo() {
      const campaignId = this.$route.params.id;

      if (!campaignId) {
        this.$router.push({name: 'manager'});
      }

      this.getCampaignInfo(campaignId).then((campaign) => {
        if (campaign.status == 'on moderation') {
          this.$router.push({ name: 'campaign_init', params: { id: campaignId } })
        }
      });
      this.getCampaignDescription(campaignId);
    },
    displayInfluencerPopup(id) {
      this.getInfluencerData(id).then(response => {
        this.influencerData = response.data;
        this.isInfoPopupOpened = true;
      });
    },
  },
  computed: {
    ...mapState({
      campaign: 'campaignData',
      transactions: 'transactionList',
    })
  },
}
</script>

<style scoped>

</style>
