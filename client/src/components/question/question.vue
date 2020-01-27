<template>
    <sui-list-item @click.native="goToDetail">
        <sui-list-icon name="code" size="large" vertical-align="middle"/>
        <sui-list-content>
            <a is="sui-list-header">
                <sui-list-header>
                    <sui-label :color="statusColor">{{ questionData.status }}</sui-label>
                    {{ questionData.title }}
                </sui-list-header>
            </a>
            <a is="sui-list-description">
                <small>{{ createdAt }}</small>
                <div v-html="description">
                    ...
                </div>
                <p></p>
                <sui-label tag color="orange" v-for="(tag, index) in questionData.tags" :key="index">
                    {{ tag }}
                </sui-label>
            </a>
            <like-unlike :data-attributes="numOfAttributes" align="right" floating/>
        </sui-list-content>
    </sui-list-item>
</template>

<script>
    import router from "../../router";
    import likeUnlike from "./likeUnlikeQuestion";

    export default {
        name: "question",
        data() {
            return {
                numOfAttributes: {
                    numOfAnswers: 0,
                    numOfUpVotes: 0,
                    numOfDownVotes: 0,
                    user: "",
                },
                description: ""
            }
        },
        props: {
            questionData: Object
        },
        methods: {
            goToDetail() {
                router.push({name: 'detail', params: {id: this.questionData._id}})
            }
        },
        computed: {
            createdAt() {
                let date = new Date(this.questionData.created_at);
                return date.toLocaleString(
                    "en-US",
                    {timeZone: "Asia/Jakarta"}
                );
            },
            statusColor() {
                if (this.questionData.status === "Open") {
                    return "green"
                } else {
                    return "red"
                }
            },
            numOfAnswers() {
                return this.questionData.answer.length
            },
            numOfUpVotes() {
                return this.questionData.upVotes.length
            },
            numOfDownVotes() {
                return this.questionData.downVotes.length
            },
            users() {
                return this.questionData.user
            }
        },
        mounted() {
            this.numOfAttributes.numOfAnswers = this.numOfAnswers;
            this.numOfAttributes.numOfUpVotes = this.numOfUpVotes;
            this.numOfAttributes.numOfDownVotes = this.numOfDownVotes;
            this.numOfAttributes.user = this.users;
            this.description = `${this.questionData.description.slice(0, 30)} ...`
        },
        components: {
            likeUnlike
        }
    }
</script>

<style scoped>

</style>