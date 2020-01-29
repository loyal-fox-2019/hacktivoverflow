<template>
    <div>
        <b-card v-if="!update">
            <b-card-text v-html="data.desc"></b-card-text>
            <a @click="showUpdate" class="card-link" style="color:black;cursor:pointer">Update</a>
        </b-card>

         <div style="margin-top:20px" v-if="update">
            <hr> 
            <div class="form p-4 shadow rounded">
                <a style="cursor:pointer" @click.prevent="showUpdate"> <i class="fa fa-close" style="font-size:20px;margin-bottom:10px;"></i> </a>
                <VueEditor v-model="myAnswer" />
                <b-button variant="primary" class="mt-3" @click.prevent="save(data._id)">Update Your Answer</b-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from  'axios'
import { VueEditor } from 'vue2-editor'

export default {
    name:'myAnswer',
    props:["data"],
    components:{
        VueEditor
    },
    data:function(){
        return {
            myAnswer : this.data.desc,
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
        save(id){
             axios({
            url: `http://localhost:3000/answers/${id}`,
            method: 'put',
            headers:{
                token : localStorage.getItem('token')
            },
            data:{
                desc: this.myAnswer
            }
            })
            .then(() =>{
                this.update = false
                this.$emit("fetch")
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>