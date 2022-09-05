<template>
  <div v-if="active" class="ui-dropdown-content">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'UiDropdownContent',
  inject: ['sharedState'],
  computed: {
    active() {
      return this.sharedState.active
    }
  }
}
</script>

<style scoped lang="scss">
.ui-dropdown-content {
  z-index: 3;
  overflow: hidden;
  border: 1px solid rgba(1, 187, 236, 0.05);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.05);
  background-color: var(--white);

  @media (max-width: 1130px) {
    top: 17px;
  }
  @media (min-width: 360.02px) {
    position: absolute;
    right: -9px;
    top: 41px;
    width: 222px;
    border-radius: 16px;
  }
  @media (max-width: 360px) {
    position: fixed;
    top: auto;
    right: 0;
    left: 0;
    bottom: 0;
    border-radius: 16px 16px 0 0;
  }
}
</style>
