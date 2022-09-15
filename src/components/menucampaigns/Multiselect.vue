<template>
    <div>
        <div>
            <v-combobox v-model="select" :items="items" label="Регион показов" multiple outlined small-chips
                style="margin-bottom:-10px; border-radius: 16px;">
            </v-combobox>
            <v-combobox v-model="select" :items="items" label="Интересы аудитории" multiple outlined small-chips
                style="margin-bottom:-10px; border-radius: 16px;">
            </v-combobox>
        </div>
        <div style=" display: flex;">
            <input type="text" class="search" placeholder="Поиск по названию" />
            <div style="position:relative;">
                <span class="icon-search">
                    $
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            select: ['Vuetify', 'Programming'],
            items: [
                'Programming',
                'Design',
                'Vue',
                'Vuetify',
            ],
        }
    },
}
</script>

<style>
.search {
    box-sizing: border-box;

    /* Auto layout */

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px;
    padding-left: 20px !important;
    margin-bottom: 20px;
    gap: 10px;
    width: 100%;
    height: 50px;

    border: 1px solid rgba(39, 41, 44, 0.1);
    border-radius: 16px;

}

.icon-search {
    position: absolute;
    margin-left: -35px;
    margin-top: 15px;
}
</style>