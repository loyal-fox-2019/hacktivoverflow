<template>
    <sui-message id="message">
        <div align="right">
            <remove v-if="isRemoveable" :questionId="questionData._id"/>
        </div>
        <sui-header color="blue">{{questionData.title}}</sui-header>
        <small>{{ createdAt}}</small>
        <div id="detail">
            <like-unlike :data-attributes="numOfAttributes"
                         @click="fetchDataDetail"/>
        </div>
        <sui-divider/>
        <sui-card-description id="question-description" v-html="questionData.description">
            {{ questionData.description }}
        </sui-card-description>
        <sui-divider/>
        <sui-list divided relaxed>
            <answer v-for="answer in questionData.answer" :key="answer._id" :answer="answer"/>
        </sui-list>
        <add-new-answer :answerId="questionData._id" @updateAnswers="fetchDataDetail"/>
    </sui-message>
</template>

<script>
    import answer from "../answer/answer";
    import addNewAnswer from "../answer/addNewAnswer";
    import likeUnlike from "./likeUnlikeQuestion";
    import remove from "./remove";

    export default {
        name: "detailQuestion",
        data() {
            return {
                id: String,
                questionData: Object,
                userData: "",
                user: Object,
                numOfAttributes: {
                    numOfAnswers: 0,
                    numOfUpVotes: 0,
                    numOfDownVotes: 0,
                    user: ""
                }
            }
        },
        methods: {
            fetchDataDetail() {
                this.$axios({
                    method: 'get',
                    url: '/questions/' + this.id,
                    headers: {
                        Authorization: 'token ' + this.$cookies.get('token')
                    }
                }).then(response => {
                    console.log(response.data);
                    this.questionData = response.data.data;
                    this.numOfAttributes.numOfAnswers = response.data.numOfAnswers;
                    this.numOfAttributes.numOfUpVotes = response.data.numOfUpVotes;
                    this.numOfAttributes.numOfDownVotes = response.data.numOfDownVotes;
                    this.numOfAttributes.user = response.data.data.user;
                    this.user = response.data.data.user;
                }).catch(err => {
                    console.log(err.response);
                })
            },
            currentUser() {
                this.$axios({
                    method: 'get',
                    url: '/users/',
                    headers: {
                        Authorization: 'token ' + this.$cookies.get('token')
                    }
                }).then(response => {
                    this.userData = response.data.data
                }).catch(err => {
                    console.log(err.response)
                })
            }
        },
        mounted() {
            this.id = this.$route.params.id;
            this.fetchDataDetail();
            this.currentUser();
        },
        computed: {
            createdAt() {
                let date = new Date(this.questionData.created_at);
                return date.toLocaleString(
                    "en-US",
                    {timeZone: "Asia/Jakarta"}
                );
            },
            isRemoveable() {
                return this.userData._id === this.user._id
            }
        },
        components: {
            answer,
            addNewAnswer,
            likeUnlike,
            remove
        }
    }
</script>

<style scoped>
    #question-description {
        background-color: white;
        padding: 15px;
    }

    #detail{
        float: right;
    }
</style>