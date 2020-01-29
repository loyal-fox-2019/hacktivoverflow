<template>
    <div style="padding:2%">
        <!-- <h2>@view/thread.vue</h2> -->
        

        <div style=" width:80vw; margin:auto">
            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1 class="display-5">Question</h1>
                </div>
            </div>
                <CardMain @updateCount="getQuestionDetail" :cardType="'Questions'" :cardDetail="questionDetail" />
        </div>

        <div style=" width:80vw; margin:auto">
            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1 class="display-5">Answer</h1>
                </div>
            </div>

                <div v-for="answer in answerDetail" :key="answer">
                    <CardMain @updateCount="getAnswerDetail" :cardType="'Answers'" :cardDetail="answer" />
                </div>
                
        </div>


        <div class="container">
            <div class="row">
                <div class="col-2">
                    <div id="">
                    </div>
                </div>
                <div class="col-10">
                    <div id="">
                        
                        <form action="" @submit.prevent="postNewAnswer">
                            <label for="title" class="col-form-label"><h3>Your Answer</h3></label> 
                            
                            <div class="form-group text-sm-left">
                                <label for="title" class="col-form-label"><b>Title</b></label> 
                                <input type="title" class="form-control" id="title" v-model="title" required>
                            </div>
                            <div class="form-group text-sm-left">
                                <label for="title" class="col-form-label"><b>Description</b></label> 
                            </div>
                            <div class="card">
                                <wysiwyg v-model="myHTML" required />
                            </div>
                            <div style="margin:auto; margin-top:1%">
                                <button type="submit" class="btn btn-primary">Post Answer</button>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>



    </div>
</template>

<script>
import CardMain from '@/components/CardMain'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {

    components:{
        CardMain
    },
    data(){
        return{
            title:'',
            myHTML:'',
            questionDetail:{},
            answerDetail:[]
        }
    },
    methods:{
        getQuestionDetail()
          {
            //   console.log('TCL \n============\n LALALALALA ', this.$route.params.id)
              axios({
                  method: 'get',
                  url: `http://localhost:3000/questions/${this.$route.params.id}`,
                  headers:{
                      access_token: localStorage.getItem('access_token')
                  }
              })
              .then(result=>{
                console.log("TCL: result @components/thread/getQuestionDetail", result)
                this.questionDetail = result.data
                console.log("TCL: this.questionDetail", this.questionDetail)
                  
              })
              .catch(err=>{
                  console.log('TCL \n============\n @components/thread/getquestiondetail', err.response.data)
              })
          },
        getAnswerDetail()
          {
            axios({
                method:'get',
                url: `http://localhost:3000/answers/${this.$route.params.id}`
            })
            .then(result=>{
                console.log("TCL: result @components/thread/getAnswerDetail", result)
                this.answerDetail = result.data
                console.log("TCL: this.answerDetail", this.answerDetail)
            })
            .catch(err=>{
                console.log('TCL \n============\n @components/thread/getAnswerDetail', err)
            })
          },
        postNewAnswer()
          {

              if(this.myHTML === '')
                {
                    Swal.fire({
                        title:'Answer is required',
                        icon:'warning'
                    })
                }
              else
                {
                    axios({
                        method:'post',
                        url:'http://localhost:3000/answers/',
                        headers: {
                            access_token:localStorage.getItem('access_token')
                        },
                        data:{
                            QuestionId: this.$route.params.id ,
                            title: this.title,
                            description: this.myHTML
                        }
                    })
                    .then(result=>{
                        console.log('TCL \n============\n @components/thread/postNewAnswer', result)
                        Swal.fire({
                            title:'Success to post new answer',
                            icon: 'success'
                        })

                        this.title = ''
                        this.myHTML = ''

                        this.getAnswerDetail()
                    })
                    .catch(err=>{
                        console.log('TCL \n============\n @components/cardMain/postNewAnswer', err.response)
                        Swal.fire('err ')
                    })

                }
          }
    },
    mounted(){
        this.getQuestionDetail()
        this.getAnswerDetail()
    }



}
</script>

<style scoped>
.jumbotron {
  padding: 2rem 1rem;
  margin-bottom: 2rem;
  background-color: #e9ecef;
  border-radius: 0.3rem;
}


</style>