<template>
  <UiPageHead class="influencer-head">
    <template v-slot:title>
      <h2 v-if="influencer" class="head-companies__head">{{ influencer.network_account }}</h2>
    </template>
    <template v-slot:action>
      <div class="head-companies__buttons influencer-head__buttons">
        <button class="form__button"
                @click.prevent="$emit('create-campaign')">
          <translate>Заказать рекламу</translate>
        </button>
      </div>
    </template>
  </UiPageHead>
</template>

<script>
import UiPageHead from '@/components/ui/UiPageHead';

export default {
  name: 'InfluencerHead',
  props: ['influencer'],
  components: {
    UiPageHead,
  },
}
</script>

<style scoped lang="scss">
.influencer-head {
  @media (max-width: 480px) {
    margin: 0 -16px;

    .head-companies__inner {
      flex-direction: column;
    }
  }
}

.influencer-head__buttons {
  @media (max-width: 480px) {
    padding: 16px 0 0;
  }
}
</style>
