<template>
    <div id="DetailQuestion">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card-wrapper">
                        <div class="card-header">
                            <h2>{{getDetailQuestion.title}}</h2>
                        </div>
                        <div class="card-question">
                            <DetailCard v-bind:question="getDetailQuestion" v-on:downVotes="downVotes($event)"></DetailCard>
                        </div>
                        <div class="card-answer">
                            <div v-for="(answer, i) in getAnswers" :key="i">
                                <AnswerCard v-bind:answer="answer"></AnswerCard>
                            </div>
                        </div>
                        <div class="card-post-question">
                            <PostAnswerCard></PostAnswerCard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DetailCard from "@/components/DetailCard.vue";
import AnswerCard from "@/components/AnswerCard.vue";
import PostAnswerCard from "@/components/PostAnswerCard.vue";

export default {
    name: 'DetailQuestion',
    components: {
        DetailCard,
        AnswerCard,
        PostAnswerCard
    },
    created() {
        this.$store.dispatch('getDetailQuestion', this.$route.params.id);
        this.$store.dispatch('getAnswers', this.$route.params.id);
    },
    computed: {
        getDetailQuestion() {
            return this.$store.state.question;
        },
        getAnswers() {
            return this.$store.state.answers;
        }
    },
    methods: {
        downVotes: function(id) {
            this.$store.dispatch('downVotesQuestion', id);
        }
    }
}
</script>

<style scoped>
.card-wrapper {
    border-left: 1px solid rgba(0, 0, 0, 0.125);
}
.card-header {
    padding-top: 50px;
    padding-bottom: 30px;
}
</style>