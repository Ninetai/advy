<template>
  <main>
    <div class="wrapper wrapper_main">
      <CampaignCreatePopup
          v-if="isCampaignPopupOpened"
          :mode="'influencer'"
          :id="influencer.id"
          @close-popup="closeCreateCampaignPopup"
      />

      <div class="main-content influencer">
        <InfluencerHead
            :influencer="influencer"
            @create-campaign="openCreateCampaignPopup"
        />

        <UiCard>
          <div v-if="influencerList && influencerList.length > 0" class="influencer__profile">
            <div class="influencer__photo">
              <div class="influencer__photo-block">
                <img v-if="influencer.profile_pic" :src="influencer.profile_pic" class="filled" alt="">
                <img v-else src="@/assets/camera.png" class="empty" alt="">
              </div>
              <div class="influencer__photo-status"><translate>Ready to work</translate></div>
            </div>
            <div class="influencer__info">
              <div class="influencer__info-block">
                <h3 class="influencer__info-block-header"><translate>Social Networks</translate></h3>
                <div class="influencer__networks-list">
                  <div v-for="item in influencerList" class="influencer__networks-item"
                       :key="item.network_account"
                       :class="{'active': selectedNetwork === item.id}"
                       @click.prevent="selectedNetwork = item.id">
                    <img src="@/assets/instagram.svg" :alt="item.network">
                    {{ item.network_account }}
                  </div>
                </div>
              </div>
              <div class="influencer__info-block">
                <h3 class="influencer__info-block-header"><translate>General Information</translate></h3>
                <InfluencerGeneralInfo
                    :influencer="influencer"
                />
              </div>
              <div class="influencer__info-block">
                <h3 class="influencer__info-block-header"><translate>Audience</translate></h3>
                <InfluencerAudienceList
                    :age="influencer.audience_age"
                    :gender="influencer.audience_gender"
                    :geo="influencer.audience_geo"
                />
              </div>
            </div>
          </div>
          <div v-else><translate>Загрузка данных...</translate></div>
        </UiCard>
      </div>
    </div>
  </main>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import UiCard from '@/components/ui/UiCard';
import InfluencerHead from "@/components/influencer/InfluencerHead";
import InfluencerAudienceList from '@/components/influencer/InfluencerAudienceList';
import InfluencerGeneralInfo from '@/components/influencer/InfluencerGeneralInfo';
import CampaignCreatePopup from '@/components/campaign/CampaignCreatePopup';

export default {
  name: 'InfluencerView',
  components: {
    InfluencerHead,
    InfluencerAudienceList,
    InfluencerGeneralInfo,
    CampaignCreatePopup,
    UiCard,
  },
  data() {
    return {
      isCampaignPopupOpened: false,
      selectedNetwork: null,
    };
  },
  created() {
    this.getInfluencer();
  },
  watch: {
    influencerList: function () {
      if (!this.selectedNetwork) {
        this.selectedNetwork = this.influencerList[0].id;
      }
    }
  },
  methods: {
    ...mapActions(['getInfluencerInfo']),
    getInfluencer() {
      const id = this.$route.params.id;
      const account = this.$route.params.account;

      if (!id || !account) {
        return;
      }
      this.getInfluencerInfo({id, account});
    },
    openCreateCampaignPopup() {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        this.$router.push({name: 'start'})
      } else {
        this.isCampaignPopupOpened = true;
      }
    },
    closeCreateCampaignPopup() {
      this.isCampaignPopupOpened = false;
    },
  },
  computed: {
    ...mapGetters([
      'influencers',
    ]),
    influencerList() {
      return this.influencers.map(influencer => {
        return {
          ...influencer,
          id: `${influencer.network}/${influencer.network_account}`
        }
      })
    },
    influencer() {
      if (!this.selectedNetwork) {
        return null;
      }

      return this.influencerList.find((item) => item.id === this.selectedNetwork);
    },
  },
};
</script>

<style scoped lang="scss">
.influencer {
  .ui-card + .ui-card {
    margin-top: 20px;
  }
}

.influencer__profile {
  @media (min-width: 1024px) {
    display: flex;
    align-items: flex-start;
  }
}

.influencer__photo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.influencer__photo-block {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  @media (min-width: 768px) {
    width: 252px;
    height: 252px;
  }
  @media (max-width: 767.98px) {
    width: 150px;
    height: 150px;
  }

  img.empty {
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  img.filled {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.influencer__photo-status {
  position: relative;
  padding-left: 10px;
  font-weight: 600;
  color: #34C759;
  @media (min-width: 768px) {
    margin-top: 15px;
    font-size: 18px;
    line-height: 21px;
  }
  @media (max-width: 767.98px) {
    margin-top: 10px;
    font-size: 14px;
    line-height: 16px;
  }

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    background: #34C759;
    border-radius: 50%;
  }
}

.influencer__info {
  @media (min-width: 1024px) {
    margin-left: 24px;
  }
  @media (max-width: 1023.98px) {
    margin-top: 20px;
  }
}

.influencer__info-block + .influencer__info-block {
  padding-top: 24px;
  margin-top: 24px;
  border-top: 1px solid var(--very-light-gray);
}

.influencer__info-block-header {
  margin-bottom: 1rem;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
}

.influencer__networks-list {
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }
}

.influencer__networks-item {
  cursor: pointer;
  padding: 8px 7.5px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 500;
  font-size: 14px;
  line-height: 1.43;
  color: var(--dark-gray);
  background: var(--bg-gray);
  border-radius: 100px;

  & + .influencer__networks-item {
    @media (min-width: 768px) {
      margin-left: 10px;
    }
    @media (max-width: 767.98px) {
      margin-top: 11px;
    }
  }

  &.active {
    color: var(--white);
    background: var(--blue);
  }

  img {
    margin-right: 7px;
  }
}
</style>
