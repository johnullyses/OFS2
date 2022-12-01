import { extendWith } from "lodash"

/* eslint-disable no-prototype-builtins */
export default {
    namespaced: true,
    state: {
        deliveryReport:"",
        loading: false,
    },
    getters: {
        GET_DELIVERY_REPORT (state) {
            return state.deliveryReport
        },
        GET_LOADING(state) {
            return state.loading;
        }
    },
    mutations: {
        SET_DELIVERY_REPORT (state, deliveryReport) {
            state.deliveryReport = deliveryReport
        },
        SET_LOADING(state, loading) {
            state.loading = loading;
        }
    },
    actions:{
      async getDeliveryPerformance(context, payload) {
        context.commit('SET_LOADING', true)
        await this.$axios.get('/api/delivery/'+payload.store_id)
            .then(response => {
                console.log(response);
                context.commit("SET_DELIVERY_REPORT", response.data)
            })
            .catch(error => {
                console.log(error.response)
            })
        context.commit('SET_LOADING', false)
      },
      async getSearchResult(context, payload) {
        context.commit('SET_LOADING', true)
            await this.$axios.get('/api/delivery/'+payload.store_id+'/'+payload.startDate+'/'+payload.endDate+'/'+payload.prTime)
            .then(response => {
                console.log(response);
                context.commit("SET_DELIVERY_REPORT", response.data)
            })
            .catch(error => {
                console.log(error.response)
            })
        context.commit('SET_LOADING', false)
      },
    }
  }
  