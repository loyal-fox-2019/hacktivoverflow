<template>
  <div class="home">
    <div class="mx-auto d-flex justify-space-between align-center" style="width: 60vw; height: 90px;">
      <h3>Newest Questions</h3>
      <v-btn
        class="ma-2"
        @click="expand = !expand"
        small color="primary">Ask Question</v-btn>
    </div>
      <v-expand-transition class="mx-auto">
        <FormQ :formType="'questions'" v-show="expand" />
      </v-expand-transition>
    <div class="d-flex mx-auto">
      <div class="mx-auto">
        <Cards
          v-for="quest in allQuestions"
          :tipe="'questions'"
          :key="quest._id"
          :data="quest"
          style="width: 60vw; height: 150px"
        />
      </div>
      <div style="width: 250px" class="mr-auto ml-n12" v-show="$store.state.isLogin">
        <b-card header="watched tags" header-tag="header" title="Title">
          <b-card-text>Header and footers using props.</b-card-text>
          <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Cards from '../components/Cards'
import FormQ from '../components/FormQuestion'

export default {
  name: 'home',
  components: {
    Cards,
    FormQ
  },
  data () {
    return {
      expand: false
    }
  },
  computed: {
    allQuestions () {
      return this.$store.state.allQuestions
    }
  },
  methods: {}
}
</script>
