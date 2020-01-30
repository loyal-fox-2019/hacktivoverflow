<template>
  <div>
    <header class="text-center my-4">
      <h3>Add Question</h3>
    </header>
    <v-form id="form-question" style="width: 100%; padding: 2em" @submit.prevent="postQuestion" class="d-flex flex-column justify-center align-center">
      <v-alert type="error" v-for="(error, i) in errors" :key="i">
        {{error}}
      </v-alert>
      <div class="d-flex flex-column justify-center" style="width: 70%">
        <v-text-field v-model="title" label="Title" required></v-text-field>
        <v-text-field v-model="tags" label="Tags (separated by space)"></v-text-field>
      </div>
      <wysiwyg v-model="content" style="width: 80%"/>
      <div style="position: relative">
        <v-btn color="success" class="my-5" style="position: relative; right:0" type="submit" form="form-question">Post Question</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import axios from '../config/api'
export default {
  name: 'Add',
  data () {
    return {
      errors: [],
      title: '',
      tags: '',
      content: ''
    }
  },
  methods: {
    postQuestion () {
      this.errors = []
      axios({
        method: 'POST',
        url: `/questions`,
        data: {
          title: this.title,
          tags: this.tags.split(' '),
          content: this.content
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: 'Question Posted',
            showConfirmButton: false,
            timer: 1500
          })
          this.title = ''
          this.tags = ''
          this.content = ''
          this.$emit('hide-form')
          this.$store.dispatch('fetchQuestions')
        })
        .catch(err => {
          this.errors = err.response.data.message
        })
    }
  }
}
</script>

<style>

</style>
