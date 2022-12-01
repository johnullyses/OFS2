import { extendWith } from "lodash"

/* eslint-disable no-prototype-builtins */
export default {
    namespaced: true,
    state: {
        ChangeResult:false,
        loading: false
    },
    getters: {
        GET_LOADING(state) {
            return state.loading;
        },
        GET_CHANGE_RESULT(state) {
            return state.ChangeResult;
        },
    },
    mutations: {
        SET_LOADING(state, loading) {
            state.loading = loading;
        },
        SET_CHANGE_RESULT(state, ChangeResult) {
            state.ChangeResult = ChangeResult;
        }
    },
    actions:{
        async changePassword(context, payload) {
            context.commit('SET_LOADING', true)
            await this.$axios.post('/api/store/changePassword/'+context.rootState.Auth.store_id+'/change', {
                newPassword: payload.newPassword,
                currentPassword: payload.currentPassword,
            })
            .then(response => {
                console.log(response)
                context.commit('SET_CHANGE_RESULT', response);
            }).catch(error => {
                console.error(error)
            })
            context.commit('SET_LOADING', false)
        },
    }
  }
  