<template>
    <div>
        <!-- <h6>@components/cardSimple.vue</h6> -->
        
        <!-- {{ question }} -->
        <div class="container shadow-sm p-3 mb-3 bg-white rounded">
            <div class="row" style="margin:auto">
                <div style="width:10%" >
                    <div class="btn-group-vertical">
                        <div>
                            <input type="text" readonly class="form-control-plaintext groupVotes" :value="countVotes" style="text-align:center">
                        </div>
                        <div style="margin:auto">
                            <label for="" class="col-form-label"><b>Votes</b></label>
                        </div>
                    </div>
                </div>

                <div  style="width:10%">
                        <div>
                            <input type="text" readonly class="form-control-plaintext groupVotes"  :value="answers" style="text-align:center">
                        </div>
                        <div style="margin:auto">
                            <label for="" class="col-form-label"><b>Answers</b></label>
                        </div>
                </div>
                
                <div class="text-left" style="width:80%">
                    <!-- <button type="button" class="close"  aria-label="Close" v-if=" question.AuthorId.username === loggedUsername">
                        <i class="fas fa-edit"></i>
                    </button> -->

                    <a href="#" style="float:right" v-if=" question.AuthorId.username === loggedUsername" @click.prevent="moveToEditPage( question._id )">edit question</a>

                    <router-link :to="`/thread/${question._id}`"><h5 class="card-title">{{ question.title }}</h5></router-link> 
                    <p class="card-text text-muted" v-html="question.description.slice(0,100) + '...'"></p>
                    <footer class="blockquote-footer">Posted @<cite title="Source Title">{{ question.createdAt.split('T')[0] }} ~by {{ question.AuthorId.username }}</cite></footer>
                </div>

            </div>
            </div>


    </div>


</template>

<script>
import { mapGetters } from 'vuex'
import axios from '../../config/axios'

export default {
    components:{
        
    },
    props:[
        'question'
    ],
    data(){
        return{
            answers:0
        }
    },
    methods:{
        moveToEditPage(pageId)
          {
              this.$router.push({ path: `/edit/Questions/${pageId}`})
          },
        countAnswers()
          {
            axios({
                method: 'get',
                url: `/answers/${this.question._id}`
            })
            .then(result=>{
                console.log('TCL \n============\n ', 'nih jalan')
                console.log("TCL: result length neh", result.data.length)
                // res(result.data.length)
                this.answers = result.data.length
            })
          },
    },
    computed:{
        countVotes(){
            return  this.question.upVotes.length - this.question.downVotes.length
        },
        ...mapGetters([
            'loggedUsername'
        ])
        

    },
    created(){
        this.countAnswers()
    }


}
</script>

<style scoped>
.card-title
{
    font-weight: bolder
}

.groupVotes
{
    width:100%
}


</style>