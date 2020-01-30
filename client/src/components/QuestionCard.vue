<template>
  <v-card class="mx-auto" outlined>
    <v-list-item three-line>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-list-item-content
            @click.prevent="detail(data)"
            style="cursor: pointer;"
            v-on="on"
          >
            <div class="overline mb-4">
              {{ new Date(data.createdAt).toDateString() }}
            </div>
            <v-list-item-title class="headline mb-1">{{
              data.title
            }}</v-list-item-title>
            <v-list-item-subtitle>{{ data.user_id.name }}</v-list-item-subtitle>
            <p>Views: {{data.clicks}}</p>
          </v-list-item-content>
        </template>
        <span>Click to see details</span>
      </v-tooltip>

      <div style="width:80px;" class="mt-2">
        <div id="votes" class="text-center">
          <h2>{{ data.upvote.length - data.downvote.length }}</h2>
          <p>Votes</p>
        </div>
        <div id="answer" class="text-center">
          <h2>{{ data.answer.length }}</h2>
          <p>Answer</p>
        </div>
      </div>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: 'QuestionCard',
  props: ['data'],
  methods: {
    detail(data) {
      this.$router.push('/details/' + data._id)
      this.$store.commit('DETAIL_QUESTION', data)
      this.$store.dispatch('ADD_VIEWS', data._id)
    }
  }
}
</script>

<style lang="css"></style>
