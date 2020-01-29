<template>
  <div class="container" >
      <h3>All Questions</h3>
      <div class="row">
          <b-card no-body class="col-md-12">
            <b-card-header header-tag="nav">
              <b-nav card-header tabs>
                <b-nav-item>Popular</b-nav-item>
                <b-nav-item>Answered</b-nav-item>
                <b-nav-item>Unanswered</b-nav-item>
                <b-navbar-nav class="ml-auto">
                  <!-- <b-nav-item>Unanswered</b-nav-item> -->
                  <b-button variant="primary" v-b-modal.modal-xl.modal-center v-on:click="$bvModal.show('newquestion')">Ask a Question</b-button>
                  <b-modal size='xl' hide-footer :id="'newquestion'" centered title="Post A Question">
                    <p>Title</p>
                    <input type="text" v-model="title">
                    <p>Content</p>
                    <div class="fr-view" >
                        <wysiwyg v-model="description"/>
                    </div>
                    <b-button variant="dark" v-on:click="createQuestion" @click="$bvModal.hide('newquestion')">Submit</b-button>
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
  </div>
</template>

<script>
export default {
  name: 'home',
  data(){
    return{
      title:'',
      description:''
    }
  },
  components: {
  },
  methods:{
    createQuestion(){
      let payload={
        title: this.title,
        description: this.description
      }
      this.$store.dispatch('createQuestion',payload)
    },
    detail(id){
      this.$router.push(`/detail/${id}`)
    }
  },
  computed:{
    allquestions(){
      return this.$store.state.allQuestions
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