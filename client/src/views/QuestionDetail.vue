<template>
    <div class="question-detail">
        <div class="container">
            <div class="row">
                <div class="col-10">
                    <div class="main-bar border-left p-3">
                        <div class="grid border-bottom pb-3">
                            <span class="headline">{{questions.title}}</span>
                        </div>
                        <div class="row post-layout mt-3">
                            <div class="col-2 post-layout-left">
                                <div class="voting-container">
                                    <div class="vote-up">
                                      <a @click.prevent="upQuestion" style="cursor:pointer;">  <i class="fas fa-caret-up"></i> </a>
                                    </div>
                                    <div class="vote-count">
                                        <span class="total ml-2">{{getTotalVote(this.questions)}}</span>
                                    </div>
                                    <div class="vote-down">
                                      <a @click.prevent="upQuestion" style="cursor:pointer;">  <i class="fas fa-caret-down"></i> </a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-10 post-layout-right pt-2">
                                <div class="post-text">
                                    <p v-html="questions.desc"></p>
                                </div>
                                <div class="tags">
                                    <span class="badge badge-secondary" v-for="(tag,i) in questions.tags" :key="i">{{tag}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="answers-headers border-bottom pb-3">
                            <p class="answer-count">{{answers.length}} Answers</p>
                        </div>
                        <!-- loop answers -->
                        <div v-for="answer in answers" :key="answer.id">
                            <div class="row post-layout mt-3">
                                <div class="col-2 post-layout-left">
                                    <div class="voting-container">
                                        <div class="vote-up">
                                            <a @click.prevent="upAnswer(`${answer._id}`)" style="cursor:pointer;">  <i class="fas fa-caret-up"></i> </a>
                                        </div>
                                        <div class="vote-count">
                                            <span class="total ml-2">{{answer.upVotes.length - answer.downVotes.length}}</span>
                                        </div>
                                        <div class="vote-down">
                                            <a @click.prevent="downAnswer(`${answer._id}`)" style="cursor:pointer;"> <i class="fas fa-caret-down"></i> </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-10 post-layout-right pt-2">
                                    <div class="post-text">
                                        <p v-html="answer.desc"></p>
                                    </div>
                                    <div class="created">
                                        <div class="by-user">
                                            <p class="date">Answered by<span class="name"> {{answer.idUser.username}}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                        <!-- end of loop answers -->
                    <p style="padding-top:15px;">Your Answer</p>
                    <VueEditor v-model="myAnswer"/>
                    <b-button variant="primary" class="mt-3" @click.prevent="save">Post Your Answer</b-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { VueEditor } from 'vue2-editor'

export default {
    name:'detailQuestion',
    components: {
        VueEditor
    },
    data() {
        return {
            questions : {title:'',upVotes:[],downVotes:[],desc:''},
            answers: {},
            myAnswer : ''
        }
    },
    methods:{
        getTotalVote(obj){
            let up = obj.upVotes.length
            let down = obj.downVotes.length
            return up - down
        },        
        upQuestion(){
            axios({
                url: `http://localhost:3000/questions/up/${this.$route.params.id}`,
                method: 'patch',
                headers:{
                    token : localStorage.getItem('token')
                }
                })
                .then(() =>{
                    this.fetchQuestion()
                    this.fetchAnswer()
                })
        },
         downQuestion(){
            axios({
                url: `http://localhost:3000/questions/down/${this.$route.params.id}`,
                method: 'patch',
                headers:{
                    token : localStorage.getItem('token')
                }
                })
                .then(() =>{
                    this.fetchQuestion()
                    this.fetchAnswer()
                })
        },
upAnswer(id){
            axios({
            url: `http://localhost:3000/answers/up/${id}`,
            method: 'patch',
            headers:{
                token : localStorage.getItem('token')
            }
            })
            .then(() =>{
                this.fetchQuestion()
                this.fetchAnswer()
            })
            .catch(err=>{
                console.log(err)
            })
        },
        downAnswer(id){
            axios({
            url: `http://localhost:3000/answers/down/${id}`,
            method: 'patch',
            headers:{
                token : localStorage.getItem('token')
            }
            })
            .then(() =>{
                this.fetchQuestion()
                this.fetchAnswer()
            })
            .catch(err=>{
                console.log(err)
            })
        },        
        fetchQuestion(){
            axios({
                url: `http://localhost:3000/questions/${this.$route.params.id}`,
                method: 'get',
                })
                .then(({data})=>{
                    this.questions = data
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        fetchAnswer(){
            axios({
                url: `http://localhost:3000/answers/${this.$route.params.id}`,
                method: 'get'
                })
                .then(({data})=>{
                    this.answers = data
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        save(){
            console.log(this.myAnswer, 'ikiiiiiiiiii')
              axios({
            url: `http://localhost:3000/answers`,
            method: 'post',
            headers:{
                token : localStorage.getItem('token')
            },
            data:{
                desc: this.myAnswer,
                idQuestion: this.questions._id
            }
            })
            .then(()=>{
                this.myAnswer = ''
                this.fetchAnswer()
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    created(){
       this.fetchQuestion()
       this.fetchAnswer()
    }

}
</script>

<style scoped>

.main-bar {
  min-height: 40rem;
}
.headline {
  font-weight: 400;
  font-size: 2.07692308rem;
}
.btn-primary {
  background-color: #0095ff;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.4);
}
.btn {
  padding: .6rem;
  border: 1pz solid transparent;
}
.tags {
  margin-top: .2rem;
}
.tags .badge {
  margin-left: .5rem;
}
.badge {
  padding: .4em .5em;
}
.badge-secondary {
  color: #39739d;
  background-color: #e1ecf4;
  border-color: #e1ecf4;
}
.voting-container {
    position: relative;
    min-height: 150px;
}
.voting-container .vote-up i {
    position: absolute;
    font-size: 64px;
    color: #848d95;
    top: 0;
    left: 55px;
}
.vote-count .total {
    position: absolute;
    font-size: 32px;
    color: #6a737c;
    top: 50px;
    left: 55px;
}
.voting-container .vote-down i {
    position: absolute;
    font-size: 64px;
    color: #848d95;
    bottom: 5px;
    left: 55px;
}
.answers-headers .answer-count {
    font-weight: 500;
    color: #3c4146;
    font-size: 18px;
    margin-bottom: 0;
}
.by-user .date {
  margin-bottom: 0;
  margin-top: 1rem;
  font-size: 12px;
  color: #9199a1;
}
.by-user .name {
  color: #0077cc;
}
</style>
