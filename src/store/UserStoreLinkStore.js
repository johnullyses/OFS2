export default {
    namespaced: true,
    state: {
        users: [],
        usersloading: false,
        stores: [],
        storesloading: false,
    },
    getters: {
        GET_USER_LIST (state) {
            return state.users
        },
        GET_USER_LIST_LOADING (state) {
            return state.usersloading
        },
        GET_STORE_LIST (state) {
            return state.stores
        },
        GET_STORE_LIST_LOADING (state) {
            return state.storesloading
        },
    },
    mutations: {
        SET_USER_LIST (state, users) {
            state.users = users;
        },
        SET_USER_LIST_LOADING (state, usersloading) {
            state.usersloading = usersloading;
        },
        SET_STORE_LIST (state, stores) {
            state.stores = stores;
        },
        SET_STORE_LIST_LOADING (state, storesloading) {
            state.storesloading = storesloading;
        },
    },
    actions: {
        async storeList (context, payload) {
            context.commit("SET_STORE_LIST_LOADING", true)
            await this.$axios.get('/api/store/manage')
                .then(response => {
                    context.commit("SET_STORE_LIST", response.data.data)
                }).catch(error => {
                    console.log(error)
                })
            context.commit("SET_STORE_LIST_LOADING", false)
        },
        async userList (context, payload) {
            context.commit("SET_USER_LIST_LOADING", true)
            await this.$axios.get('/api/users')
                .then(response => {
                    context.commit("SET_USER_LIST", response.data.data)
                }).catch(error => {
                    console.log(error)
                })
            context.commit("SET_USER_LIST_LOADING", false)
        },
        async assignUserToStore (context, payload) {
            try {
                var result = payload.user.map(function (x) {
                    return x.id;
                });
                const response = await this.$axios.post('/api/store/' + payload.store.store_id + '/user-store-link',
                    {
                        "user": result
                    })
                console.log(response)
                return true
            }
            catch (error) {
                console.log(error.response)
                return false
            }
        }
    }
}