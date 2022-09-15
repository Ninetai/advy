
<template>
    <div>
        <translate style="justify-content:left; display:flex; color:#27292C80; margin-bottom: 5px;"> Пол аудитории
        </translate>
        <v-row>
            <v-col class="pa-12">
                <div style="display: flex; justify-content: space-between;">
                    <label for="">0</label>
                    <label for="">18</label>
                    <label for="">25</label>
                    <label for="">35</label>
                    <label for="">45</label>
                    <label for="">55</label>
                    <label for="">+</label>
                </div>
                <v-range-slider :value="[0, 1]" min="0" max="6" ticks="always" tick-size="7">
                    <template v-slot:thumb-label="props">
                        <v-icon dark>
                            {{ season(props.value) }}
                        </v-icon>
                    </template>
                </v-range-slider>
            </v-col>
        </v-row>
        <translate style="justify-content:left; display:flex; color:#27292C80; margin-bottom: 5px;"> Пол аудитории
        </translate>
        <v-row>
            <v-col class="pa-12">
                <div style="display: flex; justify-content: space-between;">
                    <label for="">Женщины</label>
                    <label for="" style="transform: translateX(-30px);">50%</label>
                    <label for="">0</label>
                    <label for="" style="transform: translateX(30px);">50%</label>
                    <label for="">Мужчины</label>
                </div>
                <v-range-slider :value="[0, 1]" min="0" max="4" ticks="always" tick-size="5">
                    <template v-slot:thumb-label="props">
                        <v-icon dark>
                            {{ season(props.value) }}
                        </v-icon>
                    </template>
                </v-range-slider>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    data: () => ({
        seasons: [
            'Winter',
            'Spring',
            'Summer',
            'Fall',
        ],
        icons: [
            'mdi-snowflake',
            'mdi-leaf',
            'mdi-fire',
            'mdi-water',
        ],
    }),

    methods: {
        season(val) {
            return this.icons[val]
        },
    },
}
</script>
