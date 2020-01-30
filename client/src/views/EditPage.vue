<template>
    <div>
        <h1>Edit {{ $route.params.cardType }}</h1>
        <!-- {{ postDetail }} -->
        
        <div style="width:50rem; margin:auto">
            <form action="" @submit.prevent="editPost">
                <div class="form-group text-sm-left">
                    <label for="title" class="col-form-label"><b>Title</b></label> 
                    <input type="title" class="form-control" id="title" v-model="postDetail.title" required>
                </div>

                <div class="form-group text-sm-left">
                    <label for="Description" class="col-form-label"><b>Description</b></label> 
                
                    <div class="card">
                        <wysiwyg v-model="postDetail.description" required />
                    </div>
                </div>

                <div class="form-group " data-toggle="tooltip" data-placement="top" title="add multiple tags separated with comma, extra space will be ignored">
                    <label for="Title"><b>Edit Tags</b></label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="Title" 
                        placeholder="add multiple tags separated with comma, extra space will be ignored" 
                        v-model="tagListString">
                </div>

                <div  class="form-group" data-toggle="tooltip" data-placement="top" title="click tag to delete" v-if="">
                    <!-- {{ tagListArrayForm }} -->
                    <button  
                        v-for="(tag, index) in tagListArrayFormDisplay" :key="index" 
                        type="button" 
                        class="btn btn-outline-info tagButton"
                        @click.prevent="removeDisplayedTag(tag)">{{ tag }} | x
                    </button>
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
import { mapGetters } from 'vuex'

export default {

    props:[
        'cardDetail'
    ],
    data(){
        return{
            postDetail:{},
            tagListString: '',
            tagListArrayForm:[]
        }
    },
    methods:{
        getPostDetail()
          {
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
                  this.tagListArrayForm = result.data.TagList
                  this.tagListString = result.data.TagList.join(',')
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
                    let updateQuery = {
                        title : this.postDetail.title,
                        description : this.postDetail.description
                    }

                    let pushTag = [], pullTag = []

                    this.tagListArrayForm.forEach(element => {
                        if( this.postDetail.TagList.indexOf( element ) === -1)
                            pushTag.push(element)
                    });

                    this.postDetail.TagList.forEach(element => {
                        if( this.tagListArrayForm.indexOf( element ) === -1)
                            pullTag.push(element)
                    });

                    updateQuery.push = pushTag
                    updateQuery.pull = pullTag
                    console.log(`TCL: updateQuery`, updateQuery)


                    axios({
                        method: 'put',
                        url: `http://localhost:3000/${this.$route.params.cardType}/update/${this.$route.params.id}`,
                        headers:{
                            access_token: localStorage.getItem('access_token')
                        },
                        data: updateQuery
                    })
                    .then(result=>{
                        console.log('TCL \n============\n result @views/editpage/editpost()', )
                        Swal.fire(
                            `Success to update your ${this.$route.params.cardType}`
                        )
                        this.$router.go(-1)

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
          },
        removeDisplayedTag(tag){
            this.tagListString = this.tagListArrayForm.filter( value => value != tag ).join(',')
        }
    },
    created(){
        this.getPostDetail()
    },
    mounted(){
        
    },
    computed:{
        tagListArrayFormDisplay(){
            this.tagListArrayForm = this.tagListString.replace(/,$/, "").replace(/\s\s+/g, ' ').split(',').map(e=> e.trim()).filter( e=> e != ' ' && e.length !== 0)
            return  this.tagListArrayForm
        }
    }





}
</script>




<style scoped>

.tagButton{
    border: dashed 1px grey;
    border-radius: 10px;
    font-size: 100%;
    padding: 5px;
    margin:1%;
}


</style>