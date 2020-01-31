<template>
  <div class="flex border-b-2 border-gray-300">
      <div class="flex flex-col text-center">
          <img @click="upvoteAns" class="h-8 w-10 mx-auto cursor-pointer" src="https://www.materialui.co/materialIcons/navigation/arrow_drop_up_black_144x144.png" alt="">
          <div>{{answer.votes.reduce( (accum,vote) => accum+=vote.vote, 0)}}</div>
          <img @click="downvoteAns" class="h-8 w-10 mx-auto cursor-pointer" src="https://www.materialui.co/materialIcons/navigation/arrow_drop_down_black_144x144.png">
      </div>
      <div v-if="!edit" class="flex flex-col w-full">
        <div class="ml-4">
            {{answer.description}}
        </div>
        <div @click="edit=true" class="trans cursor-pointer border-t-2 border-blue-300 py-1 ml-3 w-1/12 mt-6 rounded bg bg-blue-500 text-xs text-white text-center hover:bg-blue-600" v-if="answer.author == $store.state.userId && !edit">
            Edit
        </div>
      </div>
      <div v-else class="flex flex-col w-full">
          <wysiwyg v-model="description" />
          <div class="flex">
            <div @click="updateAns" class="trans cursor-pointer border-t-2 border-blue-300 py-1 ml-3 w-1/12 mt-2 rounded bg bg-blue-500 text-xs text-white text-center hover:bg-blue-600">
                Submit
            </div>
            <div @click="edit=false" class="trans cursor-pointer border-t-2 border-red-300 py-1 ml-3 w-1/12 mt-2 rounded bg bg-red-500 text-xs text-white text-center hover:bg-red-600">
                Cancel
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    props: ['answer','questionId'],
    data() {
        return {
            edit: false,
            description: this.answer.description
        }
    },
    methods: {
        ...mapActions('answer',['upvote','downvote','updateAnswer']),
        upvoteAns() {
            this.upvote({
                questionId: this.questionId,
                answerId: this.answer._id
            })
        },
        downvoteAns() {
            this.downvote({
                questionId: this.questionId,
                answerId: this.answer._id
            })
        },
        updateAns() {
            this.updateAnswer({
                questionId: this.questionId,
                description: this.description,
                answerId: this.answer._id
            })
            this.edit = false
        }
    },
}
</script>

<style>

</style>