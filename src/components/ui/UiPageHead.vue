<template>
  <UiCard class="ui-head-companies" :class="{'inline': isInline}">
    <div class="ui-head-companies__inner">
      <div class="ui-head-companies__title">
        <slot name="title"></slot>
      </div>
      <div class="ui-head-companies__buttons">
        <slot name="action"></slot>
      </div>
    </div>
    <slot name="filters"></slot>
  </UiCard>
</template>

<script>
import UiCard from '@/components/ui/UiCard';

export default {
  name: 'UiPageHead',
  props: ['isInline'],
  components: {
    UiCard,
  },
}
</script>

<style scoped lang="scss">
.ui-head-companies {
  @media (max-width: 768px) {
    min-height: 76px;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    border-radius: 0;
    box-shadow: 0 1px 0 rgb(0 0 0 / 10%);
  }

  &:not(.inline) {
    @media (max-width: 768px) {
      flex-direction: column;
    }

    .ui-head-companies__inner {
      @media (max-width: 768px) {
        flex-direction: column;
      }
    }

    .ui-head-companies__title {
      @media (max-width: 768px) {
        width: 100%;
        box-shadow: 0 1px 0 rgb(0 0 0 / 10%);
        padding-bottom: 16px;
        margin-bottom: 16px;
      }
    }

    .ui-head-companies__buttons {
      flex-grow: 1;
      @media (max-width: 655px) {
        width: 100%;
      }
    }
  }
}

.ui-head-companies__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    width: 100%;
  }
}

.ui-head-companies__buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 655px) {
    justify-content: space-between;
  }
}
</style>
