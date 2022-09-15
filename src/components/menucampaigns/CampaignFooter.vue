<template>
    <div class="foot">
        <v-card outlined class="foot-card">
            <UiFootMenu :title="'Лучшая кампания'" />
            <h2 style=" font-weight: bold;">21% - Coca Cola</h2>
            <div class="expire-date">
                <h5>01.09.2022</h5>
                <img src="@/assets/Shape.svg" alt="">
                <h5>31.09.2022</h5>
            </div>
        </v-card>

        <v-card outlined class="foot-card">
            <UiFootMenu :title="'Топ блоггеров, ER %'" />
            <div v-for="item in bloggeritems" :key="item.id" style="display:flex; align-items: center; gap: 10px">
                <h2 style=" font-weight: bold; margin-right:10px">{{item.id}}</h2>
                <img :src="item.imgsource" style="width:30px" alt="">
                <h5>{{item.value}} </h5>
            </div>
        </v-card>

        <v-card outlined class="foot-card">
            <UiFootMenu :title="'Другие компании'" />
            <div style="display:flex; gap: 10px; ">
                <div v-for="company in companies" :key="company.name" class="foot-box">
                    <img :src="company.imgsource" style="transform: translate(0px,-20px) ;" alt="">
                    <h4 style="font-weight: bold; margin-top:-35px">{{company.name}}</h4>
                    <h5>{{company.value}} </h5>
                    <v-btn rounded dark x-small style="width:100px; margin:10px">
                        Normal
                    </v-btn>
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
import UiFootMenu from "@/components/ui/UiFootMenu.vue";
import user1 from "@/assets/user1.png";
import user2 from "@/assets/user2.png";
import user3 from "@/assets/user3.png";
import Artur from "@/assets/Artur.png";
import Artur1 from "@/assets/Artur-1.png";
import Artur2 from "@/assets/Artur-2.png";
export default {
    components: {
        UiFootMenu,
    },
    data() {
        return {

            bloggeritems: [
                { id: 1, imgsource: user1, value: 'Алекс - 19,1% ' },
                { id: 2, imgsource: user2, value: 'Марта - 17,8% ' },
                { id: 3, imgsource: user3, value: 'Ангелина - 17,4% ' },
            ],
            companies: [
                { name: 'StarBucks', value: 'CTR 18,47%', imgsource: Artur },
                { name: 'Mercedes', value: 'CTR 18,47%', imgsource: Artur1 },
                { name: 'BMW', value: 'CTR 18,47%', imgsource: Artur2 }
            ]
        }
    }
}
</script>

<style>
.foot {
    display: flex;
    gap: 20px;
    padding-left: 0px !important;
    padding: 24px;
    flex-wrap: wrap;
}

.foot-card {
    flex: 1;
    padding: 20px;
    border-radius: 10px;
}

.expire-date {
    display: flex;
    margin-top: 70px;
    gap: 20px;
}

.foot-box {
    flex: 1;
    background-color: #27292C08;
    border-radius: 10px;
    text-align: center;
}
</style>