<template>
  <div v-show="activeTargetPopup" class="ui-target-popup">
    <div class="ui-target-popup__search">
      <div class="ui-target-popup__search-field">
        <input v-model="currentValue" @input="$emit('update:value', currentValue)"
               class="ui-form-field"
               :placeholder="$gettext('Поиск по названию')">
      </div>
      <div class="ui-target-popup__close-icon" @click.p.prevent="sharedState.activeTargetPopup = false">
        <img src="@/assets/icons/cross.svg" alt="">
      </div>
    </div>
    <ul v-if="list && list.length > 0" class="ui-target-popup__response">
      <li v-for="item in list" :key="item.id"
          @click.prevent="$emit('add-item', item)">{{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UiTargetPopup',
  inject: ['sharedState'],
  props: ['value', 'list'],
  data() {
    return {
      currentValue: '',
    }
  },
  watch: {
    value: {
      handler(val) {
        this.currentValue = val;
      }
    }
  },
  computed: {
    activeTargetPopup() {
      return this.sharedState.activeTargetPopup
    }
  }
}
</script>

<style scoped lang="scss">
.ui-target-popup {
  z-index: 999;
  position: absolute;
  background: #FFFFFF;
  border: 1px solid rgba(1, 187, 236, 0.05);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
}

.ui-target-popup__search {
  padding: 16px 24px 8px;
}

.ui-target-popup__search-field {
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 1.5rem;
    transform: translateY(-50%);
    width: 1.5rem;
    height: 1.5rem;
    background: url('@/assets/icons/search.svg') center / contain no-repeat;
  }

  input {
    padding-left: 60px;
  }
}

.ui-target-popup__response {
  max-height: 150px;
  overflow-y: auto;

  li {
    padding: 12px 24px 16px;
    font-weight: 400;
    font-size: 16px;
    color: #212126;
    border-top: 1px solid #F0F2FA;
  }
}

.ui-target-popup__close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  transform: scale(1.7);
}
</style>
