<template>
    <div id="homepage">
        <nav-bar/>
        <sui-menu compact class="sui-menu">
            <sui-menu-item class="sui-menu">
                <sui-label floating
                           pointing="below"
                           color="blue">
                    {{ questionsList.length }}
                </sui-label>
                List of Solution
            </sui-menu-item>
            <sui-menu-item class="sui-menu">
                <watch-tags :data="tags"/>
            </sui-menu-item>
        </sui-menu>
        <sui-divider/>
        <sui-list divided relaxed>
            <question v-for="(q,index) in questionsList" :key="index" :questionData="q"/>
        </sui-list>
    </div>
</template>

<script>
    import question from "./question/question";
    import navBar from "./header/navBar";
    import {mapGetters} from "vuex";
    import watchTags from "./header/watchTags";

    export default {
        name: "homePage",
        data() {
            return {}
        },
        methods: {},
        computed: {
            ...mapGetters([
                'questionsList',
                'tags'
            ])
        },
        watch: {
            questionList(a, b) {
                this.$store.dispatch('listOfQuestions');
            },
        },
        mounted() {
            this.$store.dispatch('listOfQuestions');
        },
        components: {
            question,
            navBar,
            watchTags
        }
    }
</script>

<style scoped>
    #homepage {
        padding: 100px;
    }
</style>