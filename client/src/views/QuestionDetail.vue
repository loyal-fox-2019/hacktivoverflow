<template>
  <div class="questiondetail p-5">
        <div class="body p-5 text-left">
            <div class="row w-100">
                <div class="col-6">
                    <div class="row pl-4">
                        <h1>{{question.title}}</h1>
                    </div>
                    <p class="pl-4 author">{{question.author}}  | {{question.createdAt | moment("from", "now")}}</p>
                </div>
                <div class="col-6 text-right">
                    <h2><i @click="upvote(question._id)" :class="{active : upvoted}" class="fa fa-arrow-circle-o-up" aria-hidden="true"></i></h2>
                    <h2 class="upvotes mr-1"> {{votes}}</h2>
                    <h2><i @click="downvote(question._id)" :class="{active : upvoted}" class="fa fa-arrow-circle-o-down" aria-hidden="true"></i></h2>
                </div>
            </div>
            <div class="text-center m-4">
                <img :src="question.file" alt="">
            </div>
            <p v-html="question.content"></p>
            <button v-if="imOwner(question.author)" class="btn btn-dark" @click="deleteQuestion(question._id)">delete</button>
            <button v-if="imOwner(question.author)" class="btn btn-dark ml-4" @click="editQuestion(question)">edit</button>
        </div>
        <div class="answer-sign mt-5 p-3">
            <h3>Answers</h3>
        </div>
        <answerCard v-for="(answer, i) in answers" :key="i" :answer="answer"></answerCard>  
        <div class="answer-sign mt-5 p-3">
            <div class="col-12">
                <form>
                    <div class="text-left">
                        <wysiwyg v-model="answer"/>
                    </div>
                    <button @click="submitAnswer" type="submit" class="btn btn-dark mt-3">Submit</button>
                </form>
              </div>
        </div>
  </div>
</template>

<script>
import moment from 'vue-moment'
import answerCard from '../components/answerCard'

export default {
    data(){
        return {
            ago : '',
            oldTime : '',
            answer : '',
            upvoted : null
        }
    },
    methods : {
        checkUpvoted(){
            if(this.$store.state.oneQuestion.upvotes.includes(this.$store.state.user_id)){
                return true
            } else {
                return false
            }
        },
        upvote(id){
            this.$store.dispatch('upvote', id)
        },
        downvote(id){
            this.$store.dispatch('downvote', id)
        },
        submitAnswer(){
            let payload = {
                QuestionId : this.$route.params._id,
                content : this.answer,
                author : localStorage.user
            }
            this.$store.dispatch('postAnswer', payload)
            this.answer = ''
        },
        imOwner(author){
            if(author === localStorage.user){
                return true
            } else {
                return false
            }
        },
        deleteQuestion(id){
            this.$store.dispatch('deleteQuestion', id)
        },
        editQuestion(question){
            this.$store.dispatch('editQuestion', question)
        }
    },
    components : {
        answerCard
    },
    computed : {
        question(){
            return this.$store.state.oneQuestion
        },
        votes(){
            return this.$store.state.votes
        },
        answers(){
            return this.$store.state.answers
        }
    },
    mounted(){
        if(this.$store.state.answerEdit){
            this.answers = this.$store.state.answerEdit
        }
        this.$store.dispatch('fetchOneQuestion', this.$route.params._id)
        if(this.$store.state.oneAnswer){
            this.answer = this.answer.content
        }
    }
}
</script>

<style scoped>
.body{
    height: 100%;
    box-shadow: 12px 12px 12px 0 rgb(0,0,0,.03), -12px -12px 12px 0 rgba(255,255,255,.7)
}

.answer-sign{
    height: 100%;
    box-shadow: 12px 12px 12px 0 rgb(0,0,0,.03), -12px -12px 12px 0 rgba(255,255,255,.7)
}

.author{
    color: grey;
}

img{
    max-height: 25vh ;
}

.fa:hover{
  cursor: pointer;
  color: rgb(95, 95, 95);
}

.active{
    color: rgb(95, 95, 95);
}
</style>