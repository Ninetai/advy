<template>
  <div class="overlay overlay_create">
    <!-- Create new ADS window -->
    <div class="popup">
      <h2><translate>Функционал находится в разработке</translate></h2>
      <button @click.prevent="$emit('close-popup')"
              class="ui-button outline blue form__button form__button_cancel btn-mrg" type="button">
        <translate>Понятно</translate>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IsInProgressPopup',
}
</script>

<style scoped lang="scss">
.popup {
  h2 {
    margin-bottom: 24px;
  }
}
</style>
