<template>
    <v-menu v-model="menu" :close-on-content-click="false" offset-x>
        <template v-slot:activator="{ on, attrs }">
            <button class="form__button middle-button" v-bind="attrs" v-on="on">
                <translate>Блогеров доступно: 5 600</translate>
            </button>
        </template>

        <v-card>
            <v-list>
                <v-list-item>
                    <input type="text" class="search" placeholder="Поиск по названию" />
                    <span class="material-icons icon-search">
                        search
                    </span>
                </v-list-item>
            </v-list>
            <div v-for="item in menuItems" :key="item.name">
                <v-divider></v-divider>
                <v-list-item>
                    <v-list-item-action>
                        <v-checkbox v-model="item.value"></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-title class="camp-icon">
                        {{item.icon}}<translate>{{item.name}}</translate>
                    </v-list-item-title>
                </v-list-item>
            </div>
        </v-card>
    </v-menu>
</template>

<script>
export default {
    data() {
        return {
            menu: false,
            menuItems: [
                {
                    name: 'Игры и развлечения',
                    value: true,
                    icon: '🕹️'
                },
                {
                    name: 'Бизнес и финансы',
                    value: false,
                    icon: '💸'
                },
                {
                    name: 'Знакомства и люди',
                    value: false,
                    icon: '👫'
                },
            ]

        }
    }
}
</script>

<style scoped>
.camp-icon {
    text-align: left;
    padding-left: 15px !important;
}

.search {
    box-sizing: border-box;

    /* Auto layout */

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px;
    padding-left: 50px !important;
    gap: 10px;

    width: 252px;
    height: 50px;

    background: #FFFFFF;
    border: 1px solid rgba(39, 41, 44, 0.1);
    border-radius: 16px;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
}

.icon-search {
    position: absolute;
    padding-left: 17px;
}
</style>