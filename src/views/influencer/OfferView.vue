<template>
  <main>
    <div class="wrapper wrapper_main">
      <div class="main-content manager-page">
        <OfferList/>
      </div>
    </div>
  </main>
</template>

<script>
import {mapActions} from "vuex";
import OfferList from '@/components/influencer/offer/OfferList';

export default {
  name: 'OfferView',
  components: {
    OfferList,
  },
  data() {
    return {
    }
  },
  created() {
    
  },
  mounted() {
    
  },
}
</script>

<style scoped lang="scss">
.manager-page {
}
</style>
