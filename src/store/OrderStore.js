/* eslint-disable no-prototype-builtins */
export default {
    namespaced: true,
    state: {
        orders: [],
        ordersLoading: false,
        order: {},
        orderLoading: false,
        carriers: [],
        threshold: {},
        orderStatusLoading: false
    },
    getters: {
        GET_ORDERS (state) {
            return state.orders
        },
        GET_ORDERS_LOADING (state) {
            return state.ordersLoading
        },
        GET_ORDER (state) {
            return state.order
        },
        GET_ORDER_LOADING (state) {
            return state.orderLoading
        },
        GET_CARRIERS (state) {
            return state.carriers
        },
        GET_THRESHOLD (state) {
            return state.threshold
        },
        GET_ORDER_STATUS_LOADING (state) {
            return state.orderStatusLoading
        }
    },
    mutations: {
        SET_ORDERS (state, orders) {
            state.orders = orders
        },
        SET_ORDER (state, order) {
            state.order = order
        },
        SET_ORDERS_LOADING (state, flag) {
            state.ordersLoading = flag
        },
        SET_ORDER_LOADING (state, flag) {
            state.orderLoading = flag
        },
        SET_CARRIERS (state, carriers) {
            state.carriers = carriers
        },
        SET_THRESHOLD (state, threshold) {
            state.threshold = threshold
        },
        SET_ORDER_STATUS_LOADING (state, orderStatusLoading) {
            state.orderStatusLoading = orderStatusLoading
        }
    },
    actions: {
      async orderMonitoring (context) {
        context.commit("SET_ORDERS_LOADING", true)
        await this.$axios.get('/api/store/'+context.rootState.Auth.store_id+'/order/monitoring')
            .then(response => {
                // console.log(response)
                context.commit("SET_ORDERS", response.data.data)
            })
            .catch(error => {
                console.log(error.response)
            })
        context.state.orders.forEach(async order => {
            if (order.received_at == null) {
                await context.dispatch('updateOrderReceiveDatetime', { id: order.id })
            }

            if (order.advance_ready == "YES") {
                await context.dispatch('advanceOrderNotification', { id: order.id })
            }
        })
        context.commit("SET_ORDERS_LOADING", false)
      },
      async orderDetails (context, payload) {
        context.commit("SET_ORDER_LOADING", payload.loading)
        await this.$axios.get('/api/store/'+context.rootState.Auth.store_id+'/order/' + payload.id + '/details')
            .then(response => {
                // console.log(response)
                context.commit("SET_ORDER", response.data.data)
            })
            .catch(error => {
                console.log(error.response)
            })
        context.commit("SET_ORDER_LOADING", false)
      },
      async deliveryCarriers (context, payload) {
        await this.$axios.get('/api/delivery/carriers')
            .then(response => {
                console.log(response)
                context.commit("SET_CARRIERS", response.data.data)
            })
            .catch(error => {
                console.log(error)
            })
      }, 
      async orderThreshold (context, payload) {
        await this.$axios.post('/api/store/'+context.rootState.Auth.store_id+'/order/order-threshold', {
            next_status: payload.next_status,
            acknowledged_datetime: payload.acknowledged_datetime,
            rider_out_datetime: payload.rider_out_datetime,
            proximity: payload.proximity
        })
        .then(response => {
            console.log(response)
            context.commit("SET_THRESHOLD", response.data)
        })
        .catch(error => {
            console.log(error)
        })
      },
      async acknowledge (context, payload) {
        context.commit("SET_ORDER_STATUS_LOADING", true)
        await this.$axios.post('/api/store/'+context.rootState.Auth.store_id+'/order/' + payload.id + '/acknowledge', {
            acknowledged_by: payload.acknowledged_by
        })
        .then(response => {
            console.log(response)
            context.commit("SET_ORDER", response.data.data)
        })
        .catch(error => {
            console.log(error)
        })
        context.commit("SET_ORDER_STATUS_LOADING", false)
      }, 
      async riderAssign (context, payload) {
        context.commit("SET_ORDER_STATUS_LOADING", true)
        await this.$axios.post('/api/store/'+context.rootState.Auth.store_id+'/order/' + payload.id + '/rider-assign', {
            rider_name: payload.rider_name
        })
        .then(response => {
            console.log(response)
            context.commit("SET_ORDER", response.data.data)
        })
        .catch(error => {
            console.log(error)
        })
        context.commit("SET_ORDER_STATUS_LOADING", false)
      },
      async riderOut (context, payload) {
        context.commit("SET_ORDER_STATUS_LOADING", true)
        await this.$axios.post('/api/store/'+context.rootState.Auth.store_id+'/order/' + payload.id + '/rider-out', {})
        .then(response => {
            console.log(response)
            context.commit("SET_ORDER", response.data.data)
        })
        .catch(error => {
            console.log(error)
        })
        context.commit("SET_ORDER_STATUS_LOADING", false)
      },
      async riderBack (context, payload) {
        context.commit("SET_ORDER_STATUS_LOADING", true)
        await this.$axios.post('/api/store/'+context.rootState.Auth.store_id+'/order/' + payload.id + '/rider-back', {})
        .then(response => {
            console.log(response)
            context.commit("SET_ORDER", response.data.data)
        })
        .catch(error => {
            console.log(error)
        })
        context.commit("SET_ORDER_STATUS_LOADING", false)
      },
      async updateOrderReceiveDatetime (context, payload) {
        await this.$axios.post('/api/store/'+context.rootState.Auth.store_id+'/order/' + payload.id + '/received-order', {})
        .then(response => {
            console.log(response)
            // context.commit("SET_ORDER", response.data.data)
        })
        .catch(error => {
            console.log(error)
        })
      },
      async advanceOrderNotification (context, payload) {
        await this.$axios.post('/api/store/'+context.rootState.Auth.store_id+'/order/' + payload.id + '/advance-order-notif', {})
        .then(response => {
            // console.log(response)
            // context.commit("SET_ORDER", response.data.data)
        })
        .catch(error => {
            console.log(error)
        })
      },
      async orderClose(context, payload) {
        context.commit("SET_ORDER_STATUS_LOADING", true)
        await this.$axios.post('/api/store/'+context.rootState.Auth.store_id+'/order/' + payload.id + '/order-close', {
          user_id: 1,
          username: "Juan",
          received_datetime: payload.received_datetime,
        })
        .then(response => {
            console.log(response)
            context.commit("SET_ORDER", {})
        })
        .catch(error => {
            console.log(error)
        })
        context.commit("SET_ORDER_STATUS_LOADING", false)
      }
    }
  }
  