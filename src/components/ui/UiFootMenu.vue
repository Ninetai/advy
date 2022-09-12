<template>
    <div class="foot-topmenu">
        <h4>{{title}}</h4>
        <v-menu top left>
            <template v-slot:activator="{ on, attrs }">
                <v-btn dark icon v-bind="attrs" v-on="on">
                    <img src="@/assets/more_icon.svg" />
                </v-btn>
            </template>
            <v-list>
                <v-list-item v-for="(list_item, i) in list_items" :key="i">
                    <v-list-item-title>{{ list_item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <!-- <button></button> -->
    </div>
</template>

<script>
export default {
    props: ['title'],
    data() {
        return {

            list_items: [
                { title: 'Click Me' },
                { title: 'Click Me' },
                { title: 'Click Me' },
                { title: 'Click Me 2' },
            ],
        }
    }
}
</script>

<style scoped>
.foot-topmenu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
</style>