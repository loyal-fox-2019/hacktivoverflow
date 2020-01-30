<template>
    <div class="w-100 mb-2 border p-2">
        <b-row v-if="!isEdit">
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
            <b-col cols="11">
                <b-row class="text-left mt-2">
                    <h5>{{answerData.title}}</h5>
                    <b-col class="text-right mr-3" v-if="($store.state.userId === answerData.userId._id) && $store.state.isLogin">
                        <i class="fas fa-lg fa-edit" @click="edit"></i>
                    </b-col>
                </b-row>
                <b-row class="text-left mr-auto content">
                    <p v-html="answerData.description"></p>
                </b-row>
                <b-row class="date-detail">
                    <p>Answered {{date}} by {{answerData.userId.name}}</p>
                </b-row>
            </b-col>
        </b-row>
        <b-row v-if="isEdit">
            <b-row class="mx-4 w-100">
                <h4>Title:</h4>
                <b-form-input
                    v-model="answerData.title"
                    required
                    placeholder="Enter question's title"
                ></b-form-input>
            </b-row>
            <b-row class="mx-4 mt-3 mb-5">
                <h4>Details:</h4>
                <VueEditor v-model="answerData.description"></VueEditor>
            </b-row>
            <b-row class="mx-auto mt-5 mb-4">
                <b-button class="mx-2" variant="danger" @click="cancelEdit">Cancel</b-button>
                <b-button class="mx-2" variant="primary" @click="editAnswer">Edit Answer</b-button>
            </b-row>
        </b-row>
    </div>
</template>
<script>
import { VueEditor } from "vue2-editor"
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
    name: "answer-list",
    data(){
        return{
            isEdit: false
        }
    },
    props: {
        answerData: Object
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
            for(let obj of this.answerData.votes){
                if(String(obj.userId) === String(this.$store.state.userId)){
                    curUserVote = obj
                    break
                }
            }
            return curUserVote
        },
        date(){
            let rawDate = new Date(this.answerData.created_at)
            return rawDate.toDateString()
        },
        votes(){
            let totalVote = 0
            for(let vote of this.answerData.votes){
                totalVote += vote.value
            }
            return totalVote
        }
    },
    methods: {
        vote(value){
            axios({
                method: 'patch',
                url: `http://localhost:3000/answer/editVote/${this.answerData._id}`,
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
        cancelEdit(){
            this.isEdit = false
        },
        edit(){
            this.isEdit = true
        },
        editAnswer(){
            axios({
                method: 'patch',
                url: `http://localhost:3000/answer/editAnswer/${this.answerData._id}`,
                headers: {
                token: localStorage.getItem('token')
                },
                data: {
                    title: this.answerData.title,
                    description: this.answerData.description
                }
            })
            .then(()=>{
                Swal.fire({
                    icon: 'success',
                    title: 'Answer edited!',
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
        }
    },
    created(){
        this.$store.dispatch('viewDetail', this.$route.params.questionId)
        this.$store.dispatch('fetchAnswers', this.$route.params.questionId)
        this.isEdit = false
    },
    components: {
        VueEditor
    }
}
</script>

<style>
.content{
    font-size: 14px;
}
.number{
  font-size: 21px;
  font-weight: bold;
}
.num-text{
  font-size: 12px;
}
.date-detail{
    font-size: 12px;
}
.fa-edit {
    color: rgb(219, 58, 58);
    filter: opacity(85%);
}
.fa-edit:hover {
    cursor: pointer;
    filter: opacity(100%);
}
.fa-edit:active {
    cursor: pointer;
    filter: opacity(85%);
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