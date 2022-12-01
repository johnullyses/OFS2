export default {
    namespaced: true,
    state: {
        stores: [],
        storesloading: false,
        store: {},
        storeloading: false,
        store_sources: [],
        provinces: [],
        cities: [],
        provincesloading: false,
        citiesloading: false,
        batsubscriptionInfo: [],
    },
    getters: {
        GET_STORE_LIST (state) {
            return state.stores
        },
        GET_STORE (state) {
            return state.store
        },
        GET_STORE_LIST_LOADING (state) {
            return state.storesloading
        },
        GET_STORE_LOADING (state) {
            return state.storeloading
        },
        GET_STORE_SOURCES (state) {
            return state.store_sources
        },
        GET_PROVINCES (state) {
            return state.provinces
        },
        GET_CITIES (state) {
            return state.cities
        },
        GET_PROVINCES_LOADING (state) {
            return state.provincesloading
        },
        GET_CITIES_LOADING (state) {
            return state.citiesloading
        },
        GET_BAT_SUBSCRIPTION_INFO (state) {
            return state.batsubscriptionInfo
        },
    },
    mutations: {
        SET_STORE_LIST (state, stores) {
            state.stores = stores;
        },
        SET_STORE (state, store) {
            if (store[0] !== undefined) {
                store[0].hostname = !store[0].hostname ? '127.0.0.1' : store[0].hostname
                store[0].is_active = Boolean(Number(store[0].is_active))
                store[0].is_template_store = Boolean(Number(store[0].is_template_store))
                store[0].is_grab_express = Boolean(Number(store[0].is_grab_express))
                store[0].is_24hours = Boolean(Number(store[0].is_24hours))
                store[0].is_mds_rider = Boolean(Number(store[0].is_mds_rider))
                state.store = { ...store[0] };
            } else {
                state.store = {
                    hostname: '127.0.0.1',
                    is_active: false,
                    is_template_store: false,
                    is_grab_express: false,
                    is_24hours: false,
                    is_mds_rider: false,
                    hub_dec_pin: ''
                };
            }
        },
        SET_STORE_DETAIL (state, { key, value }) {
            state.store[key] = value;
        },
        SET_STORE_LIST_LOADING (state, storesloading) {
            state.storesloading = storesloading;
        },
        SET_STORE_LOADING (state, storeloading) {
            state.storeloading = storeloading;
        },
        SET_STORE_SOURCES (state, store_sources) {
            state.store_sources = store_sources;
        },
        SET_PROVINCES (state, provinces) {
            state.provinces = provinces;
        },
        SET_CITIES (state, cities) {
            state.cities = cities;
        },
        SET_PROVINCES_LOADING (state, provincesloading) {
            state.provincesloading = provincesloading;
        },
        SET_CITIES_LOADING (state, citiesloading) {
            state.citiesloading = citiesloading;
        },
        SET_BAT_SUBSCRIPTION_INFO (state, batsubscriptionInfo) {
            state.batsubscriptionInfo = batsubscriptionInfo;
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
        async storeDetail (context, payload) {
            context.commit("SET_STORE_LOADING", true)
            await this.$axios.get('/api/store/' + payload.store_id + '/detail')
                .then(response => {
                    context.commit("SET_STORE", response.data.data)
                }).catch(error => {
                    console.log(error)
                })
            context.commit("SET_STORE_LOADING", false)
        },
        async storeDetailSources (context, payload) {
            //context.commit("SET_STORE_LOADING", true)
            await this.$axios.get('/api/store/' + payload.store_id + '/detail-sources')
                .then(response => {
                    context.commit("SET_STORE_SOURCES", response.data)
                }).catch(error => {
                    console.log(error)
                })

            //context.commit("SET_STORE_LOADING", false)
        },
        async getProvinces (context) {
            context.commit("SET_PROVINCES_LOADING", true)
            await this.$axios.get('/api/store/provinces')
                .then(response => {
                    context.commit("SET_PROVINCES", response.data)
                }).catch(error => {
                    console.log(error)
                })
            context.commit("SET_PROVINCES_LOADING", false)
        },
        async getCities (context, payload) {
            context.commit("SET_CITIES_LOADING", true)
            await this.$axios.get('/api/store/provinces/' + payload.province_id + '/cities')
                .then(response => {
                    context.commit("SET_CITIES", response.data)
                }).catch(error => {
                    console.log(error)
                })
            context.commit("SET_CITIES_LOADING", false)
        },
        async createStoreDetail (context) {
            try {
                const response = await this.$axios.post('/api/store/detail/create', context.state.store)
                console.log(response)
                return true
            }
            catch (error) {
                console.log(error.response)
                return false
            }
        },
        async updateStoreDetail (context, payload) {
            try {
                const response = await this.$axios.post('/api/store/' + payload.store_id + '/detail/update', context.state.store)
                console.log(response)
                return true
            }
            catch (error) {
                console.log(error.response)
                return false
            }
        },
        async getsubscriptionInfo (context, payload) {
            context.commit("SET_STORE_LIST_LOADING", true)
            // await this.$axios.get('/api/store/manage')
            //     .then(response => {
            //         context.commit("SET_STORE_LIST", response.data.data)
            //     }).catch(error => {
            //         console.log(error)
            //     })
            let response = 2;
            context.commit("SET_BAT_SUBSCRIPTION_INFO", response)
            context.commit("SET_STORE_LIST_LOADING", false)
        },
        reset (context) {
            context.commit("SET_STORE", {})
        }
    }
}