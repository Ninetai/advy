<template>
  <div>
    <p><translate>Сделай скриншоты твоей статистики в instagram, как на примере ниже (минимум 2 скриншота)</translate></p>
    <div class="d-flex pb-5">
      <div class="h4">1.</div>
      <img src="@/assets/influencer/instructions/1.jpeg" style="width: 24%">
      <div class="h4 pl-3">2.</div>
      <img src="@/assets/influencer/instructions/2.jpeg" style="width: 24%">
      <div class="h4 pl-3">3.</div>
      <img src="@/assets/influencer/instructions/3.jpeg" style="width: 24%">
    </div>

    <div class="d-flex pb-5">
      <div class="h4 pl-3">4.</div>
      <img src="@/assets/influencer/instructions/4.jpeg" style="width: 24%">
      <div class="h4">5.</div>
      <img src="@/assets/influencer/instructions/5.jpeg" style="width: 24%">
      <div class="h4 pl-3">6.</div>
      <img src="@/assets/influencer/instructions/6.jpeg" style="width: 24%">
    </div>

    <div class="d-flex pb-5">
      <div class="h4 pl-3">7.</div>
      <img src="@/assets/influencer/instructions/7.jpeg" style="width: 24%">
      <div class="h4 pl-3">8.</div>
      <img src="@/assets/influencer/instructions/8.jpeg" style="width: 24%">
    </div>

    <input 
      class="form__field form__field_acc" :class="cls"
      type="file"
      accept="image/*" 
      multiple
      @change="onChange"
      style="width: 100%"
    />

  </div>
</template>

<style scoped>
  .d-flex {
    display: flex
  }
  .h4 {
    font-size: 150%
  }
</style>

<script>
  export default {
    props: {
      value: FileList,
      limit: Number,
      cls: Object
    },
    data() {
      return {
        files: []
      }
    },
    components: {
    },
    methods: {
      onChange(e) {
        this.files = e.target.files;
        this.$emit('input', this.files)
      }
    }
  }
</script>
