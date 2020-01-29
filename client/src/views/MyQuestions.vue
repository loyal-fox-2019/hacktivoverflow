<template>

<div class="container">
    <b-card no-body class="col-md-12" style="margin-top: 25px;">
        <b-card-header header-tag="nav">
            <b-nav card-header tabs>
            <b-nav-item>Answered</b-nav-item>
            <b-nav-item>Unanswered</b-nav-item>
            <b-navbar-nav class="ml-auto">
                <b-button variant="primary" v-b-modal.modal-center v-on:click="$bvModal.show('newquestionuser')">Ask a Question</b-button>
                    <b-modal hide-footer :id="'newquestionuser'" centered title="Post A Question">
                    <p>Title</p>
                    <input type="text" v-model="title">
                    <p>Content</p>
                    <div class="fr-view" >
                        <wysiwyg v-model="description"/>
                    </div>
                    <b-button variant="dark" v-on:click="createQuestion" @click="$bvModal.hide('newquestionuser')">Submit</b-button>
                </b-modal>
            </b-navbar-nav>
            </b-nav>
        </b-card-header>
        <div v-for="item in allquestions" :key="item._id" style="margin-top: 10px;padding-top: 10px;">
            <b-card no-body class="overflow-hidden" style="max-width: 100%;" align="left">
            <b-row no-gutters>
                <b-col md="2" style="text-align: center;padding-top: 10px;">
                <h6>upvotes</h6>
                <h6>{{ item.upvotes.length }}</h6>
                <h6>downvotes</h6>
                <h6>{{ item.downvotes.length }}</h6>
                </b-col>
                <b-col md="10">
                    <b-card-body :title="item.title" v-on:click="detail(item._id)">
                    <b-card-text>
                        <p>{{ item.description }}</p>
                        <p>Asked by: {{ item.user.username }}</p>
                    </b-card-text>
                    </b-card-body>
                </b-col>
            </b-row>
            </b-card>
        </div>
    </b-card>
</div>
  
</template>

<script>
export default {
    name: 'myquestions',
    data(){
        return{
            title:'',
            description:''
        }
    },
    computed:{
        allquestions(){
            return this.$store.state.userquestions
        }
    },
    created(){
        if(!this.allquestions){
            return [{}]
        }
    },
    mounted(){
        this.$store.dispatch('getUserQuestions')
    },
    methods:{
        detail(id){
            this.$router.push(`/detail/${id}`)
        },
        createQuestion(){
            let payload = {
                title: this.title,
                description: this.description
            }
            this.$store.dispatch('createQuestion', payload)
        }
    }
}
</script>

<style>

</style>