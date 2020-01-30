/* eslint-disable vue/valid-v-for */
<template>
<div class="mt-9">
 <Cards
  :data="quest"
  @loadUlangQuestion="refreshQuestion"
  :tipe="'questions'"
  style="width: 60vw"
  class="ml-auto"/>
  <hr style="size:10px">
  <h3 style="width: 60vw; text-decoration: underline;"
  class="mx-auto">{{answers.length}} Answer</h3> <br>
  <Cards
    v-for="(jawab, index) in answers"
    :key="index"
    @loadUlangAnswer="refreshAnswers"
    :data="jawab"
    :tipe="'answers'"
    style="width: 60vw"
  class="ml-auto"/>
</div>

</template>

<script>
import Cards from '../components/Cards'
export default {
  name: 'Question',
  data () {
    return {
    }
  },
  methods: {
    refreshQuestion (payload) {
      this.$store.dispatch(
        'fetchSingleQuestion',
        this.$route.params.id
      )
    },
    refreshAnswers (payload) {
      this.answers = this.$store.dispatch(
        'fetchTheAnswer',
        this.$route.params.id
      )
    }
  },
  computed: {
    quest () {
      return this.$store.state.singleQuestion
    },
    answers: {
      set (val) {
        console.log(val, 'ini val')
        this.$store.state.theAnswer = val
      },
      get () {
        return this.$store.state.theAnswer
      }
    }
  },
  components: {
    Cards
  },
  created () {
    this.$store.dispatch(
      'fetchSingleQuestion',
      this.$route.params.id
    )
    this.answers = this.$store.dispatch(
      'fetchTheAnswer',
      this.$route.params.id
    )
  },
  watch: {
    '$route.params.id' () {
      this.$store.dispatch(
        'fetchSingleQuestion',
        this.$route.params.id
      )
      this.answers = this.$store.dispatch(
        'fetchTheAnswer',
        this.$route.params.id
      )
    }
  }
}
</script>

<style>
</style>
