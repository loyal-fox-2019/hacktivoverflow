<template>
  <div class="home">
    <b-container>
      <br><br>
      <p id="ask">
         <b-button variant="warning" v-if="log" @click="askQ">Ask Question</b-button>
         <br><br>
         <formAsk v-if="ask" @cancel="can" @submitQ="can" data="ask"></formAsk>
      </p>
      <h2>Question:</h2>
      <quest
      v-for="(question ,i) in questions"
      :key="i"
      :data="question"></quest>
    </b-container>
  </div>
</template>

<script>
import quest from '../components/question'
import formAsk from '../components/form'
export default {
  name: 'home',
  data () {
    return {
      ask: false
    }
  },
  computed: {
    questions () {
      return this.$store.state.questions
    },
    log () {
      return this.$store.state.login
    }
  },
  components: {
    quest,
    formAsk
  },
  methods: {
    patch () {
      this.$store.dispatch('patch')
    },
    askQ () {
      this.ask = true
    },
    can () {
      this.ask = false
    }
  },
  created () {
    this.patch()
  }
}
</script>

<style>
#ask{
min-height: 40px;
}

</style>
