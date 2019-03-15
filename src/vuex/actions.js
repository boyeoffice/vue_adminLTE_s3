import _ from 'lodash'
import Storage from '@/storage'

export const storeProfile = ({ commit }, user) => {
	commit('RECIEVE_PROFILE', user)
}

export const register = ({ commit }, payload) => {
	return new Promise((resolve, reject) => {
		axios.post('/api/v2/register', payload).then(response => {
			resolve(response)
		}).catch(error => {
			reject(error)
		})
	})
}

export const login = ({ commit }, payload) => {
	return new Promise((resolve, reject) => {
		axios.post('/api/v1/token', payload).then(response => {
			Storage.set(response.data.access_token,
				response.data.expires_in)
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + Storage.getToken()
			commit('RECIEVE_AUTH', true)
			resolve(response)
		}).catch(error => {
			reject(error)
		})
	})
}


export const getProfile = ({commit}, payload) => {
	return new Promise((resolve, reject) => {
		axios.get('/api/user').then(response => {
			commit('RECIEVE_PROFILE', response.data)
			resolve(response)
		}).catch(error => {
			reject(error)
		})
	})
}

export const createProduct = ({commit}, payload) => {
	return new Promise((resolve, reject) => {
		axios.post('/api/v2/products', payload).then(response => {
			resolve(response)
		}).catch(error => {
			reject(error)
		})
	})
}

export const Products = ({commit}, payload) => {
	return new Promise((resolve, reject) => {
		axios.get('/api/v2/products').then(response => {
			commit('RECIEVE_PRODUCTS', response.data)
			resolve(response)
		}).catch(error => {
			reject(error)
		})
	})
}

export const updateProduct = ({commit}, payload) => {
	return new Promise((resolve, reject) => {
		axios.patch('api/v2/product', payload).then(response => {
			resolve(response)
		}).catch(error => {
			reject(error)
		})
	})
}