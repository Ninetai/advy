<template>
  <div class="campaign-init-overlay">
    <div v-if="!(reach_range && reach_range[0])">
      Загрузка...
    </div>
    <div v-else>
      <h4 v-if="influencers_selected">Вы выбрали {{ influencers_selected }} блогеров</h4>
      <p v-if="reach_range">
        Суммарный охват рекламной кампании будет от {{reach_range[0]}} до {{reach_range[1]}} человек
      </p>
      <button @click.prevent="$emit('contact-manager')" class="form__button" type="button">
        Связаться с менеджером
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CampaignInitPaywall',
  props: ['influencers_selected', 'reach_range'],
  data() {
    return {
    }
  },
  methods: {
  },
  mounted() {
  },
}
</script>

<style scoped lang="scss">
.campaign-init-overlay {
  position: absolute;
  width: 100%;
  height: 444px;
  left: 0;
  bottom: 0;
  right: 0;
  font-size: 20px;
  line-height: 40px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(91.68deg, rgba(255, 191, 132, 0.6) 0.55%, rgba(243, 105, 255, 0.6) 99.54%);
  backdrop-filter: blur(7px);
  z-index: 999;
  overflow-x: hidden;
  overflow-y: hidden;
  @media (max-width: 1024px) {
    height: 515px;
  }
  & p {
    font-weight: bold;
  }
  & .form__button {
    margin-top: 20px;
  }
}
</style>
