<template>
    <a is="sui-list-description" class="sui-list">
        <sui-label basic>
            <sui-icon name="chat"/>
            {{ dataAttributes.numOfAnswers }}
        </sui-label>
        <sui-label basic>
            <sui-icon name="thumbs up outline" @click="like" class="thumb"/>
            {{ dataAttributes.numOfUpVotes }} /
            <sui-icon name="thumbs down outline" @click="unLike" class="thumb"/>
            {{ dataAttributes.numOfDownVotes }}
        </sui-label>
        <a is="sui-label" basic image>
            <img src="https://semantic-ui-vue.github.io/static/images/avatar/large/daniel.jpg">
            {{ dataAttributes.user.name }}
        </a>
    </a>
</template>

<script>
    export default {
        name: "likeUnlike",
        data() {
            return {}
        },
        props: {
            dataAttributes: Object
        },
        methods: {
            like() {
                this.$axios({
                    method: 'patch',
                    url: '/questions/' + this.dataAttributes.id + '/like',
                    headers: {
                        Authorization: 'token ' + this.$cookies.get('token')
                    }
                }).then(response => {
                    console.log(response)
                    this.$store.dispatch('getCurrentQuestion', this.dataAttributes.id);
                    this.$store.dispatch('listOfQuestions');
                }).catch(err => {
                    console.log(err.response);
                })
            },
            unLike() {
                this.$axios({
                    method: 'patch',
                    url: '/questions/' + this.dataAttributes.id+ '/unlike',
                    headers: {
                        Authorization: 'token ' + this.$cookies.get('token')
                    }
                }).then(response => {
                    console.log(response)
                    this.$store.dispatch('getCurrentQuestion', this.dataAttributes.id);
                    this.$store.dispatch('listOfQuestions');
                }).catch(err => {
                    console.log(err.response);
                })
            },
            fetchDataDetail() {
                this.$emit.click
            }
        }
    }
</script>

<style scoped>
    .sui-list {
        padding: 5px;
    }

    .thumb{
        cursor: pointer;
    }
</style>