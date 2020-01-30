<template>
    <div class="card w-100" style="border-left: none; 
    border-right: none; border-bottom: none;
     border-radius: 0 !important; margin-top: 0 !important;">
        <div class="card-body" style="padding-left: 30px !important">
            <div class="row">
                <div class="col-lg-1 d-flex flex-column"
                style="padding-right: 0 !important;">
                    <h4 style="text-align: center">{{question.upvotes.length + question.downvotes.length}}</h4>
                    <p style="font-size: 13px; text-align: center;">Votes</p>
                    <h4 style="text-align:center">0</h4>
                    <p style="font-size: 13px; text-align: center;">Answers</p>
                </div>
                <div class="col-lg-11" style="padding-left: 30px !important">
                    <h5 class="card-title">{{question.title}}</h5>
                    <p class="card-text" style="font-weight: 500">{{question.description.slice(0, 197)}}....</p>
                    <p>Asked by: {{question.userId.name}}</p>
                    <div class="button-container d-flex justify-content-between">
                        <router-link :to="{path:`/detail-question/${question._id}`}"
                        class="btn btn-dark" 
                        style="box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.4);">Detail Question</router-link>
                        <router-link :to="{path: `/update-question/${question._id}`}"
                        v-if="question.userId._id == getPayload"
                        class="btn btn-info" 
                        style="box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.4);">Update Question</router-link>
                        <button 
                        v-if="question.userId._id == getPayload"
                        v-on:click.prevent="deleteQuestion(question._id)"
                        class="btn btn-danger" 
                        style="box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.4);">Delete Question</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PostCard',
    props: ['question'],
    created() {
        this.$store.dispatch('getPayloadUser')
    },
    computed: {
        getPayload() {
            return this.$store.state.payloadUser
        }
    },
    methods: {
        deleteQuestion: function(id) {
            this.$store.dispatch('deleteQuestion', id);
        }
    }
}
</script>

<style scoped>

</style>