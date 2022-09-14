import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import IndexView from '../views/advertiser/IndexView.vue'
import AdvertiserView from '../views/advertiser/AdvertiserView.vue'
import InfluencerView from '../views/influencer/InfluencerView.vue'
import InfluencerPublicView from '../views/influencer/InfluencerPublicView.vue'
import Campaigns from '../views/menulayout/Campaigns.vue'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'start',
        component: IndexView,
        meta: {
            title: 'Advy.ai',
            requiresAuth: false
        },
    },
    {
        path: '/campaigns',
        name: 'campaigns',
        component: Campaigns,
        meta: {
            title: 'Advy.ai - Campaigns',
            requiresAuth: true
        },
    },
    {
        path: '/a',
        name: 'advertiser_wrapper',
        component: AdvertiserView,
        children: [
            {
                path: 'cabinet',
                name: 'cabinet',
                component: () => import('../views/advertiser/CabinetView.vue'),
                meta: {
                    title: 'Advy.ai - Profile',
                    requiresAuth: true
                },
            },
            {
                path: 'campaign',
                name: 'manager',
                component: () => import('../views/advertiser/ManagerView.vue'),
                meta: {
                    title: 'Advy.ai - Campaign',
                    requiresAuth: true
                },
            },
            {
                path: 'campaign/init/:id',
                name: 'campaign_init',
                component: () => import('../views/advertiser/Campaign/CampaignInitView.vue'),
                meta: {
                    title: 'Advy.ai - Init Campaign',
                    requiresAuth: true
                },
            },
            {
                path: 'campaign/:id',
                name: 'campaign',
                redirect: to => {
                    // the function receives the target route as the argument
                    // we return a redirect path/location here.
                    return {path: 'campaign/:id/description'}
                },
            },
            // children: [
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: 'campaign/:id/description',
                name: 'companyDescription',
                component: () => import('../views/advertiser/Campaign/CampaignDescriptionView.vue'),
                meta: {
                    title: 'Advy.ai - Campaign Description',
                    requiresAuth: true
                },
            },
            {
                // UserPosts will be rendered inside User's <router-view>
                // when /user/:id/posts is matched
                path: 'campaign/:id/bloggers',
                name: 'companyBloggers',
                component: () => import('../views/advertiser/Campaign/CampaignBloggersView.vue'),
                meta: {
                    title: 'Advy.ai - Campaign Influencers',
                    requiresAuth: true
                },
            },
            {
                // UserPosts will be rendered inside User's <router-view>
                // when /user/:id/posts is matched
                path: 'campaign/:id/result',
                name: 'companyResult',
                component: () => import('@/views/advertiser/Campaign/CampaignResultView.vue'),
                meta: {
                    title: 'Advy.ai - Campaign Results',
                    requiresAuth: true
                },
            },
            {
                // UserPosts will be rendered inside User's <router-view>
                // when /user/:id/posts is matched
                path: 'campaign/:id/barter',
                name: 'companyBarter',
                component: () => import('../views/advertiser/Campaign/CampaignBarterView.vue'),
                meta: {
                    title: 'Advy.ai - Campaign Barter',
                    requiresAuth: true
                },
            },
            // ],
            // meta: {
            //     title: 'Advy.ai - Campaign',
            // },
            // },
            {
                path: 'story/:id',
                name: 'story',
                component: () => import('../views/advertiser/StoryView.vue'),
                meta: {
                    title: 'Advy.ai',
                    requiresAuth: true
                },
            },
            {
                path: ':pathMatch(.*)*',
                name: 'advertiser_catch',
                redirect: to => {
                    return {path: 'campaign'}
                },
            },
        ]
    },
    {
        path: '/i',
        name: 'influencer_wrapper',
        component: InfluencerView,
        children: [
            {
                path: 'login',
                name: 'tg_login',
                component: () => import('../views/influencer/LoginView.vue'),
                meta: {
                    title: 'Advy.ai - Login',
                    requiresAuth: false
                },
            },
            {
                path: 'register',
                name: 'tg_register',
                component: () => import('../views/influencer/RegisterView.vue'),
                meta: {
                    title: 'Advy.ai - Register',
                    requiresAuth: true
                },
            },
            {
                path: 'offers',
                name: 'offers',
                component: () => import('../views/influencer/OfferView.vue'),
                meta: {
                    title: 'Advy.ai - Offers',
                    requiresAuth: true
                },
            },
            {
                path: ':pathMatch(.*)*',
                name: 'influencer_catch',
                redirect: to => {
                    return {path: 'offers'}
                },
            },
        ]
    },
    {
        path: '/influencer/:id/:account',
        name: 'influencer',
        component: InfluencerPublicView,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/privacy',
        name: 'privacy',
        component: () => import('../views/PrivacyView.vue'),
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'any_catch',
        redirect: to => {
            return {path: '/'}
        },
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach(async (to, from, next) => {
    const authToken = localStorage.getItem('accessToken');

    if (to?.meta?.requiresAuth && !authToken) {
        if (to.path.indexOf('/i') == 0) {
            next({name: 'tg_login'});
        }
        else {
            if (from.name !== 'start') {
                next({name: 'start'});
            }
            else {
                next()
            }
        }
    } else {
        next()
    }
})

router.afterEach((to, from) => {
    Vue.nextTick(() => {
        if (to.meta && to.meta.title) {
            document.title = to.meta.title
        }
        else {
            document.title = "Advy.ai"
        }
    })
})

export default router
