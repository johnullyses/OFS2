export default {
    namespaced: true,
    state: {
        customerReceiveTimeData: '',
        loading: false
    },
    getters: {
        GET_CUSTOMER_RECEIVE_TIME(state) {
            return state.customerReceiveTimeData;
        },
        GET_LOADING(state) {
            return state.loading;
        }
    },
    mutations: {
        SET_CUSTOMER_RECEIVE_TIME(state, crt) {
            state.customerReceiveTimeData = crt;
        },
        SET_LOADING(state, loading) {
            state.loading = loading;
        }
    },
    actions: {
        async customerReceiveTime(context, payload) {
            context.commit('SET_LOADING', true)
            await this.$axios.post('/api/store/'+context.rootState.Auth.store_id+'/customer-receive-time', {
                startDate: payload.startDate,
                endDate: payload.endDate,
                hourFrom: payload.hourFrom,
                hourTo: payload.hourTo,
                promisedTime: payload.promisedTime,
            })
            .then(response => {
                context.commit('SET_CUSTOMER_RECEIVE_TIME', response.data);
            }).catch(error => {
                console.error(error)
            })
            context.commit('SET_LOADING', false)
        }
    }
}