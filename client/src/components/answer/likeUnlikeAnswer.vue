<template>
    <a is="sui-list-description" class="sui-list">
        <sui-label basic>
            <sui-icon name="thumbs up outline"/>
            /
            <sui-icon name="thumbs down outline"/>
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
            }
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