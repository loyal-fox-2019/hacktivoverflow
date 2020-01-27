<template>
    <a is="sui-list-description" class="sui-list">
        <sui-label basic>
            <sui-icon name="chat"/>
            {{ dataAttributes.numOfAnswers }}
        </sui-label>
        <sui-label basic>
            <sui-icon name="thumbs up outline" @click="fetchDataDetail" class="thumb"/>
            {{ dataAttributes.numOfUpVotes }} /
            <sui-icon name="thumbs down outline" @click="fetchDataDetail" class="thumb"/>
            {{ dataAttributes.numOfDownVotes }}
        </sui-label>
        <sui-label basic>
            <sui-icon name="user"/>
            {{ dataAttributes.user.name }}
        </sui-label>
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
                    url: '/questions/' + this.id + '/like',
                    headers: {
                        Authorization: 'token ' + this.$cookies.get('token')
                    }
                }).then(response => {
                    this.fetchDataDetail()
                }).catch(err => {
                    console.log(err.response);
                })
            },
            unLike() {
                this.$axios({
                    method: 'patch',
                    url: '/questions/' + this.id + '/unlike',
                    headers: {
                        Authorization: 'token ' + this.$cookies.get('token')
                    }
                }).then(response => {
                    this.fetchDataDetail()
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