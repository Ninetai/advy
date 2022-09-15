<template>
    <div class=" overlay camp-main">
        <!-- Create new ADS window -->
        <div class="start-popup ">
            <div class="camp-head">
                <translate>Выберите социальную сеть в которой необходима реклама</translate>
            </div>
            <div class="camp-body wrap">
                <button v-for="card in CampCard" :key="card.title">
                    <v-card elevation="2" class="camp-card">
                        <div class="card-head">
                            <v-card-title class="left">
                                <translate>{{card.title}}</translate>

                            </v-card-title>

                            <span v-if="card.icon=='public'" class="material-icons icon-style">
                                {{card.icon}}
                            </span>
                            <div v-else class="mtop20">
                                <v-icon :class="card.icon"></v-icon>
                            </div>
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
                    title: 'Инстаграм',
                    icon: 'icon-social instagram',
                    text: 'Трафик ориентированный на эту социальную сеть'
                },
                {
                    title: 'Тик-Ток',
                    icon: 'icon-social tiktok',
                    text: 'Трафик ориентированный на эту социальную сеть'
                },
                {
                    title: 'Телеграм',
                    icon: 'icon-social telegram',
                    text: 'Трафик ориентированный на эту социальную сеть'
                },
                {
                    title: 'Другая',
                    icon: 'public',
                    text: 'Трафик ориентированный на эту социальную сеть'
                }
            ]
        }
    },
    methods: {
        camp_next() {
            this.$router.push({ name: 'campaign_category' });
        },
        cancel() {
            this.$router.push({ name: 'campaign_start' });
        }
    }
}
</script>
  
<style scoped lang="scss">

</style>
  