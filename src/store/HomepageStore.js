export default {
    namespaced: true,
    state: {
        homepage: [],
        category: [],
        homepage_contents: [],
        loading: false,
        url: ''
    },
    getters: {
        GET_HOMEPAGE(state) {
            return state.homepage
        },
        GET_CATEGORY(state) {
            return state.category
        },
        GET_HOMEPAGE_CONTENTS(state) {
            return state.homepage_contents
        },
        GET_LOADING(state) {
            return state.loading
        },
        GET_URL(state) {
            return state.url
        }
    },
    mutations: {
        SET_HOMEPAGE(state, homepage) {
            state.homepage = homepage
        },
        SET_CATEGORY(state, category) {
            state.category = category
        },
        SET_HOMEPAGE_CONTENTS(state, homepage_contents) {
            state.homepage_contents = homepage_contents
        },
        SET_LOADING(state, loading) {
            state.loading = loading
        },
        SET_URL(state, url) {
            state.url = url
        }
    },
    actions: {
        async getHomepage(context) {
            context.commit("SET_LOADING", true)
            await this.$axios.post('/api/store/homepage')
            .then(res => {
                context.commit('SET_HOMEPAGE', res.data.homepage)
            }).catch(err => {
                console.error(err)
            })
            context.commit("SET_LOADING", false)
        },
        async getCategory(context) {
            await this.$axios.post('/api/store/homepage')
            .then(res => {
                context.commit('SET_CATEGORY', res.data.homepage_category)
                context.commit('SET_URL', res.data.url)
            }).catch(err => {
                console.error(err)
            })
        },
        async getHomepageContents(context, payload) {
            context.commit("SET_LOADING", true)
            await this.$axios.post('/api/store/homepage/contents', {
                category_id: payload.id
            })
            .then(res => {
                context.commit('SET_HOMEPAGE_CONTENTS', res.data)
            }).catch(err => {
                console.error(err)
            })
            context.commit("SET_LOADING", false)
        }
    }
}