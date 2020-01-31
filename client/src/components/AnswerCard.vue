<template>
  <div class="border border-gray-300 flex rounded shadow-md min-h-48 mt-2 p-2 mb-2">
    <div class="flex flex-col w-24 p-4">
      <div class="flex items-center flex-col justify-center mb-2">
        <div
          @click.prevent="submitVote('up')"
          class="arrow cursor-pointer"
          ><font-awesome-icon icon="angle-up"></font-awesome-icon>
        </div>
        <span class="text-center">{{ votes }}</span>
        <div
          @click.prevent="submitVote('down')"
          class="arrow cursor-pointer"
          ><font-awesome-icon icon="angle-down"></font-awesome-icon>
        </div>
      </div>
    </div>
    <div class="p-2 w-full flex flex-col justify-between">
      <div v-html="answer.description" class="text-sm py-1">
      </div>
      <div
        class="flex w-full">
        <div v-if="myQuestion">
          <span
          @click.prevent="openedEditor = !openedEditor"
          class="mr-4 text-blue-500 cursor-pointer hover:underline">
          Edit
        </span>
        <span
          @click.prevent="deleteAnswer"
          class="text-blue-500 cursor-pointer hover:underline">
          Delete
        </span>
        </div>
        <span class="ml-auto">by {{ answer.author.username }}</span>
      </div>
      <form 
        v-if="openedEditor"
        @submit.prevent="submitEdit" 
        class="mt-2 text-lg">
        <div
          class="overflow-auto z-0 w-full">
          <wysiwyg 
            v-model="description"
            class="h-full my-4 rounded-sm shadow-md overflow-auto"/>
        </div>
        <button
          class="bg-blue-400 px-2 py-1 rounded-sm shadow-md text-white hover:bg-blue-700"
          type="submit">
          Submit 
        </button>
      </form>
    </div>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css';
import axios from '../../config/server'
import errorHandler from '../helpers/errorHandler'
import Swal from 'sweetalert2'
export default {
  name: 'AnswerCard',
  props: ['answer'],
  components: {
    Loading
  },
  data () {
    return {
      description: this.answer.description,
      totalAnswers: 0,
      upvotes: 0,
      downvotes: 0,
      openedEditor: false
    }
  },
  methods: {
    submitVote (value) {
      let payload = {
        answerId: this.answer._id,
        questionId: this.$route.params.questionId,
        value
      }
      this.$store.dispatch('voteA', payload)
        .then(() => {
          this.$emit('fetchQuestion')
        })
    },
    submitEdit () {
      let payload = {
        description: this.description,
        answerId: this.answer._id,
        questionId: this.$route.params.questionId,
      }
      this.$store.dispatch('editAnswer', payload)
        .then(() => {
          this.$emit('fetchQuestion')
          this.openedEditor = false
        })
    },
    deleteAnswer () {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          if (result.value) {
            let answerId = this.answer._id
            this.$store.dispatch('destroyAnswer', answerId)
              .then(() => {
                this.$emit('fetchQuestion')
                this.openedEditor = false
              })
          }
        })
    }
  },
  computed: {
    ...mapState(['isLoading', 'questions', 'watchedTags', 'userId']),
    votes () {
      return this.answer.upvotes.length - this.answer.downvotes.length
    },
    myQuestion () {
      return this.answer.author._id == this.userId
    }
  },
  created () {
  }
}
</script>

<style>

</style>  