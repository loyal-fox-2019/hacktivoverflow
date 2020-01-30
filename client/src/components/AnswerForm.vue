<template>
  <div>
    <div class="col-md-8 offset-md-2">
      <b-form>
        <b-form-group label="Answer">
          <div id="editor"></div>
        </b-form-group>
        <input @click.prevent='postAnswer' v-if='!edit' type="submit" value="Post">
        <input @click.prevent='editAnswer' v-if='edit' type="submit" value="Edit">
        <input v-if='edit' type="submit" value="Cancel" @click.prevent='cancel'>
      </b-form>
    </div>
  </div>
</template>

<script>
import Quill from 'quill'
export default {

  name: 'AnswerForm',

  data () {
    return {
      quill: null,
      description: '',
      edit: false
    }
  },
  methods: {
    postAnswer(){
      this.description = this.quill.root.innerHTML
      let answerObj = {
        questionId: this.$route.params.id,
        description: this.description
      }
      this.$store.dispatch('POST_ANSWER', answerObj)
      this.quill.root.innerHTML = ''
    },
    editAnswer(){
      this.description = this.quill.root.innerHTML
      let answerObj = {
        questionId: this.$route.params.id,
        answerId: this.answer._id,
        description: this.description
      }
      this.$store.dispatch('EDIT_ANSWER', answerObj)
      this.quill.root.innerHTML = ''
      this.edit = false
    },
    cancel(){
      this.edit = false
      this.quill.root.innerHTML = ''
      this.$emit('showEditor', {description: ''})
    }
  },
  mounted(){
    this.quill = new Quill('#editor', {
      theme: 'snow'
    })
  },
  watch: {
    answer(){
      if (this.answer.description != ''){
        this.quill.root.innerHTML = this.answer.description
        this.edit = true
      }
    }
  },
  props: ['answer']
}
</script>

<style lang="css" scoped>
</style>