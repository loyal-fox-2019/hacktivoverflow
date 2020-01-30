<template>
  <b-form class="my-4">
      <h3 v-if="!editAnswer">Submit an Answer</h3>
      <center>
        <h3 v-if="editAnswer">Edit Answer</h3>
      </center>
      <b-row align-h="center">
            <b-col sm="2" align-self="center">
                <label for="QTitle">Answer Title:</label>
            </b-col>
            <b-col sm="5">
                <b-form-input id="QTitle" v-model="Atitle" type="text"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="my-3" align-h="center">
            <b-col>
                <label for="QTitle">Your Answer:</label>
                <quill-editor ref="myTextEditor"
                v-model="answer"
                id="quillEditor"
                class="shadow">
                </quill-editor>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
            <b-button v-if="!editAnswer" id="askQuestionButton" @click="addAnswer">Submit Answer</b-button>
            <b-button v-if="editAnswer" id="askQuestionButton" @click="editA">Edit Answer</b-button>
            </b-col>
        </b-row>
  </b-form>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name: 'AnswerForm',
  components: {
    quillEditor
  },
  props: {
    editAnswer: {
      type: Object
    }
  },
  data () {
    return {
      Atitle: '',
      answer: ''
    }
  },
  methods: {
    addAnswer () {
      this.$store.dispatch('addAnswer', { id: this.$route.params.questionId, title: this.Atitle, description: this.answer })
      this.Atitle = ''
      this.answer = ''
    },
    editA () {
      this.$store.dispatch('editAnswer', { id: this.$route.params.questionId, title: this.Atitle, description: this.answer })
      this.Atitle = ''
      this.answer = ''
    }
  },
  created () {
    if (this.editAnswer) {
      this.Atitle = this.editAnswer.title
      this.answer = this.editAnswer.description
    }
  }
}
</script>

<style>
#quillEditor {
    background: white;
  }
</style>
