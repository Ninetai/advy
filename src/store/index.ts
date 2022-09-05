import Vue from 'vue'
import Vuex from 'vuex'
import {ApiService} from "@/api/ApiService";
import axios from "axios";
import { API_HOST } from "@/config";

Vue.use(Vuex)

export const api: ApiService = new ApiService()

export default new Vuex.Store({
    state: {
        authToken: null,
        refreshToken: null,
        userId: null,
        accountsList: [],
        user: null,
        cardList: [],
        userAccountsList: [],
        campaignList: [],
        campaignTotalCount: 0,
        transactionList: [],

        campaignData: null,
        campaignDescription: null,
        campaignInfluencers: [],
        campaignInfluencersCount: 0,
        campaignResults: [],
        campaignResultsCount: 0,
        campaignBarter: [],
        campaignBarterCount: 0,

        influencerList: [],
    },
    getters: {
        getAuthToken: state => state.authToken,
        getRefreshToken: state => state.refreshToken,
        getUserId: state => state.userId,
        getAccountsList: state => state.accountsList,
        getCampaignTotalCount: state => state.campaignTotalCount,
        influencers: state => state.influencerList,
    },
    mutations: {
        updateAuthToken(state, authToken) {
            state.authToken = authToken;
        },
        updateRefreshToken(state, refreshToken) {
            state.refreshToken = refreshToken;
        },
        updateUserId(state, userId) {
            state.userId = userId;
        },
        updateAccountsList(state, accountsList) {
            state.accountsList = accountsList;
        },
        updateUser(state, data) {
            state.user = data[0];
            state.cardList = data[1];
            state.userAccountsList = data[3];
        },
        updateInfluencerList(state, influencer) {
            state.influencerList = influencer ?? [];
        },
        updateCampaignList(state, campaign) {
            state.campaignList = campaign?.results ?? [];
            state.campaignTotalCount = campaign?.count ?? 0;
        },
        updateTransactionsList(state, transactions) {
            state.transactionList = transactions ?? [];
        },
        updateCampaignData(state, campaignData) {
            state.campaignData = campaignData;
        },
        updateCampaignDescription(state, campaignDescription) {
            state.campaignDescription = campaignDescription;
        },
        updateCampaignInfluencers(state, campaignInfluencers) {
            state.campaignInfluencers = campaignInfluencers.results;
            state.campaignInfluencersCount = campaignInfluencers.count;
        },
        updateCampaignResults(state, campaignResults) {
            state.campaignResults = campaignResults.results;
            state.campaignResultsCount = campaignResults.count;
        },
        updateCampaignBarter(state, campaignBarter) {
            state.campaignBarter = campaignBarter.results;
            state.campaignBarterCount = campaignBarter.count;
        },
    },
    actions: {
        getCommonInfo(context) {
            return api.get('/api/common/info/');
        },
        botLogin(context, params) {
            return new Promise((resolve, reject) => {
                api.get('/api/chatbot/auth', params).then(response => {

                    localStorage.setItem('accessToken', response.data.access);
                    localStorage.setItem('refreshToken', response.data.refresh);
                    localStorage.setItem('userId', response.data.full_name);

                    context.commit('updateAuthToken', response.data.access);
                    context.commit('updateRefreshToken', response.data.refresh);
                    context.commit('updateUserId', response.data.full_name);

                    resolve(response);
                }).catch(err => reject(err))
            })
        },
        getAdCategoryList(context, topic) {
            return api.get(`/api/adv/ad_categories/`);
        },
        getBlogCategoryList(context, topic) {
            return api.get(`/api/adv/blog_categories/`);
        },
        getCountryList(context, topic) {
            return api.get(`/api/common/countries/`);
        },
        createProfile(context, params) {
            return new Promise(resolve => {
                let formData = new FormData();
                let headers = { 'Content-Type': 'multipart/form-data' };
          
                for (const field in params) {
                  if (Array.isArray(params[field])){
                    for (const el of params[field]) {
                      formData.append(field, el);
                    }
                  } else if (params[field]) {
                    formData.append(field, params[field]);
                  }
                }
          
                api.post("/api/users/register/", formData, {headers})
                    .then(({data}) => {
                        localStorage.setItem('accessToken', data.access);
                        localStorage.setItem('refreshToken', data.refresh);
                        localStorage.setItem('fullName', data.full_name);
                        resolve(data);
                    })
                    .catch(({response}) => {
                        console.log(response)
                    });
            });
        },
        getOfferList(context) {
            return api.get('api/adv/offers/');
        },
        setAcceptOffer(context, offerId) {
            return api.post('api/adv/offers/' + offerId + '/accept/');
        },
        setRejectOffer(context, offerId) {
            return api.post('api/adv/offers/' + offerId + '/reject/');
        },
        getCampaignSelection(context, id) {
            return api.get('/api/adv/campaign_selection/' + id);
        },
        getCampaignSelectionInfluencer(context, id) {
            return api.get('/api/adv/campaign_selection_influencer/' + id);
        },
        putCampaignJudgeResult(context, { scoreId, result }) {
            return api.put('/api/adv/assign_like_dislike/' + scoreId, {result});
        },
        putCampaignSelectionFinalize(context, id) {
            return api.put('/api/adv/finalize_selection/' + id);
        },
        getCampaignSelectionResult(context, id) {
            return api.get('/api/adv/campaign_selected/' + id);
        },
        getInfluencerInfo(context, params: { id: string, account: string }) {
            return axios.create({
                baseURL: API_HOST,
            }).get(`/api/adv/influencer_page/${params.id}/${params.account}`)
                .then(response => {
                    context.commit('updateInfluencerList', response.data);

                    return response;
                });
        },
        getCampaignStatuses(context) {
            return api.get('/api/adv/campaign_statuses/');
        },
        getOfferStatuses(context) {
            return api.get('/api/adv/offer_statuses/');
        },
        getTransactionStatuses(context) {
            return api.get('/api/billing/transaction_statuses/');
        },
        getTopicsList(context, topic) {
            return api.get(`/api/adv/topics/${topic}`);
        },
        getGeoList(context, geo) {
            return api.get(`/api/common/geo/${geo}`);
        },
        getUsersAccount(context) {
            return api.get('/api/users/account')
                .then(response => {
                    context.commit('updateAccountsList', response.data[0]);

                    return response;
                });
        },
        getCampaignList(context, params: { id: string, query: string }) {
            return api.get(`/api/adv/campaigns_list/${params.id}?${params.query}`)
                .then(response => {
                    context.commit('updateCampaignList', response.data);

                    return response.data;
                })
        },
        getUsersProfilePage(context, accountId) {
            return api.get('/api/users/profilepage/' + accountId)
                .then(response => {
                    context.commit('updateUser', response.data);
                    return response;
                })
        },
        getTransactionsList(context, params: { id: string, query: string }) {
            return api.get(`/api/billing/transaction/${params.id}?${params.query}`)
                .then(response => {
                    context.commit('updateTransactionsList', response.data.transections);

                    return response.data;
                })
        },
        getCampaignInfo(context, campaignId) {
            return api.get('/api/adv/get_campaign/' + campaignId)
                .then((response) => {
                    context.commit('updateCampaignData', response.data);

                    return response.data;
                });
        },
        getCampaignDescription(context, campaignId) {
            return api.get('/api/adv/campaign_description/' + campaignId)
                .then(response => {
                    context.commit('updateCampaignDescription', response.data);

                    return response.data;
                });
        },
        getCampaignInfluencers(context, params: { id: string, query: string }) {
            return api.get(`/api/adv/campaign_influencers/${params.id}?${params.query}`)
                .then(response => {
                    context.commit('updateCampaignInfluencers', response.data);

                    return response.data;
                });
        },
        getCampaignResults(context, params: { id: string, query: string }) {
            return api.get(`/api/adv/campaign_results/${params.id}?${params.query}`)
                .then(response => {
                    context.commit('updateCampaignResults', response.data);

                    return response.data;
                });
        },
        getCampaignBarter(context, params: { id: string, query: string }) {
            return api.get(`/api/adv/campaign_barter/${params.id}?${params.query}`)
                .then(response => {
                    context.commit('updateCampaignBarter', response.data);

                    return response.data;
                });
        },
        getInfluencerData(context, id) {
            return api.get('/api/adv/get_influencer_data/' + id);
        },
        getAccountData(context, id) {
            return api.get('/api/users/account_data/' + id);
        },
        getCardList(context, id) {
            return api.get(`/api/billing/card/${id}`);
        },
        postClientLogin(context, data) {
            return new Promise((resolve, reject) => {
                axios.create({
                    baseURL: API_HOST,
                }).post('/api/users/login_client/', data).then(response => {
                    const {token, user} = response.data;

                    localStorage.setItem('accessToken', token.access);
                    localStorage.setItem('refreshToken', token.refresh);
                    localStorage.setItem('userId', user);

                    context.commit('updateAuthToken', token.access);
                    context.commit('updateRefreshToken', token.refresh);
                    context.commit('updateUserId', user);

                    resolve(response);
                }).catch(err => reject(err))
            })
        },
        postClientRefresh(context) {
            return new Promise((resolve, reject) => {
                let data = { "refresh": context.getters.getRefreshToken }
                axios.create({
                    baseURL: API_HOST,
                }).post('/api/users/login_refresh/', data).then(response => {
                    const token = response.data;

                    localStorage.setItem('accessToken', token.access);

                    context.commit('updateAuthToken', token.access);

                    resolve(response);
                }).catch(err => reject(err))
            })
        },
        fetchClientLogin(context) {
            let accessToken = localStorage.getItem('accessToken');
            let refreshToken = localStorage.getItem('refreshToken');
            let userId = localStorage.getItem('userId');
            context.commit('updateAuthToken', accessToken);
            context.commit('updateRefreshToken', refreshToken);
            context.commit('updateUserId', userId);
        },
        postClientRegister(context, data) {
            return new Promise((resolve, reject) => {
                axios.create({
                    baseURL: API_HOST,
                }).post('/api/users/register_client/', data).then(response => {
                    resolve(response);
                }).catch(err => reject(err))
            })
        },

        logoutClient(context, data) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userId');

            context.commit('updateAuthToken', null);
            context.commit('updateUserId', null);
        },
        postCampaignCreate(context, params) {
            return api.post('/api/adv/create_campaign/', params);
        },
        postInfluencerCampaignCreate(context, params) {
            return api.post('/api/adv/create_campaign_single_influencer/', params);
        },
        postCard(context, request: { id: string, params: { [key: string]: any } }) {
            // 5404 3638 4384 9889
            return api.post(`/api/billing/card/${request.id}`, request.params);
        },
        postUsersAccount(context, params) {
            return api.post('/api/users/account/', params);
        },
        postCampaignFiles(context, params) {
            return api.postFormData('/api/adv/campaign_files/', params);
        },
        putCampaignDuplicate(context, campaignId) {
            return api.put('/api/adv/duplicate_campaign/' + campaignId)
        },
        putCampaignData(context, params) {
            const campaignId = params.campaignId;
            delete params.campaignId;

            return api.put('/api/adv/campaign/' + campaignId, params)
        },
        putCampaignDelete(context, campaignId) {
            return api.put('/api/adv/delete/campaign/' + campaignId);
        },
        putCampaignPayment(context, id) {
            return api.put('/api/adv/start/campaign/' + id);
        },
        putPasswordReset(context, params) {
            return axios.create({
                baseURL: API_HOST,
            }).put('/api/users/password_reset/link/', params);
        },
        putOfferSentdate(context, params) {
            return api.put('/api/adv/campaign/assign/offer/sentdate/', params);
        },
        putUsersMember(context, data) {
            return api.put('/api/users/member/', data);
        },
        putUsersAccount(context, data) {
            return api.put('/api/users/account/', data);
        },
        putProfileUpdate(context, data) {
            return api.put('/api/users/update_profile/', data);
        },
        putPasswordUpdate(context, data) {
            return api.put('/api/users/update_password/', data);
        },
        deleteUser(context, query: string) {
            return api.delete(`/api/users/account/${query}`);
        },
        deleteUsersMember(context, query: string) {
            return api.delete(`/api/users/member/${query}`);
        },
    },
    modules: {}
})
