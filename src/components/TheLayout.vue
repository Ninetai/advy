<template>
    <div class="lay-out">
        <CampaignCreatePopup v-if="isNewCampaign" :mode="'create'" @close-popup="onPopupClose($event)" />

        <div>
            <router-link :to="{ name: 'manager' }">
                <img src="@/assets/icons/logo.svg" class="logo" alt="logo">
            </router-link>
        </div>

        <div style="padding:0px 20px">
            <v-btn depressed class="create-button" @click="isNewCampaign = true">
                + <translate>
                    Создать кампанию
                </translate>
            </v-btn>
        </div>

        <div class="menu-title">
            <v-list dense rounded style="background-color: #f0f2fa; ">
                <v-list-item v-for="item in items" :key="item.title" link
                    style="padding-left:25px; margin-bottom: 10px; " @click="listItem(item)"
                    :class="{'clicked':item.done, 'unclicked':!item.done}">
                    <img :src="item.icon" />
                    <!-- <v-list-item-title> -->
                    <div style="padding-left:20px">
                        <translate>{{ item.title }}</translate>
                    </div>
                    <!-- </v-list-item-title> -->
                </v-list-item>
            </v-list>
        </div>
    </div>

</template>

<script>
import CampaignCreatePopup from '@/components/campaign/CampaignCreatePopup';
import Overview from "@/assets/Overview.svg";
import Campaigns from "@/assets/Campaigns.svg";
import Bloggers from "@/assets/Bloggers.svg";
import Barter from "@/assets/Barter.svg";
import infor from "@/assets/infor.svg";
export default {
    name: 'layout',
    components: {
        CampaignCreatePopup,
    },
    data() {
        return {
            isNewCampaign: false,
            items: [
                { title: 'Обзор', icon: Overview, done: false },
                { title: 'Кампании', icon: Campaigns, done: false },
                { title: 'Блогеры', icon: Bloggers, done: false },
                { title: 'Бартер', icon: Barter, done: false },
                { title: 'Информация', icon: infor, done: false },
            ],
            right: null,
        }
    },

    methods: {
        onPopupClose(value) {
            this.isNewCampaign = false;
        },
        listItem(item) {
            this.items.map((initItem) => {
                initItem.done = false;
            })
            item.done = true;
        }

    }
}
</script>
<style scoped>
.lay-out {
    width: 300px;
    padding: 20px;
    padding-left: 30px;
    background: #f0f2fa;
    text-align: center;
    justify-content: center;
}

.create-button {
    background-color: #FE5D6D !important;
    color: white !important;
    width: 100%;
    height: 43px !important;
    border-radius: 17px;
}


.logo {
    width: 140px;
    margin-bottom: 20px;
}

.menu-title {
    margin-top: 60px;
}

.clicked {
    background-color: #dddce2;
}

.unclicked {
    background-color: #f0f2fa;
}
</style>