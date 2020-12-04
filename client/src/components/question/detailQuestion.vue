<template>
    <sui-segment>
        <div align="right">
            <router-link to="/">
                <sui-icon name="home" class="sui-icon"/>
            </router-link>
            |
            <sui-icon color="red" name="delete" v-if="isRemoveAble" class="sui-icon" @click="removeQuestion"/>
        </div>
        <sui-header color="blue">{{questionData.data.title}}</sui-header>
        <small>{{ createdAt }}</small>
        <div id="detail">
            <like-unlike :data-attributes="numOfAttributes"/>
        </div>
        <sui-divider/>
        <sui-card-description id="question-description" v-html="questionData.data.description">
            {{ questionData.data.description }}
        </sui-card-description>
        <sui-divider/>
        <sui-list divided relaxed>
            <answer v-for="answer in questionData.data.answer" :key="answer._id" :answer="answer"/>
        </sui-list>
        <add-new-answer :answerId="questionData.data._id"/>
    </sui-segment>
</template>

<script>
    import answer from "../answer/answer";
    import addNewAnswer from "../answer/addNewAnswer";
    import likeUnlike from "./likeUnlikeQuestion";
    import {mapGetters} from "vuex";

    export default {
        name: "detailQuestion",
        data() {
            return {
                currentQuestionData: "",
                isRemoveAble: false
            }
        },
        methods: {
            removeQuestion() {
                this.$store.dispatch('removeQuestion', this.questionData.data._id)
            }
        },
        mounted() {
            this.$store.dispatch('getCurrentQuestion', this.$route.params.id);
        },
        computed: {
            ...mapGetters([
                'questionData',
                'getCurrentUser'
            ]),
            createdAt() {
                let date = new Date(this.questionData.data.created_at);
                return date.toLocaleString(
                    "en-US",
                    {timeZone: "Asia/Jakarta"}
                );
            },
            numOfAttributes() {
                return {
                    numOfAnswers: this.questionData.data.answer.length,
                    numOfUpVotes: this.questionData.data.upVotes.length,
                    numOfDownVotes: this.questionData.data.downVotes.length,
                    user: this.questionData.data.user,
                    id: this.questionData.data._id
                }
            }
        },
        watch: {
            questionData(a, b) {
                this.currentQuestionData = this.questionData
                this.isRemoveAble = (this.questionData.data.user._id === this.getCurrentUser._id);
            },
            getCurrentUser(a, b) {
                this.$store.dispatch('getCurrentQuestion', this.$route.params.id);
            }
        },
        components: {
            answer,
            addNewAnswer,
            likeUnlike
        }
    }
</script>

<style scoped>
    #question-description {
        background-color: white;
        padding: 15px;
    }

    #detail {
        float: right;
    }

    .sui-icon {
        cursor: pointer;
        display: inline-block;
    }
</style>