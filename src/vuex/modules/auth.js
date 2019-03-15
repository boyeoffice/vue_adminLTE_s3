import Storage from '@/storage'

const state = {
    authentication: !!Storage.getToken()
}

const mutations = {
    RECIEVE_AUTH(state, payload){
        state.authentication = payload
    }
}

export default {
    state,
    mutations
}