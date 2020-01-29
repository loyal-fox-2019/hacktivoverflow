<template>
    <div>
        <h1>Edit {{ $route.params.cardType }}</h1>
        
        <div style="width:50rem; margin:auto">
                <form action="" @submit.prevent="editPost">
                <div class="form-group text-sm-left">
                    <label for="title" class="col-form-label"><b>Title</b></label> 
                    <input type="title" class="form-control" id="title" v-model="postDetail.title" required>
                </div>
                <div class="form-group text-sm-left">
                    <label for="Description" class="col-form-label"><b>Description</b></label> 
                </div>
                <div class="card">
                    <wysiwyg v-model="postDetail.description" required />
                </div>
                <div style="margin:auto; margin-top:1%;">
                    <button type="submit" class="btn btn-primary" style=" margin-right:1%">Edit Post</button>
                    <button type="" class="btn btn-danger" @click.prevent="deletePost">Delete Post</button>
                </div>
            </form>
        </div>





    </div>
</template>



<script>
import Swal from 'sweetalert2'
import axios from 'axios'

export default {

    props:[
        'cardDetail'
    ],
    data(){
        return{
            postDetail:{},
        }
    },
    methods:{
        getPostDetail()
          {
              console.log('TCL \n============\n ', 'JALAN NIHHHHHH')
              axios({
                  method: 'get',
                  url: `http://localhost:3000/${this.$route.params.cardType}/editFindOne/${this.$route.params.id}`,
                  headers:{
                      access_token: localStorage.getItem('access_token')
                  }
              })
              .then(result=>{
                  console.log('TCL \n============\n getPostDetail result', result)
                  this.postDetail = result.data
              })
              .catch(err=>{
                  Swal.fire(
                      'Error',
                      err.response.data.message,
                      'error'
                  )
              })
          },
        editPost()
          {
            Swal.fire({
                title: `Update this ${this.$route.params.cardType}`,
                text: `Confirm updating this ${this.$route.params.cardType}`,
                icon: 'question',
                showCancelButton: true
            })
            .then(result=>{
                if(result.value)
                  {
                    axios({
                        method: 'put',
                        url: `http://localhost:3000/${this.$route.params.cardType}/update/${this.$route.params.id}`,
                        headers:{
                            access_token: localStorage.getItem('access_token')
                        },
                        data:{
                            title: this.postDetail.title,
                            description: this.postDetail.description
                        }
                    })
                    .then(result=>{
                        console.log('TCL \n============\n result @views/editpage/editpost()', )
                        Swal.fire(
                            `Success to update your ${this.$route.params.cardType}`
                        )

                    })
                    .catch(err=>{
                        Swal.fire(
                            'Error',
                            err.response.data.message,
                            'error'
                        )
                    })
                  }
            })
            
            

          },
        deletePost()
          {
            //   Swal.fire(this.$route.params.cardType + ' ' + this.$route.params.id)

            Swal.fire({
                title: `Delete this ${this.$route.params.cardType}`,
                text: 'Action cannot be undone, please confirm',
                icon: 'warning',
                showCancelButton: true
            })
            .then(result=>{
                if(result.value)
                  {
                      axios({
                          method:'delete',
                          url: `http://localhost:3000/${this.$route.params.cardType}/${this.$route.params.id}`,
                          headers:{
                              access_token: localStorage.getItem('access_token')
                          }
                      })
                      .then(result=>{
                          console.log('TCL \n============\n delete post', result)

                          Swal.fire('Delete Successful')
                          this.$router.push({ path: '/' })
                      })
                      .catch(err=>{
                          Swal.fire(
                              'Error',
                              `${err.response.data.message}`,
                              'error'    
                          )
                      })
                  }
            })
          }
    },
    mounted(){
        this.getPostDetail()
    }




}
</script>




<style>



</style>