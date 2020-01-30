<template>
  <div class="border border-gray-300 flex rounded shadow-md min-h-48 p-2 mb-2" :class="{ 'bg-orange-300': myFollowing }">
    <div class="flex flex-col w-24 p-4">
      <div class="flex flex-col justify-center mb-2">
        <span class="text-center">{{ question.upvotes.length }}</span>
        <span class="text-center text-xs">votes</span>
      </div>
      <div class="flex flex-col justify-center">
        <span class="text-center">{{ totalAnswers }}</span>
        <span class="text-center text-xs">answers</span>
      </div>
    </div>
    <div class="p-2 flex flex-col justify-between w-full">
      <router-link
        :to="'/questions/' + question._id"
        class="inline-block py-1 text-blue-600 cursor-pointer">
        {{ question.title }}
      </router-link>
      <div v-html="previewDescription" class="text-sm py-1">
      </div>
      <div class="py-4 flex w-full justify-between">
        <div>
          <span
            v-for="tag in question.tags" :key="tag"
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2">
            {{ tag }}
          </span>
        </div>
        <div class="">
          <span class=" inline-block">by {{ question.author.username }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from '../../config/server'
import errorHandler from '../helpers/errorHandler'
export default {
  name: 'QuestionCard',
  props: ['question'],
  data () {
    return {
      totalAnswers: 0
    }
  },
  computed: {
    ...mapState(['watchedTags']),
    previewDescription() {
      return this.question.description
    },
    myFollowing() {
      if (this.watchedTags) {
        return this.question.tags.some(tag => this.watchedTags.includes(tag))
      }
      return false
    }
  },
  created () {
    axios({
      method: 'get',
      url: `/answers/${this.question._id}`,
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .then(({ data }) => {
        this.totalAnswers = data.length
      })
      .catch(({ response}) => {
        let msg = errorHandler(response)
        Vue.toasted.error(msg, {
          duration: 3000,
          position: 'top-center'
        });
      })
  }
}
</script>

<style>

</style>