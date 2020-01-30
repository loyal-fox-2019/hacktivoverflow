<template>

<div class="container">
    <b-card no-body class="col-md-12" style="margin-top: 25px;">
        <b-card-header header-tag="nav">
            <b-nav card-header tabs>
            <b-navbar-nav class="ml-auto" style="padding-bottom: 10px;">
                <b-button variant="primary" v-b-modal.modal-xl.modal-center v-on:click="$bvModal.show('newquestionuser')">Ask a Question</b-button>
                    <b-modal size='xl' hide-footer :id="'newquestionuser'" centered title="Post A Question">
                    <form enctype="multipart/form-data">
                      <p>Title</p>
                      <input type="text" v-model="title">
                      <p>Content</p>
                      <div class="fr-view" >
                          <wysiwyg v-model="description"/>
                      </div>
                      <p><input type="file" name="file" v-on:change="uploadPicture"/></p>
                    </form>
                    <b-button variant="dark" v-on:click="createQuestion" @click="$bvModal.hide('newquestionuser')">Submit</b-button>
                </b-modal>
            </b-navbar-nav>
            </b-nav>
        </b-card-header>
        <div v-for="item in allquestions" :key="item._id" style="margin-top: 10px;padding-top: 10px;">
            <b-card no-body class="overflow-hidden" style="max-width: 100%; margin-bottom: 10px;" align="left">
            <b-row no-gutters >
                <b-col md="2" class="mt-3" style="text-align: center;padding-top: 10px;">
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
            description:'',
            answered: false,
            unanswered: false,
            picture: ''
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
        uploadPicture(){
            this.picture = event.target.files[0]
        },
        detail(id){
            this.$router.push(`/detail/${id}`)
        },
        createQuestion(){
            console.log('masuk create question 12345')
            const formData = new FormData()
            formData.append('title', this.title)
            formData.append('description', this.description)
            formData.append('picture', this.picture)
            console.log(formData,'=====')
            this.$store.dispatch('createQuestion',formData)
        }
    }
}
</script>

<style>

</style>