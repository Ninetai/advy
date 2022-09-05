<template>
  <div class="form-group">
    <label><translate>Готов(а) на рекламу по бартеру?</translate></label>
    <select 
      name="barter"
      ref="barter" 
      class="form-control form-control-solid h-auto rounded-lg"
      @change="onChange($event)"
    >
      <option value=""><translate>--Выбери вариант--</translate></option>
      <option v-for="option in options" :key="option[0]" :value="option[0]"> {{ option[1] }} </option>
    </select>
  </div>
</template>

<script>

export default {
  props: {
    value: String
  },
  data() {
    return {
      options: [
        [1, this.$gettext('Да')], 
        [2, this.$gettext('Нет')], 
        [3, this.$gettext('Оплата + бартер')], 
        [4, this.$gettext('Смотря какой продукт')]
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
