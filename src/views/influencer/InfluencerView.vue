<template>
  <router-view/>
</template>

<script>
  import {KinesisContainer, KinesisElement} from 'vue-kinesis';

  export default {
    name: 'IndexView',
    components: {
      KinesisContainer,
      KinesisElement
    },
    data() {
      return {
        info: {}
      }
    },
    computed: {
    },
    mounted() {
    },
    methods: {
    }
  }
</script>