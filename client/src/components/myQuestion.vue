<template>
    <div class="mt-3">
        <b-card :title="data.title" v-if="!update">
            <hr>
            <div v-html="data.desc"></div>
            <a @click.prevent="showUpdate" class="card-link" style="color:black;cursor:pointer">Update</a>
            <b-link @click.prevent="delQuestion(data._id)" class="card-link" style="color:red;cursor:pointer">Delete</b-link>
        </b-card>

        <div style="margin-top:20px" v-if="update">
            <div class="form p-4 shadow rounded">
                <a style="cursor:pointer" @click.prevent="cancel"> <i class="fa fa-close" style="font-size:15px;margin-bottom:10px;"></i> </a>
                <form @submit.prevent="save(data._id)">
                    <div class="form-group">
                        <label>Title</label>
                        <p class="description">Be spesific and imagine you're asking a question to another person</p>
                        <input v-model="title" type="text" class="form-control" placeholder="e.g. Is there an R function for finding the index of an element in a vector?">
                    </div>
                    <div class="form-group">
                        <label>Body</label>
                        <p class="description">Include all the information someone would need to answer your question</p>
                        <!-- <textarea rows="3" class="form-control"></textarea> -->
                        <VueEditor v-model="desc"/>
                    </div>
                    <div class="form-group">
                        <label>Tags</label>
                        <p class="description">Add up to 5 tags describe what your question is about</p>
                        <!-- <input type="text" class="form-control" placeholder="e.g. (excel android sql)"> -->
                        <b-form-tags v-model="value" class="mb-2"></b-form-tags>
                    </div>
                    <button type="submit" class="btn btn-primary">Update your question</button>
                </form>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import { VueEditor } from 'vue2-editor'

export default {
    name: 'myQuestion',
    props:["data"],
    components:{
        VueEditor
    },
    data:function(){
        return {
            title : this.data.title,
            desc : this.data.desc,
            value: this.data.tags,
            update: false
        }
    },
    methods:{
        showUpdate(){
            if(!this.update){
                this.update = true
            }else{
                this.update = false
            }
        },
        cancel(){
            this.update = false
        },
        save(id){
             axios({
            url: `http://18.136.105.19:3000/questions/${id}`,
            method: 'put',
            headers:{
                token : localStorage.getItem('token')
            },
            data:{
                title: this.title,
                desc: this.myQuestion
            }
            })
            .then(() =>{
                this.$emit("fetch")
                this.update = false
            })
        },
        delQuestion(id){
             axios({
            url: `http://18.136.105.19:3000/questions/${id}`,
            method: 'delete',
            headers:{
                token : localStorage.getItem('token')
            }
            })
            .then((respone) =>{
               this.$emit("fetch")
            })

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>