<template>
  <b-container id="askAQuestion" class="pt-5">
      <h1 class="my-3" v-if="!$store.state.editQuestion">Ask a Question</h1>
      <h1 class="my-3" v-if="$store.state.editQuestion">Edit Question</h1>
      <b-form class="my-4">
        <b-row align-h="center">
            <b-col sm="2" align-self="center">
                <label for="QTitle">Question Title:</label>
            </b-col>
            <b-col sm="5">
                <b-form-input id="QTitle" v-model="QTitle" type="text"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="my-3" align-h="center">
            <b-col>
                <label for="question">Your Question:</label>
                <quill-editor ref="myTextEditor"
                v-model="question"
                id="quillEditor"
                class="shadow">
                </quill-editor>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
            <b-button id="askQuestionButton" v-if="!$store.state.editQuestion" @click="askQuestion">Ask Question</b-button>
            <b-button id="askQuestionButton" v-if="$store.state.editQuestion" @click="editQuestion">Edit Question</b-button>
            <b-button id="askQuestionButton" variant="danger" class="mx-3" v-if="$store.state.editQuestion" @click="$router.go(-1)">cancel</b-button>
            </b-col>
        </b-row>
      </b-form>
  </b-container>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name: 'AskAQuestion',
  data () {
    return {
      QTitle: '',
      question: ''
    }
  },
  components: {
    quillEditor
  },
  methods: {
    askQuestion () {
      // console.log(this.QTitle)
      this.$store.dispatch('askQuestion', { title: this.QTitle, description: this.question })
      this.QTitle = ''
      this.question = ''
    },
    editQuestion () {
      this.$store.dispatch('editQuestion', { title: this.QTitle, description: this.question })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$store.state.isLogin === true) {
        next()
      } else {
        next('/')
      }
    })
  },
  created () {
    if (this.$store.state.editQuestion) {
      this.QTitle = this.$store.state.detailedQuestion.title
      this.question = this.$store.state.detailedQuestion.description
    }
  }
}
</script>

<style>
  #quillEditor {
    background: white;
  }
  #askAQuestion {
      overflow: scroll;
  }
</style>
