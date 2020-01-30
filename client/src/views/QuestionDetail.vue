<template>
  <div class="container">
    <b-card no-body class="overflow-hidden">
        <b-row no-gutters>
        <b-col md="2" class="flex-column">
            <div class="col-md mt-4">
                <i class="fas fa-chevron-up fa-2x upvote" v-on:click="upvoteQuestion(question._id)"></i>
            </div>
            <div class="col-md">
                {{ question.upvotes.length - question.downvotes.length }}
            </div>
            <div class="col-md">
                <i class="fas fa-chevron-down fa-2x downvote" v-on:click="downvoteQuestion(question._id)"></i>
            </div> 
        </b-col>
        <b-col md="10" class="text-left  mt-3">
            <b-card-body :title="question.title">
            <b-card-text>
                {{ question.description }}
            </b-card-text>
            <div class="text-right">
                <div v-if="userEmail==question.user.email">
                    <b-button variant="danger" v-on:click="deleteQuestion(question._id)">Delete</b-button>
                    <b-button variant="success" v-b-modal.modal-xl.modal-center v-on:click="$bvModal.show('update'+question._id)">Edit</b-button>
                </div>
                    <b-modal size="xl" hide-footer :id="'update'+question._id" centered title="Update Your Question">
                    <p>Title</p>
                    <input type="text" v-model="title" :placeholder="question.title">
                    <p>Content</p>
                    <div class="fr-view" >
                        <wysiwyg v-model="description" :placeholder="question.description"/>
                    </div>
                    <b-button variant="dark" v-on:click="editQuestion(question._id)" @click="$bvModal.hide('update'+question._id)">Submit</b-button>
                </b-modal>
            </div>
            </b-card-body>
        </b-col>
        </b-row>
    </b-card>
    <!-- <div class="text-left"> -->
        <div class="row justify-content-center" style="margin-top: 15px; margin-bottom: 15px;">
            <h3 v-if="answers.length>0" class="col-md-2">Answers: </h3>
            <b-button variant="dark" class="col-md-3" v-b-modal.modal-xl.modal-center v-on:click="$bvModal.show(question._id)">Answer Question</b-button>
                <b-modal size="xl" hide-footer :id="question._id" centered title="Answer">
                    <p>Title</p>
                    <input type="text" v-model="title">
                    <p>Content</p>
                    <div class="fr-view" >
                        <wysiwyg v-model="description"/>
                    </div>
                    <b-button variant="dark" v-on:click="createAnswer(question._id)" @click="$bvModal.hide(question._id)">Submit</b-button>
                </b-modal>
        </div>
        <div v-for="item in answers" :key="item._id" class="text-left">
            <b-card no-body class="overflow-hidden">
                <b-row no-gutters >
                <b-col md="2" class="flex-column">
                    <div class="col-md  mt-4 ml-5">
                        <i class="fas fa-chevron-up fa-2x upvote" v-on:click="upvoteAnswer(item._id)"></i>
                    </div>
                    <div class="col-md-1 ml-5" style="padding-left: 25px;">
                        {{ item.upvotes.length - item.downvotes.length }}
                    </div>
                    <div class="col-md ml-5">
                        <i class="fas fa-chevron-down fa-2x downvote" v-on:click="downvoteAnswer(item._id)"></i>
                    </div> 
                </b-col>
                <b-col md="8" class="mt-4">
                    <b-card-body :title="item.title">
                    <b-card-text v-html="item.description">
                    </b-card-text>
                    </b-card-body>
                </b-col>
                </b-row>
                <div class="text-right" v-if="userEmail==item.user.email">
                    <b-button  variant="success" class="col-md-2" v-b-modal.modal-xl.modal-center v-on:click="$bvModal.show('update'+item._id)">Update</b-button>
                    <b-modal size="xl" hide-footer :id="'update'+item._id" centered title="Answer">
                        <p>Title</p>
                        <input type="text" v-model="title">
                        <p>Content</p>
                        <div class="fr-view" >
                            <wysiwyg v-model="description"/>
                        </div>
                        <b-button variant="dark" v-on:click="updateAnswer(item._id)" @click="$bvModal.hide('update'+item._id)">Submit</b-button>
                    </b-modal>
                </div>
                <div class="text-right" style="padding-right: 15px;">
                    Answered by: {{ item.user.username }}
                </div>
            </b-card>
        </div>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
    name: 'questiondetail',
    data(){
        return{
            title: '',
            description: ''
        }
    },
    methods:{
        updateAnswer(id){
            let payload={
                title:this.title,
                description:this.description,
                _id: id
            }
            this.$store.dispatch('updateAnswer', payload)
        },
        editQuestion(id){
            let payload={
                title: this.title,
                description: this.description,
                _id: id
            }
            this.$store.dispatch('updateQuestion', payload)
            this.title=''
            this.description=''
        },
        deleteQuestion(id){
            this.$store.dispatch('deleteQuestion', id)
        },
        createAnswer(id){
            let payload={
                title: this.title,
                description: this.description,
                questionId: id
            }
            this.$store.dispatch('createAnswer', payload)
            this.title=''
            this.description=''
        },
        downvoteAnswer(id){
            this.$store.dispatch('downvoteAnswer', id)
        },
        upvoteAnswer(id){
            this.$store.dispatch('upvoteAnswer', id)
        },
        upvoteQuestion(id){
            this.$store.dispatch('upvoteQuestion', id)
        },
        downvoteQuestion(id){
            this.$store.dispatch('downvoteQuestion', id)
        }
    },
    computed:{
        userEmail(){
            return localStorage.getItem('email')
        },
        answers(){
            if(this.$store.state.answers==undefined){
                return [{title: 'loading', description: 'loading', upvotes: 'a', downvotes:'a'}]
            }
            return this.$store.state.answers
        },
        question(){
            if(this.$store.state.question==undefined){
                return {title: 'loading', upvotes:'a', downvotes: 'a', description:'loading'}
            }else{
                return this.$store.state.question
            }
        }
    },
    created(){
    },
    mounted(){
        this.$store.dispatch('getOneQuestion', this.$route.params.id)
        this.$store.dispatch('getAnswers', this.$route.params.id)
    }
}
</script>

<style scoped>

.container{
    height: 100vh;
    margin-top: 5vh;
}
.upvote:hover{
    cursor: pointer;
    color: darkorange
}
.downvote:hover{
    cursor: pointer;
    color: red;
}

</style>