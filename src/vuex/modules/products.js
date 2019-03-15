const state = {
    model: {
        data: {}
    }
}

const mutations = {
    RECIEVE_PRODUCTS(state, payload){
        state.model = payload
    },
    REMOVE_PRODUCT(state, payload){
        state.model.data.splice(payload, 1)
    }
}

export default {
    state,
    mutations
}