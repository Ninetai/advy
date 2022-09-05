<template>
  <div class="ui-card">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'UiCard',
}
</script>

<style scoped lang="scss">
.ui-card {
  background-color: var(--white);
  box-shadow: 0 15px 30px rgb(0 0 0 / 5%);
  border-radius: 16px;
  padding: 16px;
}
</style>
