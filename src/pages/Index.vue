<template>
    <q-page style="max-height: 90vh; overflow: auto;">
        <div v-if="loading">
            <q-spinner-tail
                style="display: block; margin-left: auto; margin-right: auto;"
                color="primary"
                size="5em"
            />
        </div>
        <div v-if="loading == false" style="text-align: center">
            <p class="title" v-html="homepage_title"></p>
            <p class="desc" v-html="homepage_desc"></p>
            <div class="flex flex-center">
                <q-input rounded outlined label="Search Items" bg-color="white" class="search_button" dense>
                    <template v-slot:append>
                    <q-icon name="search" />
                    </template>
                </q-input>
            </div>
            <div class="buttons row justify-center" >
                <div class="row items-start q-pa-md">
                    <div v-for="cat in categories" :key="cat.id" class="col-xs-12 col-sm-12 col-md-4">
                        <q-btn class="button faq" :to="cat.url+'/'+cat.id">
                            <img :src="url+'/'+cat.icon" style="height: 125px">
                            <span class="button-text">{{ cat.title }}</span>
                        </q-btn>
                    </div>
                </div>
            </div>
        </div>
    </q-page>
</template>
<script>
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
    name: 'PageIndex',
    async beforeMount() {
        await this.getHomepage()
        await this.getCategory()
        this.homepage_title = this.homepage[0] ? this.homepage[0].homepage_title : ''
        this.homepage_desc = this.homepage[0] ? this.homepage[0].homepage_descriptions : ''
        this.categories = this.category ? this.category : ''
        this.url = this.backend_url
    },
    computed: {
        ...mapGetters('Homepage', {
            homepage: 'GET_HOMEPAGE',
            category: 'GET_CATEGORY',
            loading: 'GET_LOADING',
            backend_url: 'GET_URL'
        })
    },
    methods: {
        ...mapActions('Homepage', [
            'getHomepage',
            'getCategory',
            'getHomepageContents'
        ]),
    },
    data() {
        return {
            homepage_title: '',
            homepage_desc: '',
            categories: [],
            url: ''
        }
    }
    
})
</script>
<style scoped>
body {
  height:300px
}

.title {
    margin-top: 40px;
    font-size: 30px;
}
.desc {
    font-size: 20px;
    font-weight: 300;;
}
.search_button {
    margin-top: 20px;
    width: 650px;
}
.button {
    margin: 10px;
    padding: 50px;
    background-color: white;
    border-radius: 10px;
}
.buttons {
    margin-top: 70px;
}
.button-text {
    position: absolute;
    bottom: 7%;
    width: 100%;
    left: 0%;
    text-transform: capitalize;
    font-size: 17px;
    font-weight: 400;
}
</style>
