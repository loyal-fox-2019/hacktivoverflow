<template>
    <div style="padding:2%">
        <!-- <h1>@views/home.vue</h1> -->

            <!-- <div  :class="kelas">
                <h1>lalalla</h1>
                {{ loggedInUserDetail }}
            </div> -->
        
        <div class="container">
            <div class="row">
                <div class="col-4">
                    <div id="watchedTagDiv">
                        <div class="card">
                            
                            <div class="card-header bg-dark text-light" >
                                Watched Tag
                            </div>

                            <!-- start of accordion -->
                            <div class="accordion" id="accordionExample">
                                <div class="card">
                                    <div class="card-header" id="headingOne">
                                    <h2 class="mb-0">
                                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" @click.prevent="setShowDeleteButton">
                                        Edit Tag
                                        </button>
                                    </h2>
                                    </div>

                                    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div class="card-body" >
                                        <form class="form-inline" @submit.prevent="addWatchedTag" >
                                            <input 
                                                type="text" 
                                                class="form-control mb-2 mr-sm-2" 
                                                id="inlineFormInputName2" placeholder="add tag" 
                                                required
                                                v-model="watchedTagAdded">
                                            <button type="submit" class="btn btn-primary mb-2">add</button>
                                        </form>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <!-- end of accordion -->
                            
                            <div>
                                <!-- <button  
                                    v-for="(tag, index) in loggedInUserDetail.watchedTag " :key="index"
                                    type="button" 
                                    class="btn btn-outline-info tagButton"
                                    @click.prevent="goToSearchPage(tag)"
                                    >{{ tag }}
                                    <button 
                                        class="btn btn-light btn-sm" 
                                        v-if="showDeleteButton"
                                        @click.prevent="deleteTag(tag)">x
                                    </button>
                                </button> -->
                                <tagButton :tagList="loggedInUserDetail.watchedTag"
                                           :showDeleteButton="showDeleteButton"
                                />

                            </div>
                            
                        </div>

                    </div>
                </div>

                <div class="col-8">
                    <div id="questionDiv">
                        <!-- console.log("TCL: access_token", {{access_token}}) -->
                        <div v-for="(question, index) in questionData" :key="index">
                            <CardSimple :question="question"/>
                        </div>
                        
                    </div>
                </div>

            </div>
        </div>

        <!-- {{ questionData }} -->

        


        


    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from '../../config/axios'
import Swal from 'sweetalert2'

import CardSimple from '../components/CardSimple'
import tagButton from '../components/tagButton'


export default {
    components:{
        CardSimple,
        tagButton
    },
    data(){
        return{
            votes:100,
            kelas:'blueDiv',
            watchedTagAdded:'',
            showDeleteButton: false
        }
    },
    methods:{
        isLoginCheck(){
              Swal.fire('JALAN NIH ISLOGINCHECK')
          },
        setShowDeleteButton(){
            if(!this.showDeleteButton)
                this.showDeleteButton = true
            else
                this.showDeleteButton = false

            // if(!this.showEditButton)
            //     this.$store.commit('SET_SHOW_EDIT_BUTTON', true)
            // else
            //     this.$store.commit('SET_SHOW_EDIT_BUTTON', false)
        },
        addWatchedTag(){
            axios({
                method: 'get',
                url: `/tags/${this.watchedTagAdded}`,
                headers:{
                    access_token : localStorage.getItem('access_token')
                }
            })
            .then( ({data}) =>{
                if(data.message)
                  {
                      return axios({
                          method: 'patch',
                          url: `/users/updateTag`,
                          headers:{
                              access_token : localStorage.getItem('access_token')
                          },
                          data:{
                              push: [this.watchedTagAdded]
                          }
                      })
                  }
            })
            .then( ({data})=>{
                Swal.fire('Success Adding Watched Tag')
                this.watchedTagAdded = ''
                this.$store.dispatch('fetchUserDetail')
                this.$store.dispatch('fetchQuestionData')
            })
            .catch(({response})=>{
                console.log(' error @addWatchedTag -home \n=========================================\n', response)
                Swal.fire(
                    'Error with Adding Watched Tag',
                    response.data.message
                )
            })

        },
        deleteTag(tagName){
            Swal.fire({
                title: `Delete Tag "${tagName}"`,
                showCancelButton: true,
                confirmButtonText: "Yes delete It"
            })
            .then(result=>{
                if(result.value){
                    axios({
                        method: 'patch',
                        url: '/users/updateTag',
                        headers:{
                            access_token : localStorage.getItem("access_token")
                        },
                        data:{
                            pull : tagName
                        }
                    })
                    .then( ({data}) =>{
                        Swal.fire('Watched Tag Has Been Deleted')
                        this.$store.dispatch('fetchUserDetail')
                    })
                    .catch(({response})=>{
                        console.log(' error @deleteTag -home \n=========================================\n', response.data)
                        Swal.fire(
                            'Error with Deleting Watched Tag',
                            response.data.message
                        )
                    })
                }
            })
        },
        goToSearchPage(tag){
            this.$store.dispatch('searchArticles', {TagList: tag})
            this.$router.push('/searchResult')
        }
    },
    created(){
        this.$store.dispatch('fetchQuestionData')
        if(localStorage.getItem('access_token'))
            this.$store.dispatch('fetchUserDetail')
        // this.isLoginCheck()
    },
    computed:{
        ...mapGetters([
            'access_token',
            'questionData',
            'loggedInUserDetail',
            'showEditButton'
        ])
    },
    




}
</script>

<style scoped>

#questionDiv{
    margin-top:1%
}

#watchedTagDiv{
    /* border: solid 2px red; */
}

.tagButton{
    border: dashed 1px grey;
    border-radius: 10px;
    font-size: 100%;
    padding: 5px;
    margin:1%;
}


</style>