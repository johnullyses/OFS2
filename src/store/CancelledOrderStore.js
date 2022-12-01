export default {
    namespaced: true,
    state: {
        cancelledOrders: [],
        sources: [],
        loading: false,
    },
    getters: {
        GET_ORDER_CANCELLED (state) {
            return state.cancelledOrders
        },
        GET_SOURCES (state) {
            return state.sources
        },
        GET_LOADING (state) {
            return state.loading
        }
    },
    mutations: {
        SET_ORDER_CANCELLED (state, cancelledOrders) {
            state.cancelledOrders = cancelledOrders;
        },
        SET_SOURCES (state, sources) {
            state.sources = sources;
        },
        SET_LOADING (state, loading) {
            state.loading = loading;
        }
    },
    actions: {
        async cancelledOrder(context, payload) {
            context.commit("SET_LOADING", true)
            await this.$axios.post('/api/store/'+context.rootState.Auth.store_id+'/order/cancelled-order', {
                startDate: payload.startDate,
                endDate: payload.endDate,
                source: payload.source,
                method: payload.method,
                payment: payload.payment,
            })
            .then(response => {
                context.commit("SET_ORDER_CANCELLED", response.data.data)
            }).catch(error => {
                console.log(error)
            })
            context.commit("SET_LOADING", false)
        },
        async allSources(context) {
            await this.$axios.post('/api/store/'+context.rootState.Auth.store_id+'/sources')
            .then(response => {
                context.commit('SET_SOURCES', response.data)
            }).catch(error => {
                console.log(error)
            })
        }
    }
}