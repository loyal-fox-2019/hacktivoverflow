<template>
    <div class="card w-100">
        <div class="card-body">
            <div class="row">
                <div class="col-lg-1 d-flex flex-column"
                style="padding-right: 0 !important;">
                    <i class="fas fa-sort-up" 
                    style="
                    text-align:center; 
                     font-size: 50px; 
                     cursor: pointer"
                     v-on:click.prevent="upVotes(question._id)"></i>
                    <h4 style="text-align: center; margin-bottom: 2px;">{{question.upvotes.length - question.downvotes.length}}</h4>
                    <i class="fas fa-sort-down" style="
                    text-align: center; 
                    font-size: 50px; 
                    cursor: pointer"
                    v-on:click.prevent="downVotes(question._id)"></i>
                </div>
                <div class="col-lg-11" style="position: relative;">
                    <p class="card-text">{{question.description}}</p>
                    <p class="card-text" style="font-size: 20px; position: absolute; bottom: 2px;">{{getTotalAnswer}} Answers</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailCard',
    props: ['question'],
    computed: {
        getTotalAnswer() {
            return this.$store.state.answers.length
        }
    },
    methods: {
        downVotes: function(id) {
            this.$emit('downVotes', id);
        },
        upVotes: function(id) {
            this.$store.dispatch('upVotesQuestion', id);
        } 
    }
}
</script>

<style>

</style>