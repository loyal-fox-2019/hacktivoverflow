<template>
    <div>
        <!-- <h3>Edit Modal</h3> -->
        <h1>BAKALAN GKDIPAKE NIH, BISA DIAPUSSSSS!!!!!!!!!!!!!!!!!!!</h1>

        {{ cardDetail._id }}
        <button type="button" class="close"  aria-label="Close" data-toggle="modal" data-target="#modalEditPost" @click="setLoadContent()">
                <i class="fas fa-edit"></i>
                {{ cardDetail._id }} ++ 
                {{ cardDetail.title }} ++
                {{ cardType}}
            </button>

        <div class="col-10">


            <!-- modal 'modalEditPost' -->
        <div class="modal fade" id="modalEditPost" tabindex="-1" role="dialog" aria-labelledby="modalEditPostLabel" aria-hidden="true" >
        <div class="modal-dialog " role="document" >
            <div class="modal-content" style="width:50rem;">
                
                <div class="modal-header">
                    <h5 class="modal-title" id="modalEditPostLabel">{{ cardDetail.title }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                
                <div class="modal-body">
                     <form action="" @submit.prevent="postNewAnswer">
                        <div class="form-group text-sm-left">
                            <label for="title" class="col-form-label"><b>Title</b></label> 
                            <input type="title" class="form-control" id="title" v-model="title" required>
                        </div>
                        <div class="card">
                            <wysiwyg v-model="description" required />
                        </div>
                        <div style="margin:auto; margin-top:1%;">
                            <button type="submit" class="btn btn-primary" style=" margin-right:1%">Edit Post</button>
                            <button type="submit" class="btn btn-danger">Delete Post</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
        </div>
        <!-- end of modal 'modalUserForm' -->





        </div>


    </div>
</template>



<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    props:[
        'cardDetail',
        'cardType'
    ],
    methods:{
        deleteQuestion(){
            axios({
                method:'delete',
                url:'http://localhost:3000/questions/'
            })
        },
        deleteAnswer(){

        }
    }
    





}
</script>



<style>



</style>