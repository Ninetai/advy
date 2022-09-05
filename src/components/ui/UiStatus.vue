<template>
  <div class="status-text" :class="status|classModificator">{{ status }}</div>
</template>

<script>
export default {
  name: 'UiStatus',
  props: ['status'],
  filters: {
    classModificator(status) {
      let modificator;

      if (status === "accepted") {
        modificator = "status-text_done";
      } else if (status === "completed") {
        modificator = "status-text_process";
      } else {
        modificator = '';
      }

      return modificator;
    },
  },
}
</script>

<style scoped lang="scss">
.status-text {
  padding: 4px 8px;
  display: inline-block;
  color: var(--gray-status);
  font-size: var(--caps-small);
  font-weight: 600;
  white-space: nowrap;
  border-radius: 8px;
  background-color: var(--bg-gray);
  @media (max-width: 768px) {
    padding: 2px 8px;
  }
}

.status-text_process {
  background-color: rgba(52, 199, 89, 0.2);
  color: var(--green);
}

.status-text_moderate {
  background-color: rgba(236, 64, 122, 0.2);
  color: var(--status-red);
}

.status-text_done {
  background-color: rgba(54, 123, 242, 0.2);
  color: var(--blue);
}
</style>
