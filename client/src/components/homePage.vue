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
                <watch-tags v-if="isLogin" :data="tags" :dataUser="getCurrentUser"/>
            </sui-menu-item>
        </sui-menu>
        <sui-divider/>
        <sui-list relaxed>
            <question v-for="(q,index) in questionsList"
                      :key="index"
                      :questionData="q"
                      :dataUser="getCurrentUser"/>
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
            return {
                isTagged: false
            }
        },
        methods: {},
        computed: {
            ...mapGetters([
                'questionsList',
                'tags',
                'getCurrentUser'
            ]),
            isLogin() {
                return this.$cookies.isKey('token')
            }
        },
        watch: {
            // questionList(a, b) {
            //     // console.log(this.questionList)
            //     // this.$store.dispatch('listOfQuestions');
            // },
            // getCurrentUser(a, b) {
            //     // this.$store.dispatch('getCurrentUser');
            // }
        },
        mounted() {
            this.$store.dispatch('listOfQuestions');
            this.$store.dispatch('getCurrentUser');
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