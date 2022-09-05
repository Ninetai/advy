<template>
  <div>
    <UiCard v-for="offer in offers" :key="offer.id" class="ui-item-card">
      <div class="ui-item-card__name">
        {{ offer.advertiser }}
      </div>
      <div class="ui-item-card__header">{{ offer.campaign.name }}</div>
      <div class="ui-item-card__period">
        {{ offer.created_at | datify }}
      </div>
      <div class="py-3">
        <span class="md-text text-dark" v-html="offer.campaign.description"></span>
      </div>

      <div class="ui-item-card__status">
        <translate>Вознаграждение:</translate> {{ offer.currency }} {{ offer.price }}
      </div>

      <div v-if="offer.status == 'new' || offer.status == 'sent'" class="pt-12">
        <button
          @click="acceptOffer(offer.id)"
          type="button"
          class="btn-accept"
        >
          <translate>Принять</translate>
        </button>
        <button @click="rejectOffer(offer.id)" type="button" class="btn-reject">
          <translate>Отклонить</translate>
        </button>
      </div>
    </UiCard>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import UiCard from "@/components/ui/UiCard";

export default {
  name: 'OfferList',
  components: {
    UiCard,
  },
  data() {
    return {
      offers: []
    }
  },
  watch: {
    
  },
  created() {
  },
  methods: {
    ...mapActions(['getOfferList', 'setAcceptOffer', 'setRejectOffer']),
    updateOffer(offerId, data) {
      this.offers = this.offers.filter(o => o.id != offerId);
      this.offers.push(data)
    },
    acceptOffer(offerId) {
      this.setAcceptOffer(offerId).then(({data}) => {
        this.updateOffer(offerId, data)
      })
    },
    rejectOffer(offerId) {
      this.setRejectOffer(offerId).then(({data}) => {
        this.updateOffer(offerId, data)
      })
    },
  },
  computed: {
  },
  mounted() {
    this.getOfferList().then(({data}) => this.offers = data)
  },
  filters: {
    datify: function(value) {
      if (!value) return ''
      var data = new Date(value);
      return data.toLocaleString('en-GB',{hour12: false});
    }
  }
}
</script>

<style scoped lang="scss">
  .btn-accept {
    display: inline-block;
    background: #212126;
    color: white;
    padding: 10px 15px;
    border-radius: 10px;
    margin-right: 20px;
  }
  .md-text {
    font-size: 90%;
  }
  .py-3 {
    padding: 10px 0;
  }
</style>
