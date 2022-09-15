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
                            <div class="mtop20">{{card.icon}}</div>
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
                <CampaignMenu />
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

import CampaignMenu from '@/components/menucampaigns/CampaignMenu'

export default {
    name: 'FreeSignup',
    components: {
        CampaignMenu
    },
    data() {
        return {
            CampCard: [
                {
                    title: 'Авто и Мото',
                    icon: '🚗',
                    text: 'Трафик ориентированный на эту категорию'
                },
                {
                    title: 'Досуг и хобби',
                    icon: '🧶',
                    text: 'Трафик ориентированный на эту категорию'
                },
                {
                    title: 'Здоровье',
                    icon: '🩺',
                    text: 'Трафик ориентированный на эту категорию'
                },
                {
                    title: 'Культураи искусство',
                    icon: '🖼️',
                    text: 'Трафик ориентированный на эту категорию'
                },
                {
                    title: 'Спорт',
                    icon: '👟',
                    text: 'Трафик ориентированный на эту категорию'
                },
                {
                    title: 'Наука и техника',
                    icon: '🔬',
                    text: 'Трафик ориентированный на эту категорию'
                },
                {
                    title: 'Новостии СМИ',
                    icon: '📰',
                    text: 'Трафик ориентированный на эту категорию'
                },
                {
                    title: 'Другая',
                    icon: '💕',
                    text: 'Трафик ориентированный на эту категорию'
                }
            ]
        }
    },
    methods: {
        camp_next() {
            this.$router.push({ name: 'campaign_segment' });
        },
        cancel() {
            this.$router.push({ name: 'campaign_social' });
        }
    }
}
</script>
  
<style scoped lang="scss">

</style>
  