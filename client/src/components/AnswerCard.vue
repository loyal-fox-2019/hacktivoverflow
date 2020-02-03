<template>
  <div>
    <v-row dense>
      <v-col cols="11">
        <v-card color="#385F73" dark>
          <v-card-title class="headline">{{ data.user_id.name }}</v-card-title>

          <v-card-text>
            <h2 v-html="data.content"></h2>
          </v-card-text>

          <v-card-actions>
            <div v-show="isOwner">
              <v-btn icon @click.prevent="editData(data)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="1">
        <div style="width:40px;" class="mt-2">
          <div class="text-center" @click.prevent="upvote(data._id)">
            <v-btn icon><v-icon>mdi-arrow-up</v-icon></v-btn>
          </div>
          <div id="votes" class="text-center">
            <h2>
              {{ data.upvote.length - data.downvote.length }}
            </h2>
          </div>
          <div class="text-center" @click.prevent="downvote(data._id)">
            <v-btn icon><v-icon>mdi-arrow-down</v-icon></v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
    <Editor v-show="editStatus && isOwner && isAnswer" />
  </div>
</template>

<script>
import Editor from '@/components/Editor'

export default {
  name: 'answer',
  data() {
    return {
      editStatus: false
    }
  },
  props: ['data'],
  components: {
    Editor
  },
  computed: {
    isOwner() {
      return this.data.user_id._id === this.$store.state.userID
    },
    isAnswer() {
      return this.$store.state.isAnswer
    },
    answerId() {
      return this.data._id === this.$store.state.answerId
    }
  },
  methods: {
    upvote(id) {
      this.$store.dispatch('UPVOTE_ANSWER', id)
    },
    downvote(id) {
      this.$store.dispatch('DOWNVOTE_ANSWER', id)
    },
    editData(val) {
      this.editStatus = !this.editStatus
      this.$store.commit('FILL_EDIT', val)
      this.$store.commit('CHANGE_EDIT')
      this.$store.commit('ANSWER_STATUS', val)
    }
  }
}
</script>
