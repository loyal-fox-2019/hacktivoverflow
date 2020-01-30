<template>
  <b-container>
    <b-row>
      <b-col>
        <b-input-group style="width: 50%;margin:2rem auto;">
          <b-form-input placeholder="Search questions..."></b-form-input>
          <b-input-group-append>
            <b-button size="sm" text="Button" variant="dark"><b-icon icon="search"></b-icon></b-button>
          </b-input-group-append>
        </b-input-group>
        <QuestionList
              v-for="question in questions"
              :key="question._id"
              :question="question"
            />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import QuestionList from '@/components/QuestionList.vue'

export default {
  name: 'home',
  components: {
    QuestionList
  },
  methods: {
    fetchQuestions () {
      this.$store.dispatch('fetchQuestions')
    }
  },
  computed: {
    questions () {
      return this.$store.state.questions
    },
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  created () {
    this.fetchQuestions()
  }
}
</script>
<style>
  .add-thread {
    display: block;
    margin-bottom: 1rem;
  }
</style>
