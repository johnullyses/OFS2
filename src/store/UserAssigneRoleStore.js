export default {
    namespaced: true,
    state: {
        users: [],
        roles: [],
        loading: false,
    },
    getters: {
        GET_USERS (state) {
            return state.users
        },
        GET_ROLES (state) {
            return state.roles
        },
        GET_LOADING (state) {
            return state.loading
        }
    },
    mutations: {
        SET_USERS (state, users) {
            state.users = users
        },
        SET_ROLES (state, roles) {
            state.roles = roles
        },
        SET_LOADING (state, loading) {
            state.loading = loading;
        }
    },
    actions: {
        async getUsers (context) {
            context.commit("SET_LOADING", true)
            await this.$axios.get('/api/users')
                .then(response => {
                    context.commit('SET_USERS', response.data.data)
                })
            context.commit("SET_LOADING", false)
        },
        async userRoles (context, role_id) {
            await this.$axios.get('/api/user-roles')
                .then(response => {
                    context.commit('SET_ROLES', response.data)
                })
        },
        async updateUserRole (context, payload) {
            await this.$axios.post('/api/user-role/update', {
                payload
            }).then(response => {
                // console.log(response.data)
            }).catch(error => {
                console.log(error)
            })
        }

    }
}