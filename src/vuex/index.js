import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from '@/vuex/actions'
import * as getters from '@/vuex/getters'
import profile from '@/vuex/modules/profile'
import auth from '@/vuex/modules/auth'
import products from '@/vuex/modules/products'

Vue.use(Vuex)

export const store = new Vuex.Store({
    actions,
    getters,
    modules: {
        profile,
        auth,
        products

    },
    strict: true
})