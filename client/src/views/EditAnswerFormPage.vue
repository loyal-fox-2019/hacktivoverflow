<template>
    <div class="view-qn">
        <div class="view-qn-content qn-content">
            <div class="qn-votes">
                <div>
                    <button class="btn btn-outline-secondary" :class="questionVote==1 ? 'voted' : ''" disabled>
                        <span class="fas fa-caret-up"></span>
                    </button>
                </div>
                <div>
                    <h5>{{this.$store.state.currentQuestion.upvotes.length - this.$store.state.currentQuestion.downvotes.length}}</h5>
                </div>
                <div>
                    <button class="btn btn-outline-secondary" :class="questionVote==-1 ? 'voted' : ''" disabled>
                        <span class="fas fa-caret-down"></span>
                    </button>
                </div>
            </div>
            <div style="width:100%">
                <h3>{{this.$store.state.currentQuestion.title}}</h3>
                <div v-html="question.description"></div>
                <div>
                    <button class="btn btn-outline-secondary tag-buttons" v-for="tag in question.tags" :key="tag">{{tag}}</button>
                </div>
                <div style="float:right">
                    Asked by {{question.user.username}}
                    
                </div>
            </div>
            
        </div>
        
        <form id="ans-form" @submit.prevent="updateAnswer">
        <button class="btn btn-primary" id="ans-qn-btn" type="submit">Save changes</button>
            <h3>Update answer</h3>
            <div class="form-group">
                Title*
                <input type="text" class="form-control" v-model="ans_title" required>
            </div>
            <!-- <div class="form-group">
                Image
                <input type="file" class="form-control" name="file" ref="file" @change="handleFile">
            </div> -->
            <div class="form-group">
                Description*
                <!-- <textarea class="form-control" v-model="description" required></textarea> -->

                <quill-editor v-model="ans_description" ref="myQuillEditor" :options="editorOption" required>
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
    export default {
        name: "editanswer",
        created() {
            axiosReq({
                url: `/answers/${this.$route.params.id}`,
                method: 'get'
            })
            .then(({data}) => {
                this.question = data.question;
                this.ans_title = data.title;
                this.ans_description = data.description;
            })
        },
        data(){
            return {
                questionVote: 0,
                question: null,
                modalText: '',
                ans_title: '',
                ans_description: '',
                file: '',
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
            updateAnswer() {
                axiosReq({
                    url: `/answers/${this.$route.params.id}`,
                    method: "patch",
                    headers: {
                        token: this.$cookies.get('token')
                    },
                    data: {
                        title: this.ans_title,
                        description: this.ans_description,
                        question: this.question._id
                    }
                })
                .then(() => {
                    this.$store.dispatch('getAllQuestions')
                    this.$store.dispatch('getOneQuestion',this.question._id)
                    this.$router.push(`/question/${this.question._id}`)
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
            }
        },
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