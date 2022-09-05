<template>
  <div class="influencer-audience-list">
    <InfluencerAudienceItem>
      <template slot="title"><translate>Age</translate></template>
      <template slot="subtitle">
        <translate>Age statistics of groups in this social network account</translate>
      </template>
      <template slot="figures">
        <div v-for="(value, name) in age" :key="name"
             class="influencer-audience-figure">
          <div class="influencer-audience-figure__row">
            <div>{{ name }}</div>
            <div>{{ value }}%</div>
          </div>
          <UiProgress :progress-value="value"/>
        </div>
      </template>
    </InfluencerAudienceItem>
    <InfluencerAudienceItem>
      <template slot="title"><translate>Gender</translate></template>
      <template slot="subtitle">
        <translate>Gender statistics of groups in this social network account</translate>
      </template>
      <template slot="figures">
        <div v-for="(value, name) in gender" :key="name"
             class="influencer-audience-figure">
          <div class="influencer-audience-figure__row">
            <div>{{ name }}</div>
            <div>{{ value }}%</div>
          </div>
          <UiProgress :progress-value="value"/>
        </div>
      </template>
    </InfluencerAudienceItem>
    <InfluencerAudienceItem>
      <template slot="title">Geo</template>
      <template slot="subtitle">
        <translate>Geo statistics of groups in this social network account</translate>
      </template>
      <template slot="figures">
        <div v-for="(value, name) in geo" :key="name"
             class="influencer-audience-figure">
          <div class="influencer-audience-figure__row">
            <div>{{ name }}</div>
            <div>{{ value }}%</div>
          </div>
          <UiProgress :progress-value="value"/>
        </div>
      </template>
    </InfluencerAudienceItem>
  </div>
</template>

<script>
import UiCard from "@/components/ui/UiCard";
import UiProgress from "@/components/ui/UiProgress";
import InfluencerAudienceItem from "@/components/influencer/InfluencerAudienceItem";

export default {
  name: 'InfluencerAudienceList',
  props: ['age', 'gender', 'geo'],
  components: {
    UiCard,
    UiProgress,
    InfluencerAudienceItem,
  },
}
</script>

<style scoped lang="scss">
.influencer-audience-list {
  display: flex;
  @media (min-width: 768px) {
    align-items: stretch;
    column-gap: 38px;
  }

  @media (max-width: 767.98px) {
    flex-direction: column;
    row-gap: 10px;
  }
}
</style>
