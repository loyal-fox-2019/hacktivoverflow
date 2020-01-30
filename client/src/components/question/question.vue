<template>
    <sui-list-item @click.native="goToDetail">
        <div>
            <sui-card class="fluid" :style="{backgroundColor: color}">
                <sui-card-content extra>
                    <sui-card-header>{{ questionData.title }}</sui-card-header>
                    <sui-card-meta><small>{{ createdAt }}</small></sui-card-meta>
                </sui-card-content>
                <sui-card-content>
                    <div v-html="description">...</div>
                </sui-card-content>
                <sui-card-content extra>
                    <sui-label tag :color="tagColor[index]"
                               v-for="(tag, index) in questionData.tags"
                               :key="index">{{ tag }}
                    </sui-label>
                    <span slot="right">
                        <like-unlike :data-attributes="numOfAttributes"/>
                    </span>
                </sui-card-content>
            </sui-card>
        </div>
    </sui-list-item>
</template>

<script>
    import router from "../../router";
    import likeUnlike from "./likeUnlikeQuestion";
    import {mapGetters} from "vuex";

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
                tagColor: ['red', 'teal', 'orange', 'green', 'blue', 'black', 'olive', 'purple'],
                description: "",
                color: "#ffffff"
            }
        },
        props: {
            questionData: Object,
            dataUser: Object
        },
        methods: {
            goToDetail() {
                router.push({name: 'detail', params: {id: this.questionData._id}})
            },
            isTagged() {
                for (let i = 0; i <= this.questionData.tags.length; i++) {
                    this.color = '#ffffff';
                }

                this.questionData.tags.forEach(tag => {
                    if (this.dataUser.watchTags.indexOf(tag) > -1) {
                        this.color = '#ffffe6';
                        return
                    }
                })
            }
        },
        computed: {
            ...mapGetters([
                'questionsList',
                'tags',
                'getCurrentUser'
            ]),
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
            },
        },
        watch: {
            getCurrentUser(a, b) {
                this.isTagged()
            },
            tags(a, b) {
                this.isTagged()
            }
        },
        mounted() {
            this.numOfAttributes.numOfAnswers = this.numOfAnswers;
            this.numOfAttributes.numOfUpVotes = this.numOfUpVotes;
            this.numOfAttributes.numOfDownVotes = this.numOfDownVotes;
            this.numOfAttributes.user = this.users;
            this.description = `${this.questionData.description.slice(0, 30)} ...`
            this.isTagged();
        },
        components: {
            likeUnlike
        }
    }
</script>

<style scoped>
    .sui-image-profil {
        display: inline-block;
    }
</style>