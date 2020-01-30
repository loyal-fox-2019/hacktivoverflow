<template>
    <div class="view-qn-answer">
        <div class="view-ans-content ans-content">
            <div class="ans-votes">
                <div>
                    <button class="btn btn-outline-secondary" :class="answerVote==1 ? 'voted' : ''" @click="voteAns(1)">
                        <span class="fas fa-caret-up"></span>
                    </button>
                </div>
                <div>
                    <h5>{{answer.upvotes.length - answer.downvotes.length}}</h5>
                </div>
                <div>
                    <button class="btn btn-outline-secondary" :class="answerVote==-1 ? 'voted' : ''" @click.prevent="voteAns(-1)">
                        <span class="fas fa-caret-down"></span>
                    </button>
                </div>
            </div>
            <div style="width:100%">
                <h3>{{answer.title}}</h3>
                <div v-html="answer.description"></div>
                <div style="float:right">
                    Answer by {{answer.user.username}}
                    <div style="font-size:10px">
                        <i>
                            Submitted {{(new Date(answer.createdAt)).toDateString()}}<br>
                            Last updated {{(new Date(answer.updatedAt)).toDateString()}}
                        </i>
                    </div>
                    <div v-if="answer.user.username==this.$cookies.get('username')">
                        <button class="btn btn-warning btn-manage" @click="editAnswerForm">Edit</button>
                    </div>
                </div>
                
            </div>
        </div>

        <b-modal :id="'vote-ans-fail-modal'+answer._id" hide-footer hide-header>            
            <div class="d-block text-center">
            {{modalText}}
            </div>
        </b-modal>
    </div>
</template>

<script>
import axiosReq from "../config/axios";
    export default {
        name: "answerCard",
        props: {
            answer: Object
        },
        data() {
            return {
                answerVote: 0,
                modalText: ""
            }
        },
        created(){
            this.checkAnswerVote();

        },
        methods: {
            voteAns(v) {
                axiosReq({
                    url: `/answers/${this.answer._id}/vote`,
                    method: "post",
                    headers: {
                        token: this.$cookies.get('token')
                    },
                    data: {
                        vote: v // 1 or -1
                    }
                })
                .then(() => {
                    this.$store.dispatch('getOneQuestion',this.$route.params.id);
                    this.checkAnswerVote();
                })
                .catch((err) => {
                    if(err.response.status==401)
                    {
                        this.modalText = "Please login first."                        
                    }
                    else
                    {
                        this.modalText = "You cannot vote for your own answer."
                    }
                    this.$bvModal.show('vote-ans-fail-modal'+this.answer._id)
                })
            },
            checkAnswerVote() {
                axiosReq({
                    url: `/answers/${this.answer._id}/vote`,
                    method: "get",
                    headers: {
                        token: this.$cookies.get('token')
                    }
                })
                .then(({data}) => {
                    this.answerVote = data.vote
                })
                
            },
            editAnswerForm() {
                this.$router.push({path: `/editanswer/${this.answer._id}`})
            }
        }
    }
</script>

<style scoped>
.view-qn-answer {  
    width: 100vw!important; 
}
.view-ans-content {
    width: 50vw;
    text-align: left;
    margin-left: auto;
    margin-right: auto;
    
}
.ans-content {    
    border: 1px solid black;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    padding: 20px;
    display: flex;
}
.ans-votes {
    display: flex;
    flex-direction: column;
    padding: 15px;
    text-align: center;
}
.voted {
    background-color: darkorange
}

.btn-manage {
    padding: 5px;
    margin: 3px
}
</style>