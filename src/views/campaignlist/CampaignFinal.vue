<template>
    <div class=" overlay camp-main">
        <!-- Create new ADS window -->
        <div class="start-popup ">
            <div class="camp-head">
                <translate>Выберите социальную сеть в которой необходима реклама</translate>
            </div>
            <div>
                <RangeSlider />
            </div>
            <div>
                <Multiselect />
            </div>
            <v-divider style="padding-bottom:20px"></v-divider>
            <div class="camp-body">
                <button class="form__button cancel " type="button" @click="cancel">
                    <translate>Назад</translate>
                </button>
                <div class="form__button middle-button">
                    <translate>Блогеров доступно: 1 200</translate>
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
import Multiselect from '@/components/menucampaigns/Multiselect';
import RangeSlider from '@/components/menucampaigns/RangeSlider'

export default {
    components: {
        Multiselect,
        RangeSlider
    },
    name: 'FreeSignup',
    data() {
        return {
            items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
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
            this.$router.push({ name: 'campaigns_box' });
        },
        cancel() {
            this.$router.push({ name: 'campaign_company' });
        }
    }
}
</script>
  
<style scoped lang="scss">

</style>
  