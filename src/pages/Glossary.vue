<template>
    <q-page>
        <q-btn to="/" clickable v-ripple color="white" flat text-color="black">
            <svg  xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
            </svg>
        </q-btn>
        <div v-if="loading">
            <q-spinner-tail
                style="display: block; margin-left: auto; margin-right: auto;"
                color="primary"
                size="5em"
            />
        </div>
        <!-- <label class="page_title">Glossary</label> -->
        <div class="row q-pa-md">
            <div  class=" col-md-2"></div>
            <div  class="col-xs-12 col-sm-12 col-md-8">
                <div v-for="glo in glossary" :key="glo.id">
                    <p class="question" v-html="glo.title"></p>
                    <p class="answer" v-html="glo.descriptions"></p> 
                </div>
            </div>
            <div  class=" col-md-2"></div>
        </div>

    </q-page>
</template>
<script>
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
    name: 'NavigationPage',
     async beforeMount() {
        await this.getHomepageContents({id:this.$route.params.id})
        this.glossary = this.homepage_contents
    },
    computed: {
        ...mapGetters('Homepage', {
            homepage_contents: 'GET_HOMEPAGE_CONTENTS',
            loading: 'GET_LOADING',
        })
    },
    methods: {
        ...mapActions('Homepage', [
            'getHomepageContents'
        ]),
    },
    data() {
        return {
            glossary: [],
        }
    }
})
</script>
<style scoped>
.page_title {
    margin-left: 67px;
    font-size: 25px;
    margin-top: 20px;
}
.search_button {
    margin-top: 20px;
    margin-left: 140px;
    margin-right: 140px;
}
.question {
    margin-top: 30px;
    font-size: 25px;
    font-weight: 400;
}
.answer {
    font-size: 15px;
    font-weight: 300;
}
</style>
