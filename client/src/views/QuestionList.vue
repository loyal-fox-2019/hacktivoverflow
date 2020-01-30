<template>
    <div>
        <div v-for="(question, i) in questions" :key="i">
            <QuestionPreview :question="question" class="mt-5"/>
        </div>
    </div>
</template>

<script>
import QuestionPreview from '@/components/QuestionPreview.vue'

export default {
    components: {
        QuestionPreview
    },
    computed : {
        questions(){
            return this.$store.state.questions
        }
    },
    created(){
        this.$store.dispatch('fetchData')
    }
}
</script>

<style>

</style>