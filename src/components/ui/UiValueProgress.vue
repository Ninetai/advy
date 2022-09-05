<template>
  <div class="ui-value-progress">
    <p class="ui-value-progress__head">{{ title }}</p>
    <div class="ui-value-progress__info">
      <div class="ui-value-progress__progress" :style="{width: progressWidth + '%'}"></div>
      <div v-if="value" class="ui-value-progress__percent">{{ value.toFixed(2) }}%</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiValueProgress',
  props: ['title', 'value'],
  computed: {
    progressWidth() {
      return Math.min((this.value * 1.4), 100);
    }
  },
}
</script>

<style scoped lang="scss">
.ui-value-progress {
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}

.ui-value-progress__head {
  width: 30%;
}

.ui-value-progress__info {
  position: relative;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-weight: 700;
}

.ui-value-progress__percent {
  width: 10%;
}

.ui-value-progress__progress {
  height: 8px;
  margin-right: 8px;
  border-radius: 8px;
  background-color: var(--blue);
}
</style>
