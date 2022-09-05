<template>
  <div class="popup popup_question">
    <div class="create__image create__image_success">
      <svg class="create__picture create__picture_question" viewBox="0 0 33 32" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
           d="M12 4C9.243 4 7 6.243 7 9h2c0-1.654 1.346-3 3-3s3 1.346 3 3c0 1.069-.454 1.465-1.481 2.255-.382.294-.813.626-1.226 1.038C10.981 13.604 10.995 14.897 11 15v2h2v-2.009c0-.024.023-.601.707-1.284.32-.32.682-.598 1.031-.867C15.798 12.024 17 11.1 17 9c0-2.757-2.243-5-5-5zm-1 14h2v2h-2z" />
      </svg>
    </div>
    <h3 class="form__title form__title_popup form__title_success">
      <slot name="title"></slot>
    </h3>
    <p class="form__text-popup">
      <slot name="text"></slot>
    </p>
    <button @click.prevent="$emit('close-popup', true)" class="form__button form__button_repeat" type="button"><translate>Да</translate></button>
    <button @click.prevent="$emit('close-popup', false)" class="form__button form__button_cancel form__button_error bloger-btn-cancel" type="button"><translate>Нет</translate></button>
  </div>
</template>

<script>
export default {
  name: 'TheQuestionPopup',
}
</script>

<style scoped>

</style>
