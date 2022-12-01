/* eslint-disable no-prototype-builtins */
import { LocalStorage } from 'quasar'

export default {
    namespaced: true,
    state: {
      store_name: '',
      store_id: null,
      role_id: null,
      role_name: '',
      name: '',
      email: ''
    },
    getters: {
      GET_PROFILE(state) {
        return {
          store_id: state.store_id,
          store_name: state.store_name,
          role_id: state.role_id,
          role_name: state.role_name,
          name: state.name,
          email: state.email
        }
      }
    },
    mutations: {
     SET_ACCESS_TOKEN(state, token) {
      LocalStorage.set('access_token', token)
      },
      SET_STORE (state, store) {
        state.store_id = store.store_id
        state.store_name = store.store_name
      },
     SET_PROFILE(state, data) {
      state.store_name = data.store.store_name
      state.store_id   = data.store.id
      state.role_id    = data.role_id
      state.role_name  = data.role.name
      state.name       = data.name
      state.email      = data.email
     },
     RESET(state) {
      state = {
        store_name: '',
        store_id: null,
        role_id: null,
        role_name: '',
        name: '',
        email: ''
      }
     }
    },
    actions: {
      async login (context, payload) {
        var response = await this.$axios.post('/api/login', {
            username: payload.username,
            password: payload.password
        })
        .then(response => {
          if (response.data.access_token) {
            context.commit("SET_ACCESS_TOKEN", response.data.access_token)
            this.$router.go()
            return true;
          } else {
            return false
          }
         
        })
        .catch(error => {
          console.log(error.response)
           return false
        })

        return response
      },
      async logout (context, payload) {
        context.commit("RESET")
        var response = await this.$axios.post('/api/logout',)
        .then(response => {
          LocalStorage.remove('access_token')
          this.$router.go()
          return true;
        })
        .catch(error => {
           return false
        })

        return response
      },
      async getProfile (context) {
        if (LocalStorage.has('access_token')) {
          this.$axios.defaults.headers.common.Authorization = `Bearer ` + LocalStorage.getItem('access_token')
          await this.$axios.get('/api/user')
              .then(response => {
                context.commit("SET_PROFILE", response.data)
                console.log(response)
              })
              .catch(error => {
                console.log(error.response)
              })
          this.$router.push('/')
        } else {
          this.$router.push('/login')
        }
      },
    }
  }
  