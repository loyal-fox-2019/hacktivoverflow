<template>
  <b-row class="mt-3">
    <b-col></b-col>
    <b-col cols="7">
      <!-- question detail -->
      <div v-if="!isEdit">
        <b-row class="justify-content-between">
            <div>
                <h3>{{selectedQuestion.title}}</h3>
            </div>
            <div v-if="($store.state.userId === selectedQuestion.userId._id) && $store.state.isLogin">
                <b-button class="mr-2" size="sm" variant="primary" @click="edit" v-if="!isEdit">Edit</b-button>
                <b-button size="sm" variant="danger" @click="deleteQuestion">Delete</b-button>
            </div>
        </b-row>
        <b-row class="date-detail">
            <p>Posted: {{date}}</p>
        </b-row>
        <b-row class="date-detail border-bottom">
            <p>By: {{selectedQuestion.userId.name}}</p>
        </b-row>
        <b-row class="mt-2 border-bottom">
            <b-col cols="1">
                <b-row>
                    <b-col class="number">
                        <i class="fas fa-2x fa-caret-up no-vote" @click="vote(1)" v-if="(voteStatus === 'noVote' || voteStatus === 'downVote') && $store.state.isLogin"></i>
                        <i class="fas fa-2x fa-caret-up voted" @click="vote(0)" v-if="(voteStatus === 'upVote') && $store.state.isLogin"></i>
                        <i class="fas fa-2x fa-caret-up no-login" v-if="!$store.state.isLogin"></i>
                    </b-col>
                    <b-col class="number">
                        {{votes}}
                    </b-col>
                    <b-col class="number">
                        <i class="fas fa-2x fa-caret-down no-vote" @click="vote(-1)" v-if="(voteStatus === 'noVote' || voteStatus === 'upVote') && $store.state.isLogin"></i>
                        <i class="fas fa-2x fa-caret-down voted" @click="vote(0)" v-if="(voteStatus === 'downVote') && $store.state.isLogin"></i>
                        <i class="fas fa-2x fa-caret-down no-login" v-if="!$store.state.isLogin"></i>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="11" class="text-left">
                <p v-html="selectedQuestion.description" class="mt-2"></p>
            </b-col>
        </b-row>
      </div>
      <!-- form edit -->
      <div v-if="isEdit">
        <b-row>
            <b-row class="mx-auto w-100">
                <h4>Title:</h4>
                <b-form-input
                    v-model="selectedQuestion.title"
                    required
                    placeholder="Enter question's title"
                ></b-form-input>
            </b-row>
            <b-row class="mx-auto mt-3 mb-3">
                <h4>Details:</h4>
                <VueEditor id="input-description" v-model="selectedQuestion.description"></VueEditor>
            </b-row>
            <b-row class="mx-auto mt-5 mb-4">
                <b-button class="mx-2" variant="danger" @click="cancelEdit">Cancel</b-button>
                <b-button class="mx-2" variant="primary" @click="editPost">Edit Post</b-button>
            </b-row>
        </b-row>
      </div>
      <!-- answer list -->
      <b-row class="mt-3">
          <h5>Answers:</h5>
      </b-row>
      <b-row class="">
          <AnswerList v-for="answer in selectedAnswers" :key="answer._id" :answerData="answer"></AnswerList>
      </b-row>
      <b-row class="mt-2 pt-3 border-top">
            <h4>Post Answer</h4>
          <b-col class="text-right">
            <b-button v-if="$store.state.isLogin" variant="primary" @click="submitAnswer">Submit Answer</b-button>
            <b-button v-if="!$store.state.isLogin" disabled variant="primary" style="pointer-events: none;">Log in first to answer</b-button>
          </b-col>
      </b-row>
      <b-row class="mt-2">
          <h5>Title:</h5>
          <b-form-input
            id="input-title"
            v-model="answerTitle"
            required
          ></b-form-input>
      </b-row>
      <b-row class="mt-3">
          <h5>Details:</h5>
      </b-row>
      <b-row class="mb-5">
          <VueEditor class="mb-3" v-model="answerDescription"></VueEditor>
      </b-row>
    </b-col>
    <b-col></b-col>
  </b-row>
