<template>
  <div class="influencer-general-info">
    <div class="influencer-general-info__item">
      <translate>Gender:</translate> <span>{{ influencer.influencer_sex }}</span>
    </div>
    <div class="influencer-general-info__item">
      <translate>Country:</translate> <span>{{ influencer.country.name }}</span>
    </div>

    <div class="influencer-topic" v-if="influencer.blog_category">
      <span class="influencer-topic__title"><translate>Topic:</translate></span>
      <div v-for="category in influencer.blog_category" class="influencer-topic__item">
        {{ category.emoji }} {{ category.name }}
      </div>
    </div>

    <div class="influencer-general-info__item">
      <translate>Total Followers:</translate> <span>{{ influencer.follower_count || 0|numberFormat }}</span>
    </div>
    <div class="influencer-general-info__item">
      <translate>ER:</translate> <span>{{ influencer.er || 0|numberFormat }}</span>
    </div>
    <div class="influencer-general-info__item">
      <translate>Reach stories:</translate> <span>{{ influencer.reach_stories || 0|numberFormat }}</span>
    </div>
    <div class="influencer-general-info__item">
      <translate>Reach posts:</translate> <span>{{ influencer.reach_post || 0|numberFormat }}</span>
    </div>
  </div>
</template>

<script>
import numberFormat from "@/filters";

export default {
  name: 'InfluencerGeneralInfo',
  props: ['influencer'],
  filters: {
    numberFormat,
  },
}
</script>

<style scoped lang="scss">
.influencer-general-info {
  margin: -8px;
  display: flex;
  flex-wrap: wrap;
}

.influencer-general-info__item {
  padding: 16px 20px;
  margin: 8px;

  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: var(--light-gray);

  background: #FAFAFA;
  border-radius: 16px;
  @media (max-width: 767.98px) {
    flex: 0 100%;
  }

  span {
    color: var(--gray);
  }
}

.influencer-topic {
  flex: 0 100%;
  margin: 37px -5px 32px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  @media (max-width: 767.98px) {
    order: 1;
    flex-wrap: wrap;
  }
}

.influencer-topic__title {
  margin: 5px;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.67;
  color: var(--black);
}

.influencer-topic__item {
  padding: 5px 8px;
  margin: 5px;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.67;
  color: var(--dark-gray);
  background: var(--bg-gray);
  border-radius: 100px;
}
</style>
