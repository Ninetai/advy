<template>
  <div class="ui-form-field ui-target-input">
    <template v-if="list && list.length > 0">
      <div v-for="geo in list" class="ui-target-input__item">
        {{ geo.name }}
        <div class="ui-target-input__item-icon" @click.p.prevent="$emit('remove-item', geo.id)">
          <img src="@/assets/icons/cross.svg" alt="">
        </div>
      </div>
    </template>
    <div v-else class="ui-target-input__placeholder">{{ placeholder }}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'UiTargetInput',
  props: ['list', 'placeholder'],
}
</script>

<style scoped lang="scss">
.ui-target-input {
  padding: 13px 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}

.ui-target-input__placeholder,
.ui-target-input__item,
.ui-target-input__button {
  margin: .25rem;
}

.ui-target-input__placeholder {
  line-height: 1;
  color: var(--very-light-gray);
}

.ui-target-input__item {
  padding: 5px 8px;
  display: flex;
  align-items: center;
  background: #F0F2FA;
  border-radius: 100px;
}

.ui-target-input__item-icon {
  cursor: pointer;
  margin-left: 7px;
}
</style>
