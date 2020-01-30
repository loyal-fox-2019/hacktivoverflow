<template>
  <div class="home">
    <div class="container">
      <!-- row main-bar -->
      <div class="row justify-content-center">
        <div class="col-9">
          <div class="main-bar border-left p-3">
            <div class="grid border-bottom pb-3">
              <span class="headline">Top Questions</span>
              <router-link to="/ask" class="btn btn-primary float-right">Ask Questions</router-link>
            </div>
            <!-- loop question-summary -->
          <div v-for="question in allQuestion" :key="question.id">
            <Card :question="question" />
          </div>
            <!-- end loop question-summary -->            
          </div>
        </div>
        <div class="col-3 mt-5" v-if="isLogin">
            <b-card border-variant="primary" header="Watched Tags" class="text-left">
            <b-card-text><b-form-tags v-model="value" class="mb-2"></b-form-tags></b-card-text>
            <b-col lg="2" class="pb-2" @click.prevent="addTag()"><b-button size="sm">search</b-button></b-col>
            </b-card>    
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapActions,mapMutations } from 'vuex'
import Card from '../components/Card'
import axios from 'axios'

export default {
  name: 'home',
  data(){
    return{
      value: []
    }
  },
  components: {
    Card
  },
    computed:{
    ...mapGetters({
      allQuestion: 'question/getquestion'
    }),
    getTags(){
      return this.value = this.$store.state.userTags
    },
    isLogin(){
      return this.$store.state.isLogin
    },
  },
  methods:{
    ...mapActions({
      fetchAction: 'question/fetchAction'
    }),
    ...mapMutations({
      setQuestion: 'question/fillItem'
    })
    ,
    addNew(){
      this.$router.push('/newQuestion')
    },
    addTag(){
      let tags = this.value.join(',')
      axios({
            url: `http://18.136.105.19:3000/tags`,
            method: 'post',
            headers:{
              token : localStorage.getItem('token')
            },
            data:{
              tags: tags
            }
            })
            .then(()=>{
             return   axios({
                      url: `http://18.136.105.19:3000/tags/search`,
                      method: 'post',
                      headers:{
                        token : localStorage.getItem('token')
                      },
                      data:{
                        tags: tags
                      }
                      })              
            })
            .then(({data})=>{
              this.setQuestion(data)
            })
            .catch(err =>{
              console.log(err)
            })
    }
  },
  created(){
    this.fetchAction()
    this.getTags
  }
}
</script>

<style>
.main-bar {
  min-height: 40rem;
}
.headline {
  font-weight: 400;
  font-size: 2.07692308rem;
}
.btn-primary {
  background-color: #0095ff;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.4);
}
.btn {
  padding: .6rem;
  border: 1pz solid transparent;
}
.question-hyperlink {
  color: #0064bd;
  font-size: 18px;
  max-width: 600px;
}
.question-hyperlink:hover {
  text-decoration: none;
  color: #0095ff;
}
.tags {
  margin-top: .2rem;
}
.tags .badge {
  margin-left: .5rem;
}
.badge {
  padding: .4em .5em;
}
.badge-secondary {
  color: #39739d;
  background-color: #e1ecf4;
  border-color: #e1ecf4;
}
.points {
  text-align: center;
}
.votes {
  height: 65px;
  width: 65px;
  min-width: 65px;
  font-size: 14px;
  color: #848d95;
  padding: 7px 6px;
  text-align: center;
  display: inline-block;
  border: 1px solid #dee2e6;
  border-radius: .25rem;
}
.votes span {
  font-weight: 700;
  font-size: 18px;
}
.by-user .date {
  margin-bottom: 0;
  margin-top: 1rem;
  font-size: 12px;
  color: #9199a1;
}
.by-user .name {
  color: #0077cc;
}
</style>
