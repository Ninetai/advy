<template>
  <main>
    <div class="wrapper wrapper_main">
      <CampaignInfoPopup
          v-if="showSelection && !finished"
          :mode="'selection'"
          :selection.sync="influencer"
          :likedBudget="likedBudget"
          :likedCount="likedCount"
          :campaignBudget="campaignData.budget"
          @vote-liked="vote('liked')"
          @vote-disliked="vote('disliked')"
          @close-popup="onPopupClose($event)"
      />
      <div class="overlay overlay_create" v-if="showInit && !finished">
        <TheQuestionPopup
          @close-popup="onInitPopupClose($event)"
        >
          <template v-slot:title>
            <translate>Благодарим за создание кампании!</translate>
          </template>
          <template v-slot:text>
            <translate>Хотите вручную отобрать некоторое количество блогеров, чтобы обучить нейронную сеть?</translate>
          </template>
        </TheQuestionPopup>
      </div>
      <div class="overlay overlay_create" v-if="showQuestion && !finished">
        <TheQuestionPopup
          @close-popup="onFinishPopupClose($event)"
        >
          <template v-slot:title>
            <translate>Вы уверены что хотите завершить подбор блогеров?</translate>
          </template>
        </TheQuestionPopup>
      </div>
      <div class="overlay overlay_create" v-if="showContact && finished">
        <TheSuccessPopup
          @close-popup="onContactPopupClose($event)"
        >
          <translate>Для запуска рекламы</translate>
          <br>
          <a :href="$gettext('https://t.me/ADVY_Manager_Zakharbot')" target="_blank" style="color: #367bf2">
            <translate>свяжитесь с менеджером</translate>
          </a>
        </TheSuccessPopup>
      </div>

      <!-- ADS companies -->
      <div class="main-content manager-page">
        <CampaignInitHead class="manager-page__head"
          :finished.sync="finished"
          @start-selection="openSelectionPopup()"
          @contact-manager="contact()"
        />

        <div class="main-content__inner" :key="scene">
          <template v-if="scene === 'loading'"><translate>Загружаем список блогеров...</translate></template>
          <template v-else-if="scene === 'error'"><translate>Не удалось получить список блогеров. Пожалуйста, попробуйте позже</translate>
          </template>
          <template v-else-if="scene === 'empty'"><translate>Список блогеров пуст</translate></template>
          <template v-else-if="scene === 'data'">
            <div class="campaign-init-list-wrapper">
              <CampaignInitList
                :selections.sync="selection.results"
                @open-popup="openSelectionPopup($event)"
              />
              <CampaignInitPaywall
                v-if="finished"
                :influencers_selected="likedInfluencers.length"
                :reach_range="reach_range"
                @contact-manager="contact()"
              />
            </div>
          </template>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {mapActions, mapState} from "vuex";
import CampaignInfoPopup from '@/components/campaign/CampaignInfoPopup';
import CampaignInitHead from '@/components/campaign/CampaignInitHead';
import CampaignInitList from '@/components/campaign/CampaignInitList';
import CampaignInitPaywall from '@/components/campaign/CampaignInitPaywall';
import TheQuestionPopup from '@/components/common/TheQuestionPopup';
import TheSuccessPopup from '@/components/common/TheSuccessPopup';

