<template>
  <div class="home">
    <v-content>
      <v-container class="grey lighten-5">
        <v-row no-gutters>
          <v-col cols="12" sm="12">
            <Toolbar :title="{ name: 'All Question' }" />
            <v-card class="pa-2" outlined tile v-for="data in allQuestion" :key="data._id">
              <QuestionCard :data="data" />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import QuestionCard from '@/components/QuestionCard'
import Toolbar from '@/components/Toolbar'

export default {
  name: 'home',
  components: {
    QuestionCard,
    Toolbar
  },
  created() {
    this.$store.dispatch('FETCH_ALL')
  },
  computed: {
    allQuestion() {
      return this.$store.state.allQuestion
    }
  }
}
</script>
