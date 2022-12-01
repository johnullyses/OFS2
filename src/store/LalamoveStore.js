/* eslint-disable no-prototype-builtins */
export default {
    namespaced: true,
    state: {
        loading: false
    },
    getters: {
        GET_LOADING (state) {
            return state.loading
        },
    },
    mutations: {
        SET_LOADING (state, flag) {
            state.loading = flag
        },
    },
    actions: {
        async bookLalamove (context, payload) {
            context.commit("SET_LOADING", true)
            await this.$axios.post('/api/delivery/lalamove/book', {
                order_id: payload.order_id,
            })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error.response)
                })
            context.commit("SET_LOADING", false)
        },
        async cancelLalamoveBooking (context, payload) {
            context.commit("SET_LOADING", true)
            await this.$axios.post('/api/delivery/lalamove/cancel', {
                order_id: payload.order_id,
            })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error.response)
                })
            context.commit("SET_LOADING", false)
        }
    }
}