export default {
  name: 'CampaignInitView',
  components: {
    CampaignInfoPopup,
    CampaignInitHead,
    CampaignInitList,
    CampaignInitPaywall,
    TheQuestionPopup,
    TheSuccessPopup
  },
  data() {
    return {
      id: null,
      scene: 'loading',
      selection: {},
      showInit: false,
      showSelection: false,
      showQuestion: false,
      showContact: false,
      currentIndex: 0,
      finished: false,
      influencerAutoSelection: null,
      influencers_range: null,
      reach_range: null
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.getCampaignInfo(this.id).then((campaign) => {
      this.influencerAutoSelection = campaign.influencer_auto_selection;
      if (campaign.status == 'on moderation') {
        this.getCampaignDescription(this.id);
        this.loadSelection()
      }
      else {
        this.$router.push({ name: 'campaign', params: { id: this.id } })
      }
    })
  },
  methods: {
    ...mapActions(['getCampaignInfo', 'getCampaignDescription',
      'getCampaignSelection', 'putCampaignJudgeResult',
      'putCampaignSelectionFinalize', 'getCampaignSelectionResult']),
    onInitPopupClose(value) {
      this.showInit = false;
      if (value) {
        this.showSelection = true
      }
      else {
        this.finish()
      }
    },
    onPopupClose(value) {
      this.showSelection = false;
      this.switchSelection();
      if (this.currentIndex > -1) {
        this.showQuestion = true
      }
    },
    onFinishPopupClose(value) {
      this.showQuestion = false;
      if (value) {
        this.finish()
      }
      else {
        this.showSelection = true
      }
    },
    onContactPopupClose(value) {
      this.showContact = false
    },
    openSelectionPopup(id) {
      if (id) {
        this.currentIndex = this.selection.results.map(e => e.id).indexOf(id);
      }
      else {
        this.switchSelection()
      }
      this.showSelection = true
    },
    loadSelection() {
      let vm = this;
      let int = setInterval(() => {
        vm.getCampaignSelection(vm.id)
          .then((response) => {
            if (response.data.status != 'processing') {
              vm.selection = response.data;
              vm.scene = 'data';
              vm.switchSelection();
              if (vm.influencerAutoSelection) {
                if (vm.currentIndex == 0) {
                  vm.showInit = true
                }
                else if (vm.currentIndex > -1) {
                  vm.showSelection = true
                }
                //else {
                //  this.finish();
                //  vm.showContact = true
                //}
              }
              else {
                this.finish();
                vm.showContact = true
              }
              clearInterval(int)
            }
          })
          .catch(() => vm.scene = 'error');
      }, 1000);
    },
    switchSelection() {
      this.currentIndex = this.selection.results
        .map(e => (e.result == 'liked' || e.result == 'disliked')).indexOf(false);
      if (this.currentIndex == -1 || parseInt(this.campaignData.budget) <= this.likedBudget) {
        this.finish()
      }
    },
    vote(result) {
      this.influencer.result = result;
      this.putCampaignJudgeResult({
        scoreId: this.influencer.id,
        result: result
      }).then(() => {
        this.switchSelection()
      })
    },
    finish() {
      let vm = this;
      vm.scene = 'loading';
      vm.putCampaignSelectionFinalize(vm.id).then(() => {
        let int = setInterval(() => {
          vm.getCampaignSelectionResult(vm.id)
            .then((response) => {
              if (response.data[1].influencers_range[0]) {
                vm.influencers_range = response.data[1].influencers_range;
                vm.reach_range = response.data[1].reach_range;
                vm.selection.results = vm.selection.results.filter(r => r.result == 'liked');
                for (let i=0; i<7; i++) {
                  let t = {
                    full_name: "Annette Barreto".substr(0, vm.getRandomInt(14)),
                    id: 512,
                    influencer_er: vm.getRandomInt(40),
                    influencer_id: 411,
                    influencer_network: "instagram",
                    influencer_network_account: "",
                    influencer_reach_post: vm.getRandomInt(999999),
                    influencer_reach_stories: vm.getRandomInt(999999),
                    result: ""
                  };
                  vm.selection.results.push(t);
                }
                vm.scene = 'data';
                window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
                clearInterval(int)
              }
            })
        }, 1000);
      });
      this.finished = true
    },
    contact() {
      this.showSelection = false;
      this.showContact = true;
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
  },
  computed: {
    ...mapState(['campaignData']),
    influencer() {
      if (this.selection.results) {
        return this.selection.results[this.currentIndex]
      }
      return {}
    },
    likedInfluencers() {
      if (this?.selection?.results) {
        return this.selection.results.filter(i => i.result == 'liked')
      }
      return []
    },
    likedBudget() {
      return this.likedInfluencers.reduce((result, i) => { return result + parseFloat(i.influencer_price) }, 0)
    },
    likedCount() {
      return this.likedInfluencers.length
    }
  }
}
</script>

<style scoped lang="scss">
.manager-page {
}
.campaign-init-list-wrapper {
  position: relative;
}
</style>