</template>

<script>
import { VueEditor } from "vue2-editor";
import AnswerList from '../components/AnswerList'
import Swal from 'sweetalert2';
import axios from 'axios'
export default {
    name: 'detail-page',
    data(){
        return{
            answerTitle: '',
            answerDescription: '',
            isEdit: false
        }
    },
    computed: {
        voteStatus(){
            if(this.isVoted.value === 1){
                return 'upVote'
            }
            else if(this.isVoted.value === -1){
                return 'downVote'
            }
            else {
                return 'noVote'
            }
        },
        isVoted(){
            let curUserVote = {}
            for(let obj of this.selectedQuestion.votes){
                if(String(obj.userId) === String(this.$store.state.userId)){
                    curUserVote = obj
                    break
                }
            }
            return curUserVote
        },
        selectedQuestion(){
            return this.$store.state.selectedQuestion
        },
        selectedAnswers(){
            return this.$store.state.selectedAnswers
        },
        date(){
            let rawDate = new Date(this.selectedQuestion.created_at)
            return rawDate.toDateString()
        },
        votes(){
            let totalVote = 0
            for(let vote of this.selectedQuestion.votes){
                totalVote += vote.value
            }
            return totalVote
        }
    },
    methods: {
        vote(value){
            axios({
                method: 'patch',
                url: `http://54.169.105.61:3000/question/editVote/${this.$route.params.questionId}`,
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    value
                }
            })
            .then(()=>{
                this.$store.dispatch('viewDetail', this.$route.params.questionId)
                this.$store.dispatch('fetchAnswers', this.$route.params.questionId)
            })
            .catch(err=>{
                Swal.fire({
                    icon: 'error',
                    text: err.response.data.message
                })
            })
        },
        editPost(){
            axios({
                method: 'patch',
                url: `http://54.169.105.61:3000/question/editPost/${this.$route.params.questionId}`,
                headers: {
                token: localStorage.getItem('token')
                },
                data: {
                    title: this.selectedQuestion.title,
                    description: this.selectedQuestion.description
                }
            })
            .then(()=>{
                Swal.fire({
                    icon: 'success',
                    title: 'Post edited!',
                    timer: 1500
                })
                this.isEdit = false
            })
            .catch(err=>{
                let errMessage = ''
                for(let message of err.response.data.errors){
                    errMessage += `${message}<br>`
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    html: errMessage
                })
            })
        },
        cancelEdit(){
            this.isEdit = false
        },
        edit(){
            this.isEdit = true
        },
        submitAnswer(){
            let payload = {
                title: this.answerTitle,
                description: this.answerDescription,
                questionId: this.$route.params.questionId
            }
            this.$store.dispatch('submitAnswer', payload)
            this.answerTitle = ''
            this.answerDescription = ''
        },
        deleteQuestion(){
            Swal.fire({
                title: 'Deleting Post',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            })
            .then(confirmed=>{ 
                if(confirmed.value) {
                    this.$store.dispatch('deleteQuestion', this.$route.params.questionId)
                }
                else if(confirmed.dismiss == 'cancel'){
                    Swal.close()
                }
            })
        }
    },
    components: {
        VueEditor,
        AnswerList
    },
    created(){
        this.$store.dispatch('viewDetail', this.$route.params.questionId)
        this.$store.dispatch('fetchAnswers', this.$route.params.questionId)
        this.isEdit = false
    }
}
</script>

<style scoped>
.date-detail{
    font-size: 12px;
}
.number{
  font-size: 21px;
  font-weight: bold;
}
.no-vote:hover{
    color: orange;
    cursor: pointer;
}
.no-vote:active{
    cursor: pointer;
    color: #2c3e50;
}
.voted{
    color: orange;
}
.voted:hover{
    cursor: pointer;
    color: #2c3e50;
}
.voted:active{
    cursor: pointer;
    color: orange;
}
.no-login{
    filter: opacity(50%);
    cursor: not-allowed;
}
</style>