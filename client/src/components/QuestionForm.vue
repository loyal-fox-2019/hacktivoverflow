<template>
  <div>
    <div class="col-md-8 offset-md-2">
      <b-form @submit.prevent='submit'>
        <b-form-group label="Title">
          <b-form-input
            type="text"
            required
            v-model='title'
            placeholder="Enter title"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Description">
          <div id="editor"></div>
        </b-form-group>
        <b-form-group label="Tags">
          <b-form-tags
            v-model="tags"
            separator=" "
            placeholder="Enter new tags separated by space"
            remove-on-delete
            no-add-on-enter
          ></b-form-tags>
        </b-form-group>
        <input v-if='edit' type="submit" value="Edit">
        <input v-else type="submit" value="Post">
        <input @click.prevent='cancel' type='submit' value="Cancel">
      </b-form>
    </div>
  </div>
</template>

<script>
import Quill from 'quill'
export default {

  name: 'QuestionForm',

  data () {
    return {
      quill: null,
      title: '',
      description: '',
      tags: [],
      edit: false
    }
  },
  methods: {
    submit(){
      this.description = this.quill.root.innerHTML
      let questionObj = {
        title: this.title, 
        description: this.description,
        tags: this.tags
      }
      if (this.edit){
        questionObj.questionId = this.$route.params.id
        this.$store.dispatch('EDIT_QUESTION', questionObj)
      }
      else {
        this.$store.dispatch('POST_QUESTION', questionObj)
      }
    },
    cancel(){
      this.$router.push('/home')
    }
  },
  watch: {
    question(){
      this.title = this.question.title
      this.quill.root.innerHTML = this.question.description
      this.tags = this.question.tags
    }
  },
  mounted(){
    this.quill = new Quill('#editor', {
      theme: 'snow'
    })
  },
  created(){
    if (this.$route.params.id){
      this.edit = true
    }
  },
  props: ['question']
}
</script>

<style lang="css" scoped>
</style>