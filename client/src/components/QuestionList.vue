<template>
    <div class="d-flex w-100 mb-2 border p-2 question-container">
        <b-col cols="2">
            <div class="flex-column my-2">
                <b-col class="number">
                    {{votes}}
                </b-col>
                <b-col class="num-text">
                    votes
                </b-col>
                <div class="answer-total mt-2 py-2">
                <b-col class="number">
                    {{totalAnswers}}
                </b-col>
                <b-col class="num-text">
                    answers
                </b-col>
                </div>
            </div>
        </b-col>
        <b-col cols="10">
        <b-row class="text-left mt-2 mr-auto">
            <h5 @click="viewDetail(questionDetail._id)" class="link">Q: {{questionDetail.title}}</h5>
        </b-row>
        <b-row class="text-left mr-auto content">
            <p v-html="questionDetail.description" id="module"></p>
        </b-row>
        <b-row align-h="between" class="mr-auto date-detail">
            <div>
                <div @click="viewDetail(questionDetail._id)" class="link">Read more...</div>
            </div>
            <div>
                asked {{date}} by {{questionDetail.userId.name}}
            </div>
        </b-row>
        </b-col>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: "question-list",
    props: {
        questionDetail: Object
    },
    data(){
        return {
            answers: []
        }
    },
    computed: {
        totalAnswers(){
            return this.answers.length
        },
        date(){
            let rawDate = new Date(this.questionDetail.created_at)
            return rawDate.toDateString()
        },
        votes(){
            let totalVote = 0
            for(let vote of this.questionDetail.votes){
                totalVote += vote.value
            }
            return totalVote
        }
    },
    methods: {
        viewDetail(id){
            this.$store.dispatch('viewDetail', id)
        }
    },
    mounted(){
        axios({
            method: 'get',
            url: `http://localhost:3000/answer/${this.questionDetail._id}`
        })
        .then(({data})=>{
            this.answers = data
        })
    }
}
</script>

<style>
#module:not(.show){
    display: block;
    height: 60px;
    overflow: hidden;
}
.link{
    color: rgb(67, 120, 245);
}
.link:hover{
    cursor: pointer;
    filter: brightness(75%)
}
.link:active{
    cursor: pointer;
    filter: brightness(100%)
}
.content{
    font-size: 14px;
}
.question-container{
    height: 150px
}
.number{
  font-size: 21px;
  font-weight: bold;
}
.answer-total{
  background-color: rgb(80, 172, 80);
  color: white;
  border-radius: 10px;
}
.num-text{
  font-size: 12px;
}
.date-detail{
    font-size: 12px;
}
</style>