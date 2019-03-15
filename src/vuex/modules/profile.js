const state = {
	userDetails: {}
}

const mutations = {
	RECIEVE_PROFILE(state, payload){
		state.userDetails = payload
	}
}

export default {
	state,
	mutations
}