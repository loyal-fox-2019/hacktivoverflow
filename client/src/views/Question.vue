/* eslint-disable vue/valid-v-for */
<template>
<div class="mt-9">
<v-btn
        class="ma-2 mt-1"
        @click="expand = !expand"
        small color="primary"
        style="position: fixed; right: 15px"
        >Ask Question</v-btn>

  <v-expand-transition class="mx-auto">
    <FormQ :formType="'questions'" v-show="expand" />
  </v-expand-transition>

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

  <FormQ :formType="'asnwers'" /> // blom ubah v show di sana
</div>

</template>

<script>
import Cards from '../components/Cards'
import FormQ from '../components/FormQuestion'
export default {
  name: 'Question',
  data () {
    return {
      expand: false
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
    Cards,
    FormQ
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
