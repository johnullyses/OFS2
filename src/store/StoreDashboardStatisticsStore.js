export default {
    namespaced: true,
    state: {
        statistics: [],
        loading: false
    },
    getters: {
        GET_STORE_DASHBOARD (state) {
            return state.statistics
        },
        GET_LOADING (state) {
            return state.loading
        }
    },
    mutations: {
        SET_STORE_DASHBOARD (state, statistics) {
            state.statistics = statistics;
        },
        SET_LOADING (state, loading) {
            state.loading = loading;
        }
    },
    actions: {
        async storeDashboard (context, payload) {
            context.commit("SET_LOADING", true)
            await this.$axios.get('/api/store/' + context.rootState.Auth.store_id + '/dashboard')
                .then(response => {
                    context.commit("SET_STORE_DASHBOARD", response.data)
                }).catch(error => {
                    console.log(error)
                })
            context.commit("SET_LOADING", false)
        }
    }
}