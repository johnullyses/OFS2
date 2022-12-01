import { extendWith } from "lodash"

/* eslint-disable no-prototype-builtins */
export default {
    namespaced: true,
    state: {
        storeProducts:"",
        loading: false
    },
    getters: {
        GET_STORE_ITEMS (state) {
            return state.storeProducts
        },
        GET_LOADING(state) {
            return state.loading;
        }
    },
    mutations: {
        SET_STORE_ITEMS (state, storeProducts) {
            state.storeProducts = storeProducts
        },
        SET_LOADING(state, loading) {
            state.loading = loading;
        }
    },
    actions:{
      async getStoreItems(context, payload) {
        context.commit('SET_LOADING', true)
        await this.$axios.get('/api/store/items/'+payload.store_id)
            .then(response => {
                console.log(response.data);
                context.commit("SET_STORE_ITEMS", response.data)
            })
            .catch(error => {
                console.log(error.response)
            })
        context.commit('SET_LOADING', false)
      },
      async getStoreItemsWithStatus(context, payload) {
        context.commit('SET_LOADING', true)
        await this.$axios.get('/api/store/items/'+payload.store_id+'/'+payload.status)
            .then(response => {
                console.log(response.data);
                context.commit("SET_STORE_ITEMS", response.data)
            })
            .catch(error => {
                console.log(error.response)
            })
        context.commit('SET_LOADING', false)
      },
      async updateProductStatus(context, payload) {
        context.commit('SET_LOADING', true)
        await this.$axios.get('/api/store/items/'+payload.store_id+'/'+payload.productID+'/'+payload.status)
            .then(response => {
                console.log(response.data);
                context.commit("SET_STORE_ITEMS", response.data)
            })
            .catch(error => {
                console.log(error.response)
            })
        context.commit('SET_LOADING', false)
      },
    }
  }
  