/* eslint-disable no-prototype-builtins */
export default {
    namespaced: true,
    state: {
        notifications: []
    },
    getters: {
        GET_NOTIFICATIONS(state) {
            return state.notifications
        }
    },
    mutations: {
      SET_NOTIFICATIONS(state, notifications) {
        state.notifications = notifications
      }
    },
    actions: {
      async getNotifications (context) {
        await this.$axios.get('/api/notifications')
            .then(response => {
                context.commit("SET_NOTIFICATIONS", response.data.data)
            })
            .catch(error => {
                console.log(error.response)
            })
      },
      async readNotification (context, payload) {
        await this.$axios.post('/api/notifications/read', {
            id: payload
        })
            .then(response => {
                // console.log(response)
            })
            .catch(error => {
                console.log(error.response)
            })
      }
    }
  }
  