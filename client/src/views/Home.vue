<template>
  <b-row class="mt-3">
    <b-col></b-col>
    <b-col cols="7">
      <b-row>
        <b-col cols="2">
          <h3>Questions</h3>
        </b-col>
        <b-col cols="10" class="text-right">
          <b-button v-if="$store.state.isLogin" variant="primary" v-b-modal.askQ>Ask Question</b-button>
          <b-button v-if="!$store.state.isLogin" disabled variant="primary" style="pointer-events: none;">Log in first to ask question</b-button>
        </b-col>
      </b-row>
      <b-row class="justify-content-center mt-4" id="scroll-question">
        <QuestionList v-for="question in questionList" :key="question._id" :questionDetail="question"></QuestionList>
      </b-row>
    </b-col>
    <b-col></b-col>
    <b-modal id="askQ" size="lg" title="Ask new question" header-bg-variant="dark" header-text-variant="light" @hide="clear" hide-footer>
      <b-form-group label="Title:" label-for="input-title">
        <b-form-input
        id="input-title"
        v-model="title"
        required
        placeholder="Enter question's title"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Details:" label-for="input-description">
        <VueEditor id="input-description" v-model="description"></VueEditor>
      </b-form-group>
      <b-row class="mx-auto">
        <b-button block variant="primary" v-on:click.prevent="postQuestion" @click="$bvModal.hide('askQ')">Submit Question</b-button>
      </b-row>
    </b-modal>
  </b-row>
</template>

<script>
import QuestionList from '../components/QuestionList'
import { VueEditor } from "vue2-editor"
export default {
  name: 'home',
  data(){
    return{
      title: '',
      description: ''
    }
  },
  computed:{
    questionList(){
      return this.$store.state.questionFiltered
    }
  },
  methods: {
    clear(){
      this.title = ''
      this.description = ''
    },
    postQuestion(){
      let payload = {
        title: this.title,
        description: this.description
      }
      this.$store.dispatch('postQuestion', payload)
    }
  },
  components: {
    QuestionList,
    VueEditor
  },
  created(){
    this.$store.dispatch('fetchQuestions')
  }
}
</script>

<style scoped>
#scroll-question{
  height: 75vh;
  overflow: auto; 
}
</style>
