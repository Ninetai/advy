<template>
    <div class=" overlay camp-main">
        <!-- Create new ADS window -->
        <div class="start-popup ">
            <div class="camp-head">
                <translate>Выберите к какому ценовому сегменту относится ваш продукт</translate>
            </div>
            <div class="camp-body wrap">
                <button v-for="card in CampCard" :key="card.title">
                    <v-card elevation="2" class="camp-card">
                        <div class="card-head">
                            <v-card-title class="left">
                                <translate>{{card.title}}</translate>

                            </v-card-title>

                            <v-icon class="mtop30" :class="card.icon"></v-icon>
                        </div>
                        <v-card-text class="left">
                            <translate>{{card.text}}</translate>
                        </v-card-text>
                    </v-card>
                </button>
            </div>
            <div>
                <input type="text" class="form__field w-full" placeholder="Ссылка на страницу продукта" />
                <textarea class="form__field w-full" placeholder="Дополнительная информация " style="height:150px" />
            </div>
            <v-divider style="padding-bottom:20px"></v-divider>
            <div class="camp-body">
                <button class="form__button cancel " type="button" @click="cancel">
                    <translate>Назад</translate>
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
                    title: 'Низкий',
                    icon: 'icon-social chart1',
                    text: 'Например: мелкие предметы до 5$'
                },
                {
                    title: 'Средний',
                    icon: 'icon-social chart2',
                    text: 'Например: одежда, обувь'
                },
                {
                    title: 'Высокий',
                    icon: 'icon-social chart3',
                    text: 'Например: украшения, техника'
                },
                {
                    title: 'Премиум',
                    icon: 'icon-social chart4',
                    text: 'Например: автомобили, недвижимость'
                }
            ]
        }
    },
    methods: {
        camp_next() {
            this.$router.push({ name: 'campaign_company' });
        },
        cancel() {
            this.$router.push({ name: 'campaign_category' });
        }
    }
}
</script>
  
<style scoped lang="scss">

</style>
  