<template>
    <a is="sui-list-description" class="sui-list">
        <sui-label basic>
            <sui-icon name="thumbs up outline" @click="like"/>
            {{ data.upVotes.length }}
            /
            <sui-icon name="thumbs down outline" @click="unLike"/>
            {{ data.downVotes.length }}
        </sui-label>
        <sui-label basic>
            <sui-icon name="user"/>
            {{ user.name }}
        </sui-label>
    </a>
</template>

<script>
    export default {
        name: "likeUnlikeAnswer",
        data() {
            return {
                user: ""
            }
        },
        props: {
            data: Object
        },
        methods: {
            dataUser() {
                this.$axios({
                    method: 'get',
                    url: '/users/' + this.data.user,
                    headers: {
                        Authorization: "token " + this.$cookies.get('token')
                    }
                }).then(response => {
                    this.user = response.data.data
                }).catch(err => {
                    console.log(err.response)
                })
            },
            like() {
                console.log(this.data._id);
                this.$axios({
                    method: 'patch',
                    url: '/answers/' + this.data._id + '/like',
                    headers: {
                        Authorization: 'token ' + this.$cookies.get('token')
                    }
                }).then(response => {
                    console.log(response)
                    this.$store.dispatch('getCurrentQuestion', this.data.question);
                    this.$store.dispatch('listOfQuestions');
                }).catch(err => {
                    console.log(err.response);
                })
            },
            unLike() {
                this.$axios({
                    method: 'patch',
                    url: '/answers/' + this.data._id + '/unlike',
                    headers: {
                        Authorization: 'token ' + this.$cookies.get('token')
                    }
                }).then(response => {
                    console.log(response)
                    this.$store.dispatch('getCurrentQuestion', this.data.question);
                    this.$store.dispatch('listOfQuestions');
                }).catch(err => {
                    console.log(err.response);
                })
            },
        },
        mounted() {
            this.dataUser()
        }
    }
</script>

<style scoped>
    .sui-list {
        padding: 5px;
    }
</style>