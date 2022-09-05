<template>
  <flat-pickr
      v-model="dataValue"
      :config="config"
      class="ui-form-field date"
      :placeholder="placeholder"
  ></flat-pickr>
</template>

<script>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import {Russian} from 'flatpickr/dist/l10n/ru.js'

export default {
  name: 'UiDateRangePicker',
  components: {
    flatPickr,
  },
  props: ['value', 'placeholder'],
  data() {
    return {
      config: {
        mode: 'range',
        dateFormat: 'd.m.Y',
        maxDate: new Date(new Date().getFullYear() + 2, 11, 31),
        minDate: '2020.12.30',
        conjunction: ' \u2013 ',
        locale: Russian,
      },
    }
  },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('update:value', value);
      },
    },
  },
}
</script>

<style scoped></style>
