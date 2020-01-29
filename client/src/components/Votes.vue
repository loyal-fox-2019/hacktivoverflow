<template>
    <div style="">
        <!-- <h2>@components/VOtes.vue</h2> -->
        <!-- ID {{ cardDetail._id}} -->
        <!-- <div> UPVOTES NIH <br> {{ cardDetail.upVotes  }} <br><br><br> DOWNVOTES NIH <br> {{ cardDetail.downVotes  }} {{cardType}} </div> -->
        <div class="btn-group-vertical">
            <button type="button" class="btn btn-secondary groupVotes" @click.prevent="voting('upVotes')" >
                <i class="fas fa-chevron-up"></i>
            </button>
            <div>
                <input type="text" readonly class="form-control-plaintext  groupVotes" id="" :value="countVotes" style="text-align:center">
            </div>
            <button type="button" class="btn btn-secondary groupVotes" @click.prevent="voting('downVotes')"> 
                <div>
                    <i class="fas fa-chevron-down"></i>
                </div>
            </button>
        </div>
    </div>


</template>

<script>
import Swal from 'sweetalert2'
import axios from '../../config/axios'

export default {

    props:[
        'cardType',
        'cardDetail'
    ],
    data(){
        return{
            
        }
    },
    methods:{
        voting(choice)
          {
              const username = localStorage.getItem('username')
              let votesScript = {
                    $push:{

                    },
                    $pull:{
                        
                    }
                }

              let counterChoice = 'downVotes'
              if ( choice === 'downVotes')
                { counterChoice = 'upVotes' }


                if( this.cardDetail[counterChoice].indexOf(username) >=0 )
                  {
                    votesScript.$pull[counterChoice] = username
                    votesScript.$push[choice] = username    
                  }
                else if (this.cardDetail[choice].indexOf(username) >= 0)
                  {
                    votesScript.$pull[choice] = username
                  }
                else
                  {
                    votesScript.$push[choice] = username
                  }
                
                // console.log('TCL \n============\n CONDITION NIH', condition)
                console.log('TCL \n============\n  card type nih', this.cardType)
                console.log('TCL \n============\n  votesScript  ', votesScript)

                axios({
                    method:'patch',
                    url: `/${this.cardType}/votes/${this.cardDetail._id}`,
                    headers:{
                        access_token:localStorage.getItem('access_token')
                    },
                    data:{
                        votesScript
                    }
                    
                })
                .then(result=>{
                    Swal.fire('Success to update Votes')
                    // this.countVotes() //LAST WORKING STATE

                    this.$emit('updateCount')
                })
                .catch(err=>{
                    console.log('TCL \n============\n err@components/votes.vue', err.response)
                    Swal.fire(
                        'ERROR',
                        err.response.data.message,
                        'error'
                    )
                })
              
          }
        
    },
    computed:{
        countVotes(){
            return this.cardDetail.upVotes.length - this.cardDetail.downVotes.length
        },
    },
    mounted(){
        
    }



}
</script>

<style scoped>
.groupVotes
{
    width:3rem;
    height:3rem
}




</style>