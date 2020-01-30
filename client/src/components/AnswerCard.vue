<template>
    <div class="card w-100">
        <div class="card-body">
            <div class="row">
                <div class="col-lg-1 d-flex flex-column"
                style="padding-right: 0 !important; cursor: pointer;">
                    <i class="fas fa-sort-up" 
                    v-on:click.prevent="upVote(answer._id)"
                    style="text-align: center; font-size: 50px;"></i>
                    <h4 style="text-align: center; margin-bottom: 2px;">{{answer.upvotes.length - answer.downvotes.length}}</h4>
                    <i class="fas fa-sort-down"
                    v-on:click.prevent="downVote(answer._id)"
                     style="text-align: center; font-size: 50px;
                     cursor: pointer;"></i>
                </div>
                <div class="col-lg-11" style="position: relative;">
                    <h3 class="mb-3">{{answer.title}}</h3>
                    <p class="card-text">{{answer.description}}</p>
                    <p style="position: absolute; bottom: 2px; right: 5px;">Answered By: <span style="font-weight: 600">{{answer.userId.name}}</span></p>
                    <div class="button-container">
                        <router-link v-if="getPayload == answer.userId._id" 
                        :to="{path: `/update-answer/${answer._id}`}" 
                        class="btn btn-info mr-3">Update Info</router-link>
                        <button v-if="getPayload == answer.userId._id" 
                        v-on:click.prevent="deleteAnswer(answer._id)"
                        type="click" 
                        class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AnswerCard',
    props: ['answer'],
    created() {
        this.$store.dispatch('getPayloadUser')
    },
    computed: {
        getPayload() {
            return this.$store.state.payloadUser;
        }
    },
    methods: {
        deleteAnswer(id) {
            this.$store.dispatch('deleteAnswer', id);
        },
        downVote(id) {
            this.$store.dispatch('downVotesAnswer', id);
        },
        upVote(id) {
            this.$store.dispatch('upVotesAnswer', id);
        }
    }
}
</script>

<style>

</style>