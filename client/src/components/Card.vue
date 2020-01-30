<template>
            <div class="question-summary border-bottom pt-3 pb-3">
              <div class="row">
                <div class="points col-3">
                  <div class="votes mr-1">
                    <div class="mini-counts">
                      <span>{{getTotalVote(this.question)}}</span>
                      <p>votes</p>
                    </div>
                  </div>
                  <div class="votes ml-1">
                    <div class="mini-counts">
                      <span>3</span>
                      <p>answers</p>
                    </div>
                  </div>
                </div>
                <div class="summary col-9">
                  <router-link :to='`/question-detail/${question._id}`' class="question-hyperlink d-inline-block text-truncate">{{question.title}}</router-link>
                  <div class="tags" >
                    <span class="badge badge-secondary" v-for="(tag,i) in question.tags" :key="i">{{tag}}</span>
                  </div>
                  <div class="created">
                    <div class="by-user">
                      <p class="date">Created {{getDate(`${question.createdAt}`)}}<span class="name"> {{question.idUser.username}}</span></p>
                    </div>
                  </div>
                </div>
              </div>              
            </div>  
</template>

<script>
import axios from 'axios'
export default {
    name: 'card',
    props:['question'],
    methods:{
        getTotalVote(obj){
            let up = obj.upVotes.length
            let down = obj.downVotes.length
            return up - down
        },
        getDate(date){
            let arr =  date.split('T')
            return arr[0]
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>