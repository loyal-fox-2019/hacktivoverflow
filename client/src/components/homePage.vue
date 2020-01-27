<template>
    <div id="homepage">
        <nav-bar/>
        <sui-header>
            <sui-menu compact class="sui-menu">
                <sui-menu-item class="sui-menu">
                    <sui-label floating
                               pointing="below"
                               color="blue">
                        {{ questions.length }}
                    </sui-label>
                    List of Solution
                </sui-menu-item>
            </sui-menu>
        </sui-header>
        <sui-divider/>
        <sui-list divided relaxed>
            <question v-for="(q,index) in questions" :key="index" :questionData="q"/>
        </sui-list>
    </div>
</template>

<script>
    import question from "./question/question";
    import navBar from "./header/navBar";

    export default {
        name: "homePage",
        data() {
            return {}
        },
        methods: {
            fetchQuestion() {
                this.$axios({
                    method: 'get',
                    url: '/questions/',
                }).then(response => {
                    this.$store.dispatch('listOfQuestions', response.data.data.reverse());
                }).catch(err => [
                    console.log(err.response)
                ])
            }
        },
        computed: {
            questions() {
                return this.$store.getters.questionsList;
            }
        },
        mounted() {
            this.fetchQuestion();
        },
        components: {
            question,
            navBar
        }
    }
</script>

<style scoped>
    #homepage {
        padding: 100px;
    }
</style>