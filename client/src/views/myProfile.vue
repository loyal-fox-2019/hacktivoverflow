<template>
  <div class="container">
      <div class="row justify-content-center">
      <div v-if="isLogin" class="col-12">
        <b-card no-body>
          <b-tabs card>
            <b-tab title="My Questions" active>
              <div v-for="question in allQuestion" :key="question.id">
                <myQuestion :data="question" @fetch="fetchNew"/>
                <hr>
              </div>
            </b-tab>
            <b-tab title="My Answers">
              <div v-for="answer in allAnswer" :key="answer.id">
                <myAnswer :data="answer" @fetch="fetchNew"/>
                <hr>
              </div>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
      <div class="col-6" v-if="!isLogin">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFvjEwU4oAcl7ZhxkOr47gVJmXOPQwsAuohSnCnPNixT6iC4YNJQ&s">
          <h1> You have to Login !</h1>
      </div>
      </div>
  </div>
</template>

<script>
import myQuestion from '../components/myQuestion'
import myAnswer from '../components/myAnswer'
import {mapGetters,mapActions} from 'vuex'

export default {
  name:'myProfile',
  components:{
    myQuestion,
    myAnswer
  },
  computed:{
    ...mapGetters({
        allAnswer: 'myAnswer/getmyAnswer',
        allQuestion: 'myQuestion/getmyQuestion',
    }),
    isLogin(){
      return this.$store.state.isLogin
    },    
  },
  methods:{
    ...mapActions({
      fetchAnswer: 'myAnswer/fetchAction',
      fetchAction: 'myQuestion/fetchAction',
    }),
    fetchNew(){
      this.fetchAnswer()
      this.fetchAction()
    },
  },
  created(){
    if(localStorage.getItem('token')){
      this.fetchAnswer()
       this.fetchAction()
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>