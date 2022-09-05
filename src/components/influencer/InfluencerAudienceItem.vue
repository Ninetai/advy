<template>
  <div class="influencer-audience-item">
    <h3>
      <slot name="title"></slot>
    </h3>
    <p>
      <slot name="subtitle"></slot>
    </p>
    <div class="influencer-audience-item__figures">
      <slot name="figures"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfluencerAudienceItem'
}
</script>

<style scoped lang="scss">
.influencer-audience-item {
  padding: 23px 30px 27px;
  color: var(--black);
  font-size: 14px;
  line-height: 1.43;
  background: #FAFAFA;
  @media (min-width: 768px) {
    max-width: 326px;
    border-radius: 10px;
  }
  @media (max-width: 767.98px) {
    margin: 0 -16px;
  }

  h3 {
    margin-bottom: 16px;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
  }

  p {
    opacity: 0.4;
  }
}

.influencer-audience-item__figures > .influencer-audience-figure {
  margin: 11px 0;

  .influencer-audience-figure__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .ui-progress {
    margin-top: 4px;
  }
}
</style>
