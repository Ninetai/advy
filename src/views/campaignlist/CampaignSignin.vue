<template>
    <div class="overlay_sign overlay camp-main">
        <!-- Create new ADS window -->
        <div class="start-popup start-camp">
            <div class="camp-head">
                <translate style="color:red"> Бесплатно</translate> &nbsp;
                <translate> настроить первую кампанию</translate>
            </div>
            <translate style="font-size:14px">
                Оставьте свой адрес электронной почты, менеджер свяжется с вами и поможет
                настроить первую
                рекламную кампанию!
            </translate>
            <form action="#" @submit.prevent="submitCampaign" class="form-document " style="margin-top:20px">
                <input type="text" class="form__field" placeholder="Ссылка на социальную сеть">
                <input class="form__field" @blur="validate('name')" placeholder="Ваш адрес электронной почты">

                <button class="form__button send " type="button">
                    <translate>Отправить</translate>
                </button>
                <button class="form__button own" type="submit">
                    <translate>Я настрою сам</translate>
                </button>
            </form>
        </div>
        <div class="chip-popup">
            <h1>
                <translate>Запускайте рекламные</translate> <br />
                <translate>кампании в несколько кликов с целевым охватом до 2 000 000
                </translate>
            </h1>
            <div class="menu-chip">
                <div v-for="chip in menuchips" :key="chip.id" class="chip-item">
                    <v-chip class="ma-2" color="pink" label text-color="white" style="border-radius: 20px !important;">
                        <span class="material-icons ">
                            {{chip.id}}
                        </span>
                        <translate>{{chip.name}}</translate>
                    </v-chip>
                    <span v-if="chip.id != 'trending_up'" class="material-icons ">
                        arrow_right_alt
                    </span>
                </div>
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
            menuchips: [
                { id: 'search', name: 'Поиск' },
                { id: 'visibility', name: 'Провека' },
                { id: 'model_training', name: 'Анализ' },
                { id: 'emoji_emotions', name: 'Коммуникация' },
                { id: 'rotate_right', name: 'Анализ блогера' },
                { id: 'local_atm', name: 'Выплаты' },
                { id: 'trending_up', name: 'Оценка результата' }
            ],
        }
    },
    methods: {
        submitCampaign() {
            this.$router.push({ name: 'campaign_start', replace: true });
        }
    }
}
</script>
  
<style scoped lang="scss">

</style>
  