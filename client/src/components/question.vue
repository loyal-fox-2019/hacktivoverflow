<template>
  <div class="flex">
      <div class="flex flex-col px-3">
          <p class="mx-auto">{{question.votes.reduce( (accum,vote) => accum+=vote.vote, 0)}}</p>
          <p class="text-xs">Votes</p>
      </div>
      <div class="flex flex-col px-3">
          <p class="mx-auto">{{question.answers.length}}</p>
          <p class="text-xs">Answers</p>
      </div>
      <div class="flex flex-col w-full px-3">
          <p @click="toDetail" class="w-auto text-blue-700 cursor-pointer">{{question.name}}</p>
          <div class="flex">
            <p @click="getTaggedQuestion(tag)" class="trans mr-3 mt-2 cursor-pointer text-xs bg bg-gray-400 px-2 py-1 rounded text-gray-700 hover:bg-gray-500" v-for="(tag,i) in question.tags" :key="i">{{tag}}</p>
          </div>
        <div class="w-5/12 text-right self-end text-sm opacity-75">
            <p class="">Asked by {{question.author.name}}</p>
        </div>
        <div v-if="user" class="flex">
            <p @click="toUpdate" class="trans cursor-pointer bg bg-blue-500 rounded-sm text-white border-t-2 border-blue-300 mx-1 px-2 py-1 text-xs hover:bg-blue-600">Update</p> 
            <p @click="deleteQuest" class="trans cursor-pointer bg bg-red-500 rounded-sm text-white border-t-2 border-red-300 mx-1 px-2 py-1 text-xs hover:bg-red-600">Delete</p>
        </div>
      </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
    props: ['question','user'],
    methods: {
        ...mapActions('question',['getDetail','deleteQuestion','getTaggedQuestions']),
        ...mapMutations('question',['SET_UPDATE_DATA']),
        toDetail() {
            this.getDetail(this.question._id)
            this.$router.push({path:`question/${this.question._id}`})
        },
        toUpdate() {
            let tags = this.question.tags.join(" ")
            this.SET_UPDATE_DATA({
                questionId: this.question._id,
                name: this.question.name,
                description: this.question.description,
                tags
            })
            this.$router.push({path:'/update'})
        },
        deleteQuest() {
            this.deleteQuestion(this.question._id)
        },
        getTaggedQuestion(tag) {
            this.getTaggedQuestions(tag)
        }
    }
}
</script>

<style scoped>
</style>