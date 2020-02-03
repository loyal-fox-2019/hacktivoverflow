<template>
  <div>
    <v-form>
      <v-col cols="12" sm="12" v-show="!isAnswer">
        <v-text-field v-model="title" label="Title" required></v-text-field>
      </v-col>
      <quillEditor ref="myTextEditor" v-model="content"> </quillEditor>
      <v-btn
        rounded
        color="primary"
        class="mt-3"
        dark
        @click.prevent="submitAnswer"
        v-show="!isEdit"
        >Answer</v-btn
      >
      <v-btn
        rounded
        color="warning"
        class="mt-3"
        dark
        @click.prevent="editAnswer"
        v-show="isEdit && isAnswer"
        >Edit Answer</v-btn
      >
      <v-btn
        rounded
        color="warning"
        class="mt-3"
        dark
        @click.prevent="editQuestion"
        v-show="isEdit && !isAnswer"
        >Edit Question</v-btn
      >
    </v-form>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: 'editor',
  data() {
    return {
      title: '',
      content: ''
    }
  },
  components: {
    quillEditor
  },
  methods: {
    submitAnswer() {
      const data = {
        content: this.content
      }
      this.$store.dispatch('CREATE_ANSWER', data)
      this.content = ''
    },
    editAnswer() {
      const data = {
        content: this.content
      }
      this.$store.dispatch('EDIT_ANSWER', data)
      this.content = ''
    },
    editQuestion() {
      const data = {
        title: this.title,
        content: this.content
      }
      this.$store.dispatch('EDIT_QUESTION', data)
      this.$store.commit('CHANGE_EDIT')
      this.content = ''
      this.title = ''
    }
  },
  computed: {
    isEdit() {
      return this.$store.state.editStatus
    },
    isAnswer() {
      return this.$store.state.isAnswer
    }
  },
  watch: {
    isEdit: function(val, old) {
      if (val) {
        this.title = this.$store.state.editData.title
        this.content = this.$store.state.editData.content
      } else {
        this.title = ''
        this.content = ''
      }
    }
  }
}
</script>

<style lang="css"></style>
