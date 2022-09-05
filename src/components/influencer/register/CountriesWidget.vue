<template>
  <select v-model="selected" class="select" @change="onChange()">
    <option value=""><translate>Твоя страна</translate></option>
    <option :value="country.code" :key="index"
      v-for="(country, index) in filtered_countries">
      {{ country.name }}
    </option>
  </select>
</template>

<script>
  import {mapActions} from "vuex"

  export default {
    components: {
    },
    props: {
      value: String
    },
    data() {
      return {
        selected: '',
        countries: []
      }
    },
    computed: {
      filtered_countries() {
        return this.countries
      }
    },
    mounted() {
      this.getCountryList().then(
        response => this.countries = response.data
      )
    },
    methods: {
      ...mapActions(['getCountryList']),
      onChange() {
        this.$emit('input', this.selected)
      }
    }
  }
</script>
