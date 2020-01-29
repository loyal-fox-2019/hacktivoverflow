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
        <v-text-field v-model="tags" label="Tags"></v-text-field>
      </div>
      <wysiwyg v-model="content" />
      <div style="position: relative">
        <v-btn color="success" class="my-3" style="position: relative; right:0" type="submit" form="form-question">Post Question</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
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
      console.log('POST TRIGGRED', this.title, this.tags, this.content)
    }
  }
}
</script>

<style>

</style>
