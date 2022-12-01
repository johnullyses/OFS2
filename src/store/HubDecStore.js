/* eslint-disable no-prototype-builtins */
export default {
  namespaced: true,
  state: {
    currentHubDec: {
      id: '',
      store_id: '',
      reason: '',
      authorized_by: '',
      promised_time: 0,
      created_date: '',
    },
    isVerifiedPin: false,
    hubDecLoading: false,
    holdSchedule: [],
    schedule: [],
    hubDecList: [],
    holidays: []

  },
  getters: {
    GET_CURRENT_HUB_DEC(state) {
        return state.currentHubDec
    },
    GET_STORE_VERFIED(state) {
        return state.isVerifiedPin
    },
    GET_HUB_DEC_LOADING(state) {
        return state.hubDecLoading
    },
    GET_HOLD_SCHEDULE(state) {
        return state.holdSchedule
    },
    GET_SCHEDULE(state) {
      return state.schedule
    },
    GET_HOLIDAYS(state) {
      return state.holidays
    },
    GET_HUB_DEC_LIST(state) {
      return state.hubDecList
    }
  },
  mutations: {
    SET_HUB_DEC: (state, currentHubDec) => {
      state.currentHubDec = currentHubDec
    },
    SET_HUB_DEC_LIST: (state, hubDecList) => {
      state.hubDecList = hubDecList
    },
    SET_STORE_VERFIED: (state, isVerifiedPin) => {
      state.isVerifiedPin = isVerifiedPin
    },
    SET_HUB_DEC_LOADING: (state, hubDecLoading) => {
        state.hubDecLoading = hubDecLoading
    },
    SET_HOLD_SCHEDULE: (state, holdSchedule) => {
        state.holdSchedule = holdSchedule
    },
    SET_SCHEDULE: (state, schedule) => {
      state.schedule = schedule
    },
    SET_HOLIDAYS: (state, holidays) => {
      state.holidays = holidays
    }
  },
  actions: {
    async getHoldSchedule(context, payload){
        try {
          const response = await this.$axios.get('/api/store/' + context.rootState.Auth.store_id + '/hub-declaration/hold-schedule')
          context.commit('SET_HOLD_SCHEDULE', response.data.data)
        }
        catch (error) {
          return Promise.reject(error)
        }
    },
    async validateStorePin(context, payload){
        context.commit('SET_STORE_VERFIED', false)
        context.commit('SET_HUB_DEC_LOADING', true)
        try {
          const response = await this.$axios.post('/api/store/' + context.rootState.Auth.store_id + '/hub-declaration/validate-store-pin',{
            store_pin: payload
          })
          context.commit('SET_STORE_VERFIED', response.data.validated)
        }
        catch (error) {
          return Promise.reject(error)
        }
        context.commit('SET_HUB_DEC_LOADING', false)
    },
    async getCurrentHubDec(context, payload){
      try {
        const response = await this.$axios.get('/api/store/' + context.rootState.Auth.store_id + '/hub-declaration/current')
        console.log(response)
        context.commit('SET_HUB_DEC', response.data)
      }
      catch (error) {
        return Promise.reject(error)
      }
    },
    async getHubDecList(context, payload){
      try {
        const response = await this.$axios.get('/api/store/' + context.rootState.Auth.store_id + '/hub-dec-list')
        console.log(response)
        context.commit('SET_HUB_DEC_LIST', response.data)
      }
      catch (error) {
        console.log(error.response)
        return Promise.reject(error)
      }
    },
    async setHubDec(context, payload){
      try {
        const response = await this.$axios.post('/api/store/' + context.rootState.Auth.store_id + '/hub-declaration/create',{
          reason: payload.reason,
          promised_time: payload.promised_time,
          authorized_by: payload.authorized_by
        })
        console.log(response)
       context.commit('SET_HUB_DEC', response.data)
      }
      catch (error) {
        console.log(error.response)
        return Promise.reject(error)
      }
    },
    async getStoreOperatingHours(context){
      try {
        const response = await this.$axios.get('/api/store/' + context.rootState.Auth.store_id + '/hub-declaration/store-operating-hours')
        console.log(response)
        context.commit('SET_SCHEDULE', response.data.schedule)
        context.commit('SET_HOLIDAYS', response.data.holidays)
      }
      catch (error) {
        console.log(error.response)
        return Promise.reject(error)
      }
    },
    async setStoreOperatingHours(context, payload){
      try {
        context.commit('SET_HUB_DEC_LOADING', true)
        const response = await this.$axios.post('/api/store/' + context.rootState.Auth.store_id + '/hub-declaration/store-operating-hours', payload)
        console.log(response)
        context.commit('SET_HUB_DEC_LOADING', false)
        return true
      }
      catch (error) {
        console.log(error.response)
        return false
      }
    },
    async createHoliday(context, payload) {
      try {
        context.commit('SET_HUB_DEC_LOADING', true)
        const response = await this.$axios.post('/api/store/' + context.rootState.Auth.store_id + '/hub-declaration/create-holiday', payload)
        console.log(response)
        context.commit('SET_HUB_DEC_LOADING', false)
        return true
      }
      catch (error) {
        console.log(error.response)
        return false
      }
    },
    async updateHoliday(context, payload) {
      try {
        context.commit('SET_HUB_DEC_LOADING', true)
        const response = await this.$axios.post('/api/store/' + context.rootState.Auth.store_id + '/hub-declaration/update-holiday', payload)
        console.log(response)
        context.commit('SET_HUB_DEC_LOADING', false)
        return true
      }
      catch (error) {
        console.log(error.response)
        return false
      }
    },
    async deleteHoliday(context, payload) {
      try {
        context.commit('SET_HUB_DEC_LOADING', true)
        const response = await this.$axios.post('/api/store/' + context.rootState.Auth.store_id + '/hub-declaration/delete-holiday', payload)
        console.log(response)
        context.commit('SET_HUB_DEC_LOADING', false)
        return true
      }
      catch (error) {
        console.log(error.response)
        return false
      }
    }
  }
}
