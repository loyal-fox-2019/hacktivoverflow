<template>
    <div class="view-qn">
        <div class="view-qn-content qn-content">
            <div class="qn-votes">
                <div>
                    <button class="btn btn-outline-secondary" :class="questionVote==1 ? 'voted' : ''" @click="voteQn(1)">
                        <span class="fas fa-caret-up"></span>
                    </button>
                </div>
                <div>
                    <h5>{{this.$store.state.currentQuestion.upvotes.length - this.$store.state.currentQuestion.downvotes.length}}</h5>
                </div>
                <div>
                    <button class="btn btn-outline-secondary" :class="questionVote==-1 ? 'voted' : ''" @click="voteQn(-1)">
                        <span class="fas fa-caret-down"></span>
                    </button>
                </div>
            </div>
            <div style="width:100%">
                <h3>{{this.$store.state.currentQuestion.title}}</h3>
                <div v-html="this.$store.state.currentQuestion.description"></div>
                <div>
                    <button class="btn btn-outline-secondary tag-buttons" v-for="tag in this.$store.state.currentQuestion.tags" :key="tag">{{tag}}</button>
                </div>
                <div style="float:right">
                    Asked by {{this.$store.state.currentQuestion.user.username}}<br>
                    <div style="font-size:10px">
                        <i>
                            Asked {{(new Date(this.$store.state.currentQuestion.createdAt)).toDateString()}}<br>
                            Last updated {{(new Date(this.$store.state.currentQuestion.updatedAt)).toDateString()}}
                        </i>
                    </div>
                    <div v-if="this.$store.state.currentQuestion.user.username==this.$cookies.get('username')">
                        <button class="btn btn-warning btn-manage" @click="editQuestionForm">Edit</button>

                        <b-button class="btn btn-danger btn-manage" id="popoverdeletebtn" @click="openDeletePopover">Delete</b-button><br>
                        <div v-if="loading">Loading...</div>
                        <b-popover target="popoverdeletebtn" triggers="click" :show="showdeletepopover" placement="right">
                        <template v-slot:title>
                            <b-button @click="closeDeletePopover" class="close" aria-label="Close" ref="button">
                            <span class="d-inline-block" aria-hidden="true">&times;</span>
                            </b-button>
                            Are you sure?
                        </template>

                        <div>
                            Your question could be helpful for other users<br>
                            <b-button @click="closeDeletePopover" size="sm">Cancel</b-button>
                            <b-button @click="deleteQuestion" size="sm" variant="primary">Ok</b-button>
                        </div>
                        </b-popover>
                    </div>
                </div>
            </div>
            
        </div>
        
        <answer-card class="answer-card" v-for="ans in this.$store.state.currentQuestion.answers" :key="ans._id" :answer="ans"></answer-card>

        <form id="ans-form" @submit.prevent="addAnswer">
        <button class="btn btn-primary" id="ans-qn-btn" type="submit">Submit answer</button>
            <h3>Give an answer</h3>
            <div class="form-group">
                Title*
                <input type="text" class="form-control" v-model="title" required>
            </div>
            <!-- <div class="form-group">
                Image
                <input type="file" class="form-control" name="file" ref="file" @change="handleFile">
            </div> -->
            <div class="form-group">
                Description*
                <!-- <textarea class="form-control" v-model="description" required></textarea> -->

                <quill-editor v-model="description" ref="myQuillEditor" :options="editorOption" required>
                </quill-editor>
            </div>
            
            
        </form>

        <b-modal id="vote-qn-fail-modal" hide-footer hide-header>
            
            <div class="d-block text-center">
            {{modalText}}
            </div>
        </b-modal>
    </div>
</template>

<script>
import axiosReq from '../config/axios'
import answerCard from "../components/answerCard.vue";
    export default {
        name: "viewquestion",
        created() {
            this.$store.dispatch('getOneQuestion',this.$route.params.id);
            this.checkQuestionVote();
        },
        data(){
            return {
                title: "",
                description: "",
                showdeletepopover: false,
                loading: false,
                questionVote: 0,
                modalText: '',
                editorOption: {
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{ 'header': 1 }, { 'header': 2 }],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            [{ 'script': 'sub' }, { 'script': 'super' }],
                            [{ 'indent': '-1' }, { 'indent': '+1' }],
                            [{ 'direction': 'rtl' }],
                            [{ 'size': ['small', false, 'large', 'huge'] }],
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            [{ 'font': [] }],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'align': [] }],
                            ['clean']
                        ]
                    }
                }
            }
        },
        methods: {
            addAnswer() {
                axiosReq({
                    url: "/answers",
                    method: "post",
                    headers: {
                        token: this.$cookies.get('token')
                    },
                    data: {
                        title: this.title,
                        description: this.description,
                        question: this.$store.state.currentQuestion._id
                    }
                })
                .then(() => {
                    this.$store.dispatch('getOneQuestion',this.$route.params.id)
                    this.title = "";
                    this.description = ""
                })
            },
            checkQuestionVote() {
                axiosReq({
                    url: `/questions/${this.$route.params.id}/vote`,
                    method: "get",
                    headers: {
                        token: this.$cookies.get('token')
                    }
                })
                .then(({data}) => {
                    this.questionVote = data.vote
                })
            },
            voteQn(v) {
                axiosReq({
                    url: `/questions/${this.$route.params.id}/vote`,
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
                    this.checkQuestionVote();
                })
                .catch((err) => {
                    if(err.response.status==401)
                    {
                        this.modalText = "Please login first."                        
                    }
                    else
                    {
                        this.modalText = "You cannot vote for your own question."
                    }
                    this.$bvModal.show('vote-qn-fail-modal')
                })
            },
            editQuestionForm() {
                this.$router.push({path:`/editquestion/${this.$route.params.id}`})
            },
            closeDeletePopover() {
                this.showdeletepopover = false;
            },
            openDeletePopover() {
                this.showdeletepopover = true;
            },
            deleteQuestion() {
                axiosReq({
                    url: `/questions/${this.$route.params.id}`,
                    method: "delete",
                    headers: {
                        token: this.$cookies.get('token')
                    }
                })
                .then(() => {
                    this.loading = true;
                    this.$store.dispatch('getAllQuestions');
                    setTimeout(() => {
                        this.loading = false;
                        this.$router.push({path: '/'});
                    },2000)
                    
                })
            }
        },
        components: {
            answerCard
        }
    }
</script>

<style scoped>
.view-qn {  
    width: 100vw!important; 
}
.view-qn-content, #ans-form, .answer-card {
    width: 50vw;
    text-align: left;
    margin-left: auto;
    margin-right: auto;
    
}
#ans-form {
    border: 1px solid black;
    padding: 15px;
    border-radius: 10px;
}
.qn-content {
    background-color: lightskyblue;
    margin-top: 10px;
    border-radius: 10px;
    padding: 20px;
    display: flex;
}
.qn-votes {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: center;
    padding: 15px
}

#ans-qn-btn {
    float:right;
    position: sticky;
    top: 65px
}
.tag-buttons {
    font-size: 10px;
    padding: 3px;
    margin: 3px
}

.voted {
    background-color: darkorange
}

.btn-manage {
    padding: 5px;
    margin: 3px
}
</style>