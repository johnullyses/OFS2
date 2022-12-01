export default {
    namespaced: true,
    state: {
        divertedOrders: [],
        loading: false
    },
    getters: {
        GET_DIVERTED_ORDERS (state) {
            return state.divertedOrders
        },
        GET_LOADING (state) {
            return state.loading
        }
    },
    mutations: {
        SET_DIVERTED_ORDERS (state, divertedOrders) {
            state.divertedOrders = divertedOrders;
        },
        SET_LOADING (state, loading) {
            state.loading = loading;
        }
    },
    actions: {
        async getDivertedOrders(context, payload) {
            context.commit("SET_LOADING", true)
            await this.$axios.post('/api/diverted-orders/'+context.rootState.Auth.store_id, payload)
            .then(response => {
                console.log(response)
                context.commit("SET_DIVERTED_ORDERS", response.data)
            }).catch(error => {
                console.log(error.response)
            })
            context.commit("SET_LOADING", false)
        },
    }
}