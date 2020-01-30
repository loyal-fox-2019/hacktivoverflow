<template>
  <div>
        <button  
            v-for="(tag, index) in tagList " :key="index"
            type="button" 
            class="btn btn-outline-info tagButton"
            @click.prevent="buttonAction(tag)"
            >{{ tag }}
            <button 
                class="btn btn-light btn-sm" 
                v-if="showDeleteButton"
                >x
            </button>
        </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from '../../config/axios'
import Swal from 'sweetalert2'

export default {
    name:'tagButton',
    props: [
        'tagList',
        'showDeleteButton'
    ],
    methods:{
        buttonAction(tag){
            if(this.showDeleteButton)
                this.deleteTag(tag)
            else
                this.goToSearchPage(tag)
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
        this.$store.commit('SET_SHOW_EDIT_BUTTON', false)
    },
    computed:{
        ...mapGetters([
            // 'showEditButton'
        ])
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