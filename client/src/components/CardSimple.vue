<template>
    <div>
        <!-- <h6>@components/cardSimple.vue</h6> -->
        
        <!-- {{ question }} -->
        <div :class="returnClass" >
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
                
                <div class="text-left" style="width:80%; padding-left:3%">
                    <!-- <button type="button" class="close"  aria-label="Close" v-if=" question.AuthorId.username === loggedUsername">
                        <i class="fas fa-edit"></i>
                    </button> -->

                    <a href="#" style="float:right" v-if=" question.AuthorId.username === loggedUsername" @click.prevent="moveToEditPage( question._id )">edit question</a>

                    <router-link :to="`/thread/${question._id}`"><h5 class="card-title">{{ question.title }}</h5></router-link> 
                    <p class="card-text text-muted" v-html="question.description.slice(0,100) + '...'"></p>
                    
                    <div>
                        <!-- <button  
                            v-for="tag in question.TagList" :key="tag"
                            type="button" 
                            class="btn btn-outline-info tagButton"
                            @click.prevent="$emit('switchToFilterResultPage', { tagList: tag })"
                            >{{ tag }}
                        </button> -->
                        <tagButton :tagList="question.TagList"/>
                    </div>
                    <div class="dropdown-divider"></div>

                    <footer class="blockquote-footer">Posted @<cite title="Source Title">{{ question.createdAt.split('T')[0] }} ~by {{ question.AuthorId.username }}</cite></footer>
                </div>

            </div>
            </div>


    </div>


</template>

<script>
import { mapGetters } from 'vuex'
import axios from '../../config/axios'

import tagButton from '../components/tagButton'

export default {
    components:{
        tagButton
    },
    props:[
        'question'
    ],
    data(){
        return{
            answers:0,
            classDiv1 : 'container shadow-sm p-3 mb-3 bg-white rounded' 
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
                // console.log('TCL \n============\n ', 'nih jalan')
                // console.log("TCL: result length neh", result.data.length)
                // res(result.data.length)
                this.answers = result.data.length
            })
            .catch( ({response})=>{
                console.log(' error @countAnswers- CardSimple\n======================\n', response.data.message)
            })
          },
    },
    computed:{
        ...mapGetters([
            'loggedUsername',
            'loggedInUserDetail'
        ]),
        countVotes(){
            return  this.question.upVotes.length - this.question.downVotes.length
        },
        returnClass(){
            if(this.loggedInUserDetail.username)
              {
                  for(let x = 0; x < this.loggedInUserDetail.watchedTag.length; x++)
                    {
                        if(this.question.TagList.indexOf( this.loggedInUserDetail.watchedTag[x] ) >= 0)
                            return 'container shadow-sm p-3 mb-3 bg-white rounded redBorderDiv'
                    }
                  return 'container shadow-sm p-3 mb-3 bg-white rounded'
              }
            else
                return 'container shadow-sm p-3 mb-3 bg-white rounded'

            
        }
        
        

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

.tagButton{
    border: dashed 1px grey;
    border-radius: 10px;
    font-size: 100%;
    padding: 5px;
    margin:0.3%;
}

.redBorderDiv{
    border: dashed 2px red;
    box-shadow: 10px 10px 5px grey;
    
}

</style>