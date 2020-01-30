<template>
  <div class="container" >
      <h3>All Questions</h3>
      <div class="row">
          <b-card no-body class="col-md-12">
            <b-card-header header-tag="nav">
              <b-nav card-header tabs>
                <b-nav-item v-on:click="getAll">All</b-nav-item>
                <b-navbar-nav class="ml-auto">
                  <!-- <b-nav-item>Unanswered</b-nav-item> -->
                  <b-button variant="primary" v-b-modal.modal-xl.modal-center v-on:click="$bvModal.show('newquestion')">Ask a Question</b-button>
                  <b-modal size='xl' hide-footer :id="'newquestion'" centered title="Post A Question">
                    <form enctype="multipart/form-data">
                      <p>Title</p>
                      <input type="text" v-model="title">
                      <p>Content</p>
                      <div class="fr-view" >
                          <wysiwyg v-model="description"/>
                      </div>
                      <p><input type="file" name="file" v-on:change="uploadPicture"/></p>
                    </form>
                    <b-button variant="dark" v-on:click="createQuestion" @click="$bvModal.hide('newquestion')">Submit</b-button>
                </b-modal>
                </b-navbar-nav>
              </b-nav>
            </b-card-header>
            <div v-for="item in filteredQuestions" :key="item._id" style="margin-top: 10px;padding-top: 10px;">
              <b-card no-body class="overflow-hidden" style="max-width: 100%;" align="left">
                <b-row no-gutters>
                  <b-col md="2" style="text-align: center;padding-top: 10px;">
                    <h6>upvotes</h6>
                    <h6>{{ item.upvotes.length }}</h6>
                    <h6>downvotes</h6>
                    <h6>{{ item.downvotes.length }}</h6>
                  </b-col>
                    <b-col md="6">
                      <b-card-body :title="'Q: '+item.title" v-on:click="detail(item._id)">
                        <b-card-text>
                          <p>Answer: {{ item.description }}</p>
                          <p>Asked by: {{ item.user.username }}</p>
                        </b-card-text>
                      </b-card-body>
                    </b-col>
                    <b-col md="4" >
                      <img :src="item.picture" alt="" style="max-width: 100%; max-height: 100%;padding-right: 10px;">
                    </b-col>
                </b-row>
              </b-card>
            </div>
          </b-card>
      </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data(){
    return{
      title:'',
      description:'',
      picture: ''
    }
  },
  components: {
  },
  methods:{
    uploadPicture(){
      this.picture = event.target.files[0]
    },
    getAll(){
      this.$store.dispatch('getAllQuestions')
    },
    createQuestion(){
      const formData = new FormData()
      formData.append('title', this.title)
      formData.append('description', this.description)
      formData.append('picture', this.picture)
      this.$store.dispatch('createQuestion',formData)
    },
    detail(id){
      this.$router.push(`/detail/${id}`)
    }
  },
  computed:{
    filteredQuestions(){
      return this.$store.state.filtered
    }
  },
  created(){
    this.$store.dispatch('getAllQuestions')
  },
  watch:{
    $route: function(){
      this.$store.dispatch('getAllQuestions')
    }
  }
}
</script>

<style scoped>

.but{
  background-color: #93a368;
}

</style>