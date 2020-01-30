<template>
  <div class="flex">
      <div class="flex flex-col text-center">
          <img @click="upvoteAns" class="h-8 w-10 mx-auto cursor-pointer" src="https://www.materialui.co/materialIcons/navigation/arrow_drop_up_black_144x144.png" alt="">
          <div>{{answer.votes.reduce( (accum,vote) => accum+=vote.vote, 0)}}</div>
          <img @click="downvoteAns" class="h-8 w-10 mx-auto cursor-pointer" src="https://www.materialui.co/materialIcons/navigation/arrow_drop_down_black_144x144.png">
      </div>
      <div class="ml-4">
          {{answer.description}}
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    props: ['answer','questionId'],
    methods: {
        ...mapActions('answer',['upvote','downvote']),
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
        }
    }
}
</script>

<style>

</style>