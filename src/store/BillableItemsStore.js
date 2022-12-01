export default {
    namespaced: true,
    state: {
        billable: [],
        sources: [],
        loading: false
    },
    getters: {
        GET_BILLABLE_ITEMS (state) {
            return state.billable
        },
        GET_SOURCES (state) {
            return state.sources
        },
        GET_LOADING (state) {
            return state.loading
        }
    },
    mutations: {
        SET_BILLABLE_ITEMS (state, billable) {
            state.billable = billable;
        },
        SET_SOURCES (state, sources) {
            sources.sources.splice(0, 0, {source_name: "All"});
            sources.payment.splice(0, 0, {payment_type: "All"});
            sources.method.splice(0, 0, {name: "All"});
            state.sources = sources;
        },
        SET_LOADING (state, loading) {
            state.loading = loading;
        }
    },
    actions: {
        async billableSales(context, payload) {
            context.commit("SET_LOADING", true)
            await this.$axios.post('/api/store/'+context.rootState.Auth.store_id+'/billable', {
                startDate: payload.startDate,
                endDate: payload.endDate,
                source: payload.source,
                method: payload.method,
                payment: payload.payment,
            })
            .then(response => {
                context.commit("SET_BILLABLE_ITEMS", response.data)
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