<template>
    <div data-app>
        <v-data-table class="table manager-list" :headers="headers" :items="campaignList" :itemsPerPage="perPage"
            :sort-by.sync="currentSortBy" :sort-desc.sync="currentSortDesc" dense hide-default-footer
            @page-count="pageCount = $event">
            <template v-slot:item="{ item }">
                <tr>
                    <td class="manager-list__cell">
                        {{ item.id }}
                    </td>
                    <td class="manager-list__cell ">{{ item.start_date }} - {{ item.end_date }}</td>
                    <td class="manager-list__cell ">${{ item.offers_reach }}</td>
                    <td class="manager-list__cell ">{{ item.budget }}</td>
                    <td class="manager-list__cell ">
                        <v-btn x-small style="background:#367BF233; border-radius: 20px; color:#367BF2 ">В процессе
                        </v-btn>
                    </td>
                    <td class="manager-list__cell ">{{ item.offers_spend }}</td>
                    <td class="manager-list__cell ">
                        <button>
                            <span class="material-icons ">
                                cloud_download
                            </span>
                        </button>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </div>

</template>
  
<script>
import { mapActions, mapState } from "vuex";
import UiStatus from '@/components/ui/UiStatus';
import UiDropdown from '@/components/ui/UiDropdown';
import UiCard from "@/components/ui/UiCard";

export default {
    name: 'CampaignList',
    components: {
        UiCard,
        UiStatus,
        UiDropdown,
    },
    props: ['sortBy', 'perPage', 'sortDesc'],
    data() {
        return {
            headers: [
                { text: this.$gettext('id'), value: 'id', class: 'manager-list__cell' },
                { text: this.$gettext('Дата операции'), value: 'date_operation', class: 'manager-list__cell ' },
                { text: this.$gettext('Сумма'), value: 'sum', class: 'manager-list__cell ', sortable: false },
                { text: this.$gettext('Номер карты'), value: 'card_number', class: 'manager-list__cell ', sortable: false },
                { text: this.$gettext('Статус'), value: 'status', class: 'manager-list__cell ctr', sortable: false },
                { text: this.$gettext('Номер счет'), value: 'account_number', class: 'manager-list__cell ', sortable: false },
                { text: ' ', value: 'action', class: 'manager-list__cell action', sortable: false },
            ],
            selectedItem: null,
            windowWidth: window.innerWidth,
            currentSortBy: 'name',
            currentSortDesc: false,
            page: 1,
            pageCount: 0,
        }
    },
    watch: {
        sortBy: {
            handler(value) {
                this.currentSortBy = value;
            },
            deep: true,
            immediate: true
        },
        currentSortBy(value) {
            this.$emit('update:sortBy', value)
        },
        sortDesc: {
            handler(value) {
                this.currentSortDesc = value;
            },
            deep: true,
            immediate: true
        },
        currentSortDesc(value) {
            this.$emit('update:sortDesc', value)
        }
    },
    created() {
        this.pageCount = Math.round(this.totalCount / this.perPage);
    },
    methods: {
        ...mapActions(['putCampaignDuplicate', 'putCampaignDelete', 'putCampaignPayment']),
        displayUpdateCampaignPopup(campaignId) {
            this.$emit('open-edit-popup', campaignId);
        },
        duplicateCampaign(campaignId) {
            this.putCampaignDuplicate(campaignId).then(() => this.$emit('reload-list'));
        },
        payCampaign(campaignId) {
            //@todo добавить обработку ошибок
            this.putCampaignPayment(campaignId).then(() => this.$emit('reload-list'))
        },
        deleteCampaign(campaignId) {
            this.putCampaignDelete(campaignId).then(() => this.$emit('reload-list'))
        },
        toggleItem(id) {
            this.selectedItem === id ? this.selectedItem = null : this.selectedItem = id;
        },
    },
    computed: {
        ...mapState({
            campaignList: 'campaignList',
            totalCount: 'campaignTotalCount'
        }),
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', () => this.windowWidth = window.innerWidth);
        });
    },
    beforeDestroy() {
        window.removeEventListener('resize', () => this.windowWidth = window.innerWidth);
    },
}
</script>
  
<style scoped lang="scss">
.manager-list__cell {
    text-align: center;

    &.name {
        text-align: left;
    }

    &.reach,
    &.ctr,
    &.spend,
    &.budget,
    &.conversions,
    &.barter {
        max-width: 4rem;
    }

    &.action {
        max-width: 3.2rem;
    }
}

.manager-list__link {
    small {
        display: block;
        font-weight: 400;
        color: grey;
    }
}
</style>
  