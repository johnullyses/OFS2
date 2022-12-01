import { extendWith } from "lodash"

/* eslint-disable no-prototype-builtins */
export default {
    namespaced: true,
    state: {
        productMixReport:"",
        productlist:"",
        sourceslist:"",
        loading:false
    },
    getters: {
        GET_PRODUCT_MIX (state) {
            return state.productMixReport
        },
        GET_PRODUCT_LIST (state) {
            return state.productlist
        },
        GET_SOURCES_LIST (state) {
            return state.sourceslist
        },
        GET_LOADING (state) {
            return state.loading
        }
        

    },
    mutations: {
        SET_PRODUCT_MIX (state, productMixReport) {
            state.productMixReport = productMixReport
        },
        SET_PRODUCT_LIST (state, productlist) {
            state.productlist = productlist
        },
        SET_SOURCES_LIST (state, sourceslist) {
            state.sourceslist = sourceslist
        },
        SET_LOADING (state, loading) {
            state.loading = loading;
        }

    },
    actions:{
      async getProductMix(context, payload) {
        context.commit("SET_LOADING", true)
        await this.$axios.get('/api/store/product-mix/'+payload.store_id)
            .then(response => {
                console.log(response);
                context.commit("SET_PRODUCT_MIX", response.data)
            })
            .catch(error => {
                console.log(error.response)
            })
        context.commit("SET_LOADING", false)
      },
      async getProductsList(context, payload) {
        context.commit("SET_LOADING", true)
        await this.$axios.get('/api/store/product-mix/list-products/'+payload.store_id)
            .then(response => {
                console.log(response);
                context.commit("SET_PRODUCT_LIST", response.data)
            })
            .catch(error => {
                console.log(error.response)
            })
        context.commit("SET_LOADING", false)
      },
      async getSearchResult(context, payload) {
        context.commit("SET_LOADING", true)
            await this.$axios.get('/api/store/product-mix/filter/'+payload.store_id+'/'+payload.startDate+'/'+payload.endDate+'/'+payload.source+'/'+payload.product)
            .then(response => {
                console.log(response);
                context.commit("SET_PRODUCT_MIX", response.data)
            })
            .catch(error => {
                console.log(error.response)
            })
        context.commit("SET_LOADING", false)
      },
      async getSourcesList(context,payload) {
        context.commit("SET_LOADING", true)
        await this.$axios.get('/api/store/product-mix/list-sources/'+payload.store_id)
        .then(response => {
            console.log(response);
            context.commit("SET_SOURCES_LIST", response.data)
        })
        .catch(error => {
            console.log(error.response)
        })
        context.commit("SET_LOADING", false)
  },
    }
  }
  