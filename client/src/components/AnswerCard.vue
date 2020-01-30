<template>
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
</template>

<script>
import axios from 'axios'

export default {
    name: 'answerCard',
    props:['answer'],
    methods:{
        upAnswer(id){
            axios({
            url: `http://18.136.105.19:3000/answers/up/${id}`,
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
            url: `http://18.136.105.19:3000/answers/down/${id}`,
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
        fetchAnswer(){
               axios({
            url: `http://18.136.105.19:3000/answers/${this.$route.params.id}`,
            method: 'get'
            })
            .then(({data})=>{
                this.$emit('setAnswer', data)
            })
            .catch(err=>{
                console.log(err)
            })
        },    
        fetchQuestion(){
             axios({
            url: `http://18.136.105.19:3000/questions/${this.$route.params.id}`,
            method: 'get',
            })
            .then(({data})=>{
                this.$emit('setQuestion', data)
            })
            .catch(err=>{
                console.log(err)
            })
        },            
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>