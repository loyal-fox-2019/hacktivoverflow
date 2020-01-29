<template>
    <div class="view-qn-answer">
        <div class="view-ans-content ans-content">
            <div class="ans-votes">
                <div>
                    <button class="btn btn-outline-secondary" :class="answerVote==1 ? 'voted' : ''" @click="voteAns(1)">
                        <span class="fas fa-caret-up"></span>
                    </button>
                </div>
                <div style="margin:auto">
                    <h5>{{answer.upvotes.length - answer.downvotes.length}}</h5>
                </div>
                <div>
                    <button class="btn btn-outline-secondary" :class="answerVote==-1 ? 'voted' : ''" @click="voteAns(-1)">
                        <span class="fas fa-caret-down"></span>
                    </button>
                </div>
            </div>
            <div style="width:100%">
                <h3>{{answer.title}}</h3>
                <div v-html="answer.description"></div>
                <div style="float:right">Answer by {{answer.user.username}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import axiosReq from "../config/axios";
    export default {
        name: "answerCard",
        props: {
            answer: Object
        },
        
        methods: {
            voteAns(v) {
                axiosReq({
                    
                })
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
    padding: 15px
}
</style>