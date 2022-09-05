import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify)

const opts = {
    theme: {
        disable: true,
    },
}

export default new Vuetify({
    opts,
    icons: {
        iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    },
})
