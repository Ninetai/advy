<template>
  <div class="ui-progress">
    <div class="ui-progress__background"></div>
    <div class="ui-progress__determinate" :style="{ width: progressValue + '%' }"></div>
  </div>
</template>

<script>
export default {
  name: 'UiProgress',
  props: ['progressValue'],
}
</script>

<style scoped lang="scss">
.ui-progress {
  position: relative;
  width: 100%;
  height: 7px;
  border-radius: 71.5px;
  overflow: hidden;
}

.ui-progress__background {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(54, 123, 242, 0.2);
}

.ui-progress__determinate {
  height: 100%;
  background: #367BF2;
  border-radius: 71.5px;
}
</style>
