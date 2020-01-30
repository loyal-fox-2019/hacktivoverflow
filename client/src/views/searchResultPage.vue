<template>
  <div>
      <h1>search result page</h1>
      <div class="alert alert-primary" role="alert" v-if="searchResultArray.length>0">
           showing {{ searchResultArray.length }} result
      </div>
      <div class="alert alert-danger mx-4 my-2" role="alert" v-if="searchResultArray.length === 0">
        no result
      </div>


      <div>
          <div  v-for="(question, index) in searchResultArray" :key="index">
                <CardSimple :question="question"/>
          </div>
      </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CardSimple from '../components/CardSimple'

export default {
    name: 'searchResultPage',
    components:{
        CardSimple
    },
    computed:{
        ...mapGetters([
            'searchResultArray'
        ])
    }


}
</script>

<style>

</style>