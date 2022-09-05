<template>
  <select class="select" @change="onChange">
    <option value=""><translate>Как часто хочешь размещать рекламу?</translate></option>
    <option v-for="option in options" :key="option[0]" :value="option[0]"> {{ option[1] }} </option>
  </select>
</template>

<script>

export default {
  props: {
    value: String
  },
  data() {
    return {
      options: [
        [1, this.$gettext('1-3 раза в месяц')], 
        [2, this.$gettext('3-6 раз в месяц')], 
        [3, this.$gettext('Не важно')]
      ]
    }
  },
  mounted(){
  },
  methods: {
    onChange(event) {
      this.$emit('input', event.target.value)
    }
  }
};
</script>
