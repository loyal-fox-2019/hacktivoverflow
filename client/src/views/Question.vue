<template>
  <div>
    {{ question.title }}
    <p v-html="question.content"></p>
    <div class="flex items-center justify-between">
      <button @click="editQuestion" class="bg-yellow-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Edit
      </button>
      <button @click="deleteQuestion" class="bg-yellow-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Delete
      </button>
      <button @click="voteQuestion('up')" class="bg-yellow-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Upvote
      </button>
      <button @click="voteQuestion('down')" class="bg-yellow-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Downvote
      </button>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
          Answer
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
        <button @click.prevent="submitAnswer" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Submit
        </button>
      </div>
    </div>
    
    <div v-for="answer in question.answers" :key="answer._id">
      <div v-if="answer._id != hide">
        <p>{{ answer.poster.name }}: </p>
        <p v-html="answer.content"></p>
        <div class="flex items-center justify-between">
          <button @click="editAnswer(answer._id)" class="bg-yellow-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Edit
          </button>
          <button @click="deleteAnswer(answer._id)" class="bg-yellow-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Delete
          </button>
          <button @click="voteAnswer('up', answer._id)" class="bg-yellow-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Upvote
          </button>
          <button @click="voteAnswer('down', answer._id)" class="bg-yellow-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Downvote
          </button>
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