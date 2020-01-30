<template>
    <div id="post">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card-wrapper">
                        <div class="header-card">
                            <h2 style="margin-bottom: 0 !important">All Questions</h2>
                            <h4 class="mt-3">{{getQuestions.length}} Question Posted</h4>
                        </div>
                        <div class="question-card">
                            <div class="postcard-wrapper" v-for="(question, i) in getQuestions" :key="i">  
                                <PostCard class="mt-4" v-bind:question="question"></PostCard>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PostCard from '@/components/PostCard.vue'

export default {
    name: 'Post',
    components: {
        PostCard
    },
    computed: {
        getQuestions() {
            return this.$store.state.questions
        }
    },
    created() {
        this.$store.dispatch('getQuestions')
    }
}
</script>

<style scoped>
.card-wrapper {
    border-left: 1px solid rgba(0, 0, 0, 0.125);
    border-right: 1px solid rgba(0, 0, 0, 0.125);
}
.header-card {
    padding-top: 50px;
    padding-left: 30px;
}
.question-card {
    height: 100vh;
    overflow-y: scroll;
}
</style>