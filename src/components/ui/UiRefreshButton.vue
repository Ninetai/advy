<template>
  <button @click.prevent="$emit('refresh-emit')" class="ui-refresh-button">
    <span class="ui-refresh-button__inner"><translate>Сбросить</translate></span>
  </button>
</template>

<script>
export default {
  name: 'UiRefreshButton',
}
</script>

<style scoped lang="scss">
.ui-refresh-button {
  cursor: pointer;
  width: 56px;
  height: 56px;
  padding: 16px;
  flex-shrink: 0;
  font-size: 0;
  background-color: var(--white);
  border-radius: 16px;
  @media (max-width: 1105px) and (min-width: 655.02px) {
    height: 46px;
    width: 46px;
  }
  @media (min-width: 655.02px) {
    background-image: url('@/assets/icons/refresh.svg');
    background-repeat: no-repeat;
    background-size: 24px;
    background-position: center;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.05);
  }
  @media (max-width: 655px) {
    width: 100%;
    order: 3;
    font-size: var(--body-small);
    font-weight: 500;
    text-align: center;
    color: var(--pink);
    border: 1px solid #EC407A;
  }
}

.ui-refresh-button__inner {
  position: relative;

  &::before {
    @media (max-width: 655px) {
      content: '';
      display: block;
      position: absolute;
      left: -30px;
      top: 50%;
      transform: translateY(-50%);
      width: 24px;
      height: 24px;
      mask: url('@/assets/icons/refresh-pink.svg') no-repeat 50%;
      -webkit-mask: url('@/assets/icons/refresh-pink.svg') no-repeat 50%;
      background: var(--pink);
    }
  }
}
</style>
