<template>
    <div style="">
        <!-- <h2>@components/cardMain.vue</h2> -->

        <!-- {{cardDetail}} -->
        <div class="container">
            <div class="row">
                <div class="col-2">
                    <div id="votesDiv">
                        <Votes @updateCount="updateCount" :cardType="cardType" :cardDetail="cardDetail"/>
                    </div>
                </div>

                <div class="col-10">
                    <div id="cardDiv">
                            <!-- {{ cardType}} -->
                            
                        <div class="card">
                            <div class="card-header">
                                
                                <h5 class="card-title" >{{ cardDetail.title }}</h5>
                                <p v-if="cardType === 'Questions'"> Asked by {{ cardDetail.AuthorId.username }}</p>
                                <p v-if="cardType === 'Answers'"> Answered by {{ cardDetail.AuthorId.username }}</p>
                            </div>
                            
                            <div class="card-body">
                                <blockquote class="blockquote mb-0">
                                <p v-html="cardDetail.description"></p>
                                <footer class="blockquote-footer">Posted @<cite title="Source Title">{{ cardDetail.createdAt.split('T')[0] }}</cite></footer>
                                </blockquote>
                                <!-- <EditModal :cardDetail="cardDetail" :cardType="cardType" v-if=" cardDetail.AuthorId.username === loggedUsername" /> -->
                                <!-- <button type="button" class="close"  aria-label="Close" v-if=" cardDetail.AuthorId.username === loggedUsername " @click.prevent="moveToEditPage( cardDetail._id )"> -->
                                    <!-- <i class="fas fa-edit"></i> -->
                                <!-- </button> -->
                                <a href="#" class="card-link" style="float:right" v-if=" cardDetail.AuthorId.username === loggedUsername" @click.prevent="moveToEditPage( cardDetail._id )">edit {{ cardType.slice(0, -1) }}</a>
                            </div>
                        </div>
                        
                    </div>
                </div>

            </div>
            <div class="dropdown-divider"></div>
        </div>

         

        
        





    </div>
</template>

<script>
import Votes from './Votes'
import EditModal from './EditModal'
import axios from 'axios'
import Swal from 'sweetalert2'
import { mapGetters } from 'vuex'

export default {
    components:{
        Votes,
        EditModal
    },
    props:[
        'cardType',
        'cardDetail'
    ],
    methods:{
        moveToEditPage(PostId)
          {
              this.$router.push({ path: `/edit/${this.cardType}/${PostId}` })
          },
        updateCount()
          {
              this.$emit('updateCount')
          }

        
    },
    computed:{
        ...mapGetters([
            'loggedUsername'
        ])
    }
    
}
</script>

<style scoped>

.dropdown-divider {
  height: 0;
  margin: 0.5rem 0;
  overflow: hidden;
  border-top: 1px solid #ECDBBF;
}

.card-header{
    background-color: bisque;
}


</style>