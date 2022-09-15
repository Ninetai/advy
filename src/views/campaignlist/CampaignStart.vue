<template>
    <div class="overlay camp-main">
        <!-- Create new ADS window -->
        <div class="start-popup ">
            <div class="camp-head">
                <translate>Настройка и запуск кампании за 5 минут</translate>
            </div>
            <div class="camp-body wrap">
                <button v-for="card in CampCard" :key="card.title">
                    <v-card elevation="2" class="camp-card">
                        <div class="card-head">
                            <v-card-title class="left">
                                <translate>{{card.title}}</translate>

                            </v-card-title>
                            <span class="material-icons icon-style">
                                {{card.icon}}
                            </span>
                        </div>
                        <v-card-text class="left">
                            <translate>{{card.text}}</translate>
                        </v-card-text>
                    </v-card>
                </button>
            </div>
            <v-divider style="padding-bottom:20px"></v-divider>
            <div class="camp-body">
                <button class="form__button cancel " type="button" @click="cancel">
                    <translate>Отмена</translate>
                </button>
                <div class="form__button middle-button">
                    <translate>Блогеров доступно: 5 600</translate>
                </div>
                <button class="form__button next" type="button" @click="camp_next">
                    <translate>Продолжить</translate>
                </button>
            </div>
        </div>
        <!-- <TheErrorPopup v-if="scene === 'error'" @repeat-popup="scene = 'init'"
            @cancel-popup="$emit('close-popup', false)" /> -->
    </div>
</template>
  
<script>


export default {
    name: 'FreeSignup',
    data() {
        return {
            CampCard: [
                {
                    title: 'Охватная кампания',
                    icon: 'podcasts',
                    text: 'Повышаем узнаваемость вашего бренда'
                },
                {
                    title: 'Трафик для социальных сетей',
                    icon: 'public',
                    text: 'Только трафик ориентированный на социальные сети'
                },
                {
                    title: 'Прямые продажи',
                    icon: 'work',
                    text: 'Точечное повышение продаж'
                },
                {
                    title: 'Набор подписчиков',
                    icon: 'people_alt',
                    text: 'Оплата за увеличение числа подписчиков'
                }
            ]
        }
    },
    methods: {
        camp_next() {
            this.$router.push({ name: 'campaign_social' });
        },
        cancel() {
            this.$router.push({ name: 'campaigns_box' });
        }
    }
}
</script>
  
<style scoped lang="scss">

</style>
  