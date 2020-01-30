<template>
    <div class="card m-0 mx-auto">
        <div class="row">
            <div class="col-1 m-0 my-auto pt-2 pl-5">
                <h2><i class="fa fa-arrow-circle-o-up" aria-hidden="true"></i></h2>
                <h2 class="upvotes"> {{votes}}</h2>
                <h2><i class="fa fa-arrow-circle-o-down" aria-hidden="true"></i></h2>
            </div>
            <div class="col-9">
                <div class="card-body text-left pt-2 pb-1">
                <h2 @click="goToDetail(question._id)" class="card-title">{{question.title}}</h2>
                <p class="card-text" v-html="question.content"></p>
                </div>
            </div>
            <div class="col-2">
                <img class="pt-2 pb-2 pr-2" :src="question.file" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props : {
        question : Object
    },
    data(){
        return {
            votes : null
        }
    },
    methods : {
        goToDetail(id){
            this.$router.push('/q/'+id)
        },
        countVotes(){
            this.votes =  question.upvotes.length - question.downvotes.length
        }
    },
    created(){
        this.votes = this.$props.question.upvotes.length - this.$props.question.downvotes.length 
    }
}
</script>

<style scoped>
img{
  max-width: 10rem;
  max-height: 10rem;
  min-width: 100%;
}
.card{
  background-color: rgb(240, 240, 240);
  max-width: 65rem;
  border-radius: .5rem;
  border: 0px;
  padding: 1em;
  box-shadow:
    -12px -12px 12px 0 rgba(255, 255, 255, .7),
    12px 12px 12px 0 rgba(0, 0, 0, .03);

}

.card:hover{
    box-shadow:
    -12px -12px 12px 0 rgba(255, 255, 255, .5),
    12px 12px 12px 0 rgba(0, 0, 0, .06);
}

.card-text{
  max-height:5rem;
  overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 3;
}

.card-title:hover{
  color: rgb(95, 95, 95);
  cursor: pointer;
}

.fa:hover{
  cursor: pointer;
  color: rgb(95, 95, 95);
}

.card-title{
  font-weight: bold;
}

.upvotes{
    font-size: 10px;
}
</style>