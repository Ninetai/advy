<template>
  <UiPageHead :isInline="true">
    <template v-slot:title>
      <UiPageTitle :name="'manager'"><translate>Личный кабинет</translate></UiPageTitle>
    </template>
    <template v-slot:action>
      <button v-show="scene === 'data'"
              @click.prevent="$emit('edit-user')"
              type="button" class="button-edit">
        <translate>Редактировать данные</translate>
      </button>
      <button v-show="scene === 'edit'"
              @click.prevent="$emit('save-account')"
              class="form__button form__button_submit user-save user-save_desktop edit-cabinet"
              type="submit">
        <translate>Сохранить</translate>
      </button>
    </template>
  </UiPageHead>
</template>

<script>
import UiPageHead from '@/components/ui/UiPageHead';
import UiPageTitle from '@/components/ui/UiPageTitle';

export default {
  name: 'CabinetHead',
  components: {
    UiPageHead,
    UiPageTitle,
  },
  props: ['scene'],
}
</script>

<style scoped lang="scss">
.button-edit {
  width: 260px;
  margin-right: 0;
  @media (max-width: 768px) {
    display: block;
  }
  @media (max-width: 525px) {
    width: 40px;
    height: 40px;
    padding: 9px;
    border-radius: 16px;
    font-size: 0;
    border: 1px solid var(--blue);
    margin-right: 0;
  }
}

@media (max-width: 768px) {
  .user-save_desktop {
    display: none;
  }
}
</style>
