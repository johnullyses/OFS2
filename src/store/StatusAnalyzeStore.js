export default {
    namespaced: true,
    state: {
        statusAnalyzeData: [],
        loading: false
    },
    getters: {
        GET_STATUS_ANALYZE (state) {
            return state.statusAnalyzeData
        },
        GET_LOADING (state) {
            return state.loading
        }
    },
    mutations: {
        SET_STATUS_ANALYZE (state, statusAnalyzeData) {
            state.statusAnalyzeData = statusAnalyzeData
        },
        SET_LOADING (state, loading) {
            state.loading = loading;
        }
    },
    actions: {
        async getStatusAnalyze(context, payload) {
            context.commit("SET_LOADING", true)
            await this.$axios.post('/api/store/'+context.rootState.Auth.store_id+'/status-analyze', {
                startDate: payload.startDate,
                endDate: payload.endDate,
            })
            .then(response => {
                context.commit('SET_STATUS_ANALYZE', response.data)
            })
            .catch(error => {
                console.log(error)
            })
            context.commit("SET_LOADING", false)
        }
    }
}