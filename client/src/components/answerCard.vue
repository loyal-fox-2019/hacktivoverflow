<template>
  <div class="body mt-5 p-5 text-left">
            <div class="row w-100">
                <div class="col-6">
                    <p class="pl-2 author">{{answer.author}} | {{answer.updatedAt | moment('from', 'now')}} </p>
                    <div class="row pl-4">
                        <p v-html="answer.content"></p>
                    </div>
                </div>
                <div class="col-6 text-right">
                    <h2><i @click="upvote(answer._id)" class="fa fa-arrow-circle-o-up" aria-hidden="true"></i></h2>
                    <h2 class="upvotes mr-1"> {{votes}}</h2>
                    <h2><i @click="downvote(answer._id)" class="fa fa-arrow-circle-o-down" aria-hidden="true"></i></h2>
                    <button v-if="edit" @click="showEditAnswer(answer)" type="submit" class="btn btn-dark mt-3 mr-3">Edit</button>
                </div>
            </div>
    </div>
</template>

<script>
export default {
    props : {
        answer : Object
    },
    data(){
        return {
            edit : false,
            editAnswer : ''
        }
    },
    computed : {
        votes(){
            return this.$props.answer.upvotes.length - this.$props.answer.downvotes.    length 
        }
    },
    methods : {
        showEditAnswer(answer){
            this.$store.commit('SET_ANSWER_EDIT', answer.content)
            this.$store.commit('SET_ANSWER_EDIT_ID', answer._id)
            this.$store.commit('SET_IS_EDITING_ANSWER', true)
        },
        upvote(id){
            this.$store.dispatch('upvoteAns', {id : id, questionId : this.$route.params._id})
        },
        downvote(id){
            this.$store.dispatch('downvoteAns', id)
        },
    },
    created(){
        if(this.$props.answer.author === localStorage.user){
            this.edit='true'
        } else {
            this.edit = false
        }
    }
}
</script>

<style>
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
</style>