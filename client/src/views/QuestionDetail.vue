<template>
  <div class="container mx-auto flex flex-col text-left w-3/5">
    <Loading 
      :active.sync="isLoading" 
      :can-cancel="false"
      :is-full-page="true">
    </Loading>
    <div class="py-2 flex mt-20">
      <div v-if="question.author && question.author._id == userId" class="ml-auto">
        <span
          @click.prevent="openedEditor = !openedEditor"
          class="ml-auto mr-2 p-2 cursor-pointer bg-blue-100 border border-blue-600 hover:bg-blue-200 rounded text-blue-600">
          Edit
        </span>
        <span
          @click.prevent="deleteQuestion"
          class="ml-auto p-2 cursor-pointer bg-blue-100 border border-blue-600 hover:bg-blue-200 rounded text-blue-600">
          Delete
        </span>
      </div>
    </div>
    <QuestionEditorForm :question="question" v-if="openedEditor"></QuestionEditorForm>
    <div class="border border-gray-300 flex rounded shadow-md p-2 my-2">
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
            <span v-if="question.author" class=" inline-block">by {{ question.author.username }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="p-2 items-center mt-2 flex flex-row justify-between">
      <h3 class="text-xl">{{ totalAnswers }} Answer(s)</h3>
      <div class="py-2">
        <span
          @click.prevent="openedAnswerForm = !openedAnswerForm"
          class="ml-2 p-2 cursor-pointer bg-blue-100 border border-blue-600 hover:bg-blue-200 rounded text-blue-600">
          Answer This Question
        </span>
      </div>
    </div>
    <AnswerForm 
      @fetchData="fetchData"
      v-if="openedAnswerForm"/>
    <AnswerCard
      @fetchQuestion="fetchData"
      v-for="answer in answers"
      :key="answer._id"
      :answer="answer"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css';
import axios from '../../config/server'
import errorHandler from '../helpers/errorHandler'
import AnswerCard from '../components/AnswerCard'
import AnswerForm from '../components/AnswerForm'
import QuestionEditorForm from '../components/QuestionEditorForm'
import Swal from 'sweetalert2'
export default {
  name: 'QuestionDetail',
  components: {
    Loading,
    AnswerCard,
    AnswerForm,
    QuestionEditorForm
  },
  methods: {
    fetchData () {
      this.$store.commit('SET_IS_LOADING', true)
      axios({
        method: 'get',
        url: `/questions/${this.$route.params.questionId}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.$store.commit('SET_IS_LOADING', false)
          this.question = data
          this.previewDescription = data.description
          this.upvotes = data.upvotes.length
          this.downvotes = data.downvotes.length
        })
        .catch(({ response }) => {
          this.$store.commit('SET_IS_LOADING', false)
          let msg = errorHandler(response)
          this.$toasted.error(msg, {
            duration: 3000,
            position: 'top-center'
          })
        })

      axios({
        method: 'get',
        url: `/answers/${this.$route.params.questionId}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.answers = data
          this.totalAnswers = data.length
        })
        .catch(({ response}) => {
          let msg = errorHandler(response)
          this.$toasted.error(msg, {
            duration: 3000,
            position: 'top-center'
          });
        })
    },
    submitVote (value) {
      let payload = {
        questionId: this.question._id,
        value
      }
      this.$store.dispatch('voteQ', payload)
        .then(() => {
          this.fetchData()
        })
    },
    deleteQuestion () {
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
            let questionId = this.question._id
            this.$store.dispatch('destroyQuestion', questionId)
              .then(() => {
                this.$router.push('/questions')
                this.$emit('fetchQuestion')
              })
          }
        })
    }
  },
  data () {
    return {
      previewDescription: '',
      question: {},
      totalAnswers: 0,
      upvotes: 0,
      downvotes: 0,
      answers: [],
      openedAnswerForm: false,
      openedEditor: false
    }
  },
  computed: {
    ...mapState(['isLoading', 'questions', 'watchedTags', 'userId']),
    votes () {
      return this.upvotes - this.downvotes
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    question(n, o) {
      this.question = n
    }
  }
}
</script>

<style>

</style>  