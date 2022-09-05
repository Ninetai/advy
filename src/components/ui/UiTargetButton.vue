<template>
  <div class="ui-target-button">
    <a @click.prevent="toggle"><translate>Добавить</translate></a>
    <div v-if="sharedState.activeTargetPopup" @click="close" class="ui-target-button__overlay"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'UiTargetButton',
  provide() {
    return {
      sharedState: this.sharedState
    }
  },
  data() {
    return {
      sharedState: {
        activeTargetPopup: false,
      }
    }
  },
  methods: {
    toggle() {
      this.sharedState.activeTargetPopup = !this.sharedState.activeTargetPopup;
    },
    close() {
      this.sharedState.activeTargetPopup = false;
    }
  }
}
</script>

<style scoped lang="scss">
.ui-target-button {
  cursor: pointer;
  position: relative;
  font-size: 14px;
  line-height: 16px;

  a {
    font-weight: 700;
    color: #367BF2;
  }
}

.ui-target-button__overlay {
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: -100000px;
}
</style>
