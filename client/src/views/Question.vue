<template>
  <div class="flex flex-col w-11/12 mx-auto mt-6 text-left">

  <div class="flex mb-8 border p-6 rounded-lg border-gray-400 shadow-lg">
    <div class="w-16 h-20 mr-4">
      <svg @click="voteQuestion('up', question._id)" class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z"/></svg>
      <p class="ml-1">{{ question.upvotes.length - question.downvotes.length }}</p>
      <svg @click="voteQuestion('down', question._id)" class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>
    </div>
    <div class="flex-grow">
      <h2 class="text-xl mb-2">{{ question.title }}</h2>
      <h3 v-html="question.content" class="text-base mb-2 container"></h3>
      <h4 class="text-sm italic">{{ question.poster.name }}</h4>
    </div>
    <div class="text-yellow-500 flex-shrink-0 my-auto">
      <div v-if="question.poster == user" class="flex items-center justify-between">
        <button @click="editQuestion(question._id)" class="mr-2 bg-yellow-400 text-gray-800 hover:bg-gray-800 hover:text-yellow-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Edit
        </button>
        <button @click="deleteQuestion(question._id)" class="bg-yellow-400 text-gray-800 hover:bg-gray-800 hover:text-yellow-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Delete
        </button>
      </div>
    </div>
  </div>

    <div class="flex mb-8 border p-6 rounded-lg border-gray-400 shadow-lg bg-gray-200">
      <div class="w-full px-3 m-4">
        <label class="mb-4 text-gray-700 text-lg font-bold mb-4">
          Your Answer
        </label>
        <quill-editor
          ref="myTextEditor"
          v-model="answer"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
    ></quill-editor>
      </div>
      <div class="flex items-center justify-between">
        <button @click.prevent="submitAnswer" class="hover:bg-yellow-400 hover:text-gray-800 bg-gray-800 text-yellow-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Submit
        </button>
      </div>
    </div>
    
    <div v-for="answer in question.answers" :key="answer._id">
      <div v-if="answer._id != hide">
        <div class="flex mb-8 border p-6 rounded-lg border-gray-400 shadow-lg">
          <div class="w-16 h-20 mr-4">
            <svg @click="voteAnswer('up', answer._id)" class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z"/></svg>
            <p class="ml-1">{{ answer.upvotes.length - answer.downvotes.length }}</p>
            <svg @click="voteAnswer('down', answer._id)" class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>
          </div>
          <div class="flex-grow">
            <h3 v-html="answer.content" class="text-lg mb-2 container"></h3>
            <h4 class="text-sm italic">{{ answer.poster.name }}</h4>
          </div>
          <div class="text-yellow-500 flex-shrink-0 my-auto">
            <div v-if="answer.poster == user" class="flex items-center justify-between">
              <button @click="editAnswer(answer._id)" class="mr-2 bg-yellow-400 text-gray-800 hover:bg-gray-800 hover:text-yellow-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Edit
              </button>
              <button @click="deleteAnswer(answer._id)" class="bg-yellow-400 text-gray-800 hover:bg-gray-800 hover:text-yellow-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Delete
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Question',
  data() {
    return {
      answer: '',
      hide: '',
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
            ["link"]
          ]
        }
      }
    }
  },
  methods: {
    // eslint-disable-next-line
    onEditorBlur(editor) {},
    // eslint-disable-next-line
    onEditorFocus(editor) {},
    // eslint-disable-next-line
    onEditorReady(editor) {},
    deleteQuestion() {
      this.$store.dispatch('deleteQuestion', this.$route.params.id)
    },
    editQuestion() {
      this.$router.push(`/questions/${this.$route.params.id}/edit`).catch(() => {})
    },
    fetchQuestion() {
      this.$store.dispatch('fetchQuestion', this.$route.params.id)
    },
    voteQuestion(type) {
      this.$axios({
        method: 'PATCH',
        url: `questions/${this.$route.params.id}?vote=${type}`,
      })
        .then(() => {
          this.fetchQuestion()
          this.$store.commit('SEND_SUCCESS', 'Success!')
        })
        .catch(err => {
          this.$store.commit('SEND_ERROR', err.response.data.error)
        })
    },
    submitAnswer() {
      if (this.hide) {
        this.$axios({
          method: 'PUT',
          url: `answers/${this.hide}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            content: this.answer
          }
        })
          .then(() => {
            this.answer = ''
            this.hide = ''
            this.fetchQuestion()
            this.store.commit('SEND_SUCCESS', 'Answer successfully updated')
          })
          .catch(err => {
            this.$store.commit('SEND_ERROR', err.response.data.error)
          })
      } else {
        this.$axios({
          method: 'POST',
          url: 'answers',
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            content: this.answer,
            QuestionId: this.$route.params.id
          }
        })
          .then(() => {
            this.answer = ''
            this.fetchQuestion()
            this.store.commit('SEND_SUCCESS', 'Answer successfully posted')
          })
          .catch(err => {
            this.$store.commit('SEND_ERROR', err.response.data.error)
          })
      }
    },
    voteAnswer(type, id) {
      this.$axios({
        method: 'PATCH',
        url: `answers/${id}?vote=${type}`,
      })
        .then(() => {
          this.fetchQuestion()
          this.$store.commit('SEND_SUCCESS', 'Success!')
        })
        .catch(err => {
          this.$store.commit('SEND_ERROR', err.response.data.error)
        })
    },
    deleteAnswer(id) {
      this.$store.dispatch('deleteAnswer', {question: this.question._id, answer: id})
    },
    editAnswer(id) {
      this.$axios({
        method: 'GET',
        url: `answers/${id}`,
      })
        .then(({ data }) => {
          this.answer = data.content
          this.hide = data._id
        })
        .catch(err => {
          this.$store.commit('SEND_ERROR', err.response.data.error)
        })
    }
  },
  created() {
    this.fetchQuestion()
  },
  computed: {
    question() {
      return this.$store.state.question
    },
    editor() {
      return this.$refs.myTextEditor.quill;
    },
    contentCode() {
      // eslint-disable-next-line
      return hljs.highlightAuto(this.content).value;
    },
    user() {
      return localStorage.getItem('id')
    }
  },
  watch: {
    '$route.params.id'() {
      this.fetchQuestion()
    }
  }
}
</script>

<style>

</style>