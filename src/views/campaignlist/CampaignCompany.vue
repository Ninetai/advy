<template>
    <div class=" overlay camp-main">
        <!-- Create new ADS window -->
        <div class="start-popup ">
            <div class="camp-head">
                <translate>Выберите категории которым соответсвует ваш продукт</translate>
            </div>
            <div class="camp-body wrap">
                <button v-for="card in CampCard" :key="card.title">
                    <v-card elevation="2" class="camp-card">
                        <div class="card-head">
                            <v-card-title class="left">
                                <translate>{{card.title}}</translate>

                            </v-card-title>
                            <v-icon class="mtop25" :class="card.icon"></v-icon>
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
                    <translate>Назад</translate>
                </button>
                <div class="form__button middle-button">
                    <translate>Блогеров доступно: ~600</translate>
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
                    title: 'Ozon',
                    icon: 'icon-social ozon',
                    text: 'Интернет магазин'
                },
                {
                    title: 'Mercedes',
                    icon: 'icon-social mercedes',
                    text: 'Производство автомабилей'
                },
                {
                    title: 'Xiaomi',
                    icon: 'icon-social xiaomi',
                    text: 'Техника, системное ПО'
                },
                {
                    title: 'Willdberries',
                    icon: 'icon-social willd',
                    text: 'Интернет магазин'
                },
                {
                    title: 'Apple',
                    icon: 'icon-social apple1',
                    text: 'Техника, системное ПО'
                },
                {
                    title: 'Space X',
                    icon: 'icon-social space',
                    text: 'Космическа компания'
                },
                {
                    title: 'Коммунарка',
                    icon: 'icon-social kommy',
                    text: 'Кондитерские изделия'
                },
                {
                    title: 'Другая',
                    icon: 'icon-social',
                    text: 'Выберите компанию из списка'
                }
            ]
        }
    },
    methods: {
        camp_next() {
            this.$router.push({ name: 'campaign_final' });
        },
        cancel() {
            this.$router.push({ name: 'campaign_segment' });
        }
    }
}
</script>
  
<style scoped lang="scss">

</style>
  