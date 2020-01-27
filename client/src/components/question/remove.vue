<template>
    <div>
        <sui-list-icon name="remove"
                       style="cursor: pointer"
                       @click="removeQuestion"/>
    </div>
</template>

<script>
    import router from "../../router";

    export default {
        name: "remove",
        props: {
            questionId: String
        },
        methods: {
            removeQuestion() {
                this.$axios({
                    method: 'delete',
                    url: '/questions/' + this.questionId,
                    headers: {
                        Authorization: "token " + this.$cookies.get('token')
                    }
                }).then(response => {
                    router.push('/')
                }).catch(err => [
                    console.log(err.response)
                ])
            }
        }
    }
</script>

<style scoped>

</style>