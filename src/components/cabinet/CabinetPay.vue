<template>
  <div class="cabinet-pay">
    <div class="cabinet-pay__head">
      <h3 class="descript__header descript__header_user"><translate>Платежная информация</translate></h3>
      <router-link v-if="user" :to="{
        name: 'story',
        params: {
          id: user.id
        }
      }" class="story-btn">
        <translate>История оплаты</translate>
      </router-link>
    </div>
    <template v-if="cardList && cardList.length > 0">
      <div v-for="(card, index) in cardList" class="cabinet-pay__block">
        <div class="cabinet-card">
          {{ card.hidden_card_number }} <span v-if="index === 0" class="cabinet-card__status"><translate>(основная)</translate></span>
        </div>
        <!--<div class="card-menu">
          <UiDropdown class="table-block__item dropdown">
            <a href="#" class="dropdown__link dropdown__link_edit">
              <translate>Редактировать</translate>
            </a>
            <a href="#" class="dropdown__link dropdown__link_main">
              <translate>Сделать основной</translate>
            </a>
            <a href="#" class="dropdown__link dropdown__link_delete">
              <translate>Удалить</translate>
            </a>
          </UiDropdown>
        </div>-->
      </div>
    </template>
    <h3 v-else style="margin-bottom: 1rem"><translate>Нет добавленных карт</translate></h3>

    <button @click.prevent="$emit('add-card')" type="button"
            class="card-btn card-btn_card add-card">
      <translate>Добавить карту</translate>
    </button>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import UiDropdown from "@/components/ui/UiDropdown";

export default {
  name: 'CabinetPay',
  components: {UiDropdown},
  data() {
    return {
      currentAccountId: '',
      cardList: [],
    }
  },
  created() {
    this.getCards();
  },
  methods: {
    ...mapActions([
      'getUsersAccount',
      'getCardList',
    ]),
    getCards() {
      this.getUsersAccount()
          .then((response) => {
            let userAccountList = response.data[0];
            this.currentAccountId = userAccountList[0].id;

            this.getCardList(this.currentAccountId).then(res => this.cardList = res.data);
          });
    },
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>

<style scoped lang="scss">
.story-btn {
  padding: 2px 0 2px 28px;
  margin-bottom: 24px;
  display: block;
  font-weight: 700;
  color: var(--blue);
  font-size: var(--body-small);
  background: url('@/assets/icons/clock.svg') center left / contain no-repeat;
  @media (max-width: 420px) {
    width: 20px;
    height: 20px;
    font-size: 0;
  }
}

.cabinet-card {
  font-weight: 500;
}

.cabinet-card__status {
  font-size: var(--caps-small);
  color: var(--very-light-gray);
}

.cabinet-pay__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cabinet-pay__block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(190, 194, 205, 0.5);
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
}
</style>
