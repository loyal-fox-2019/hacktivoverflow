<template>
  <div>
    <v-card class="mx-auto" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">
            {{ new Date(dataDetail.createdAt).toDateString() }}
          </div>
          <v-list-item-title class="headline mb-1">{{
            dataDetail.title
          }}</v-list-item-title>
          <v-list-item-subtitle>{{
            dataDetail.user_id.name
          }}</v-list-item-subtitle>

          <v-card-text class="text--primary">
            <div v-html="dataDetail.content"></div>
          </v-card-text>
          <div v-show="isOwner">
            <v-btn icon @click.prevent="remove(dataDetail._id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn icon @click.prevent="editData(dataDetail)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </div>
        </v-list-item-content>

        <div style="width:80px;" class="mt-2">
          <div class="text-center" @click.prevent="upvote(dataDetail._id)">
            <v-btn icon><v-icon>mdi-arrow-up</v-icon></v-btn>
          </div>
          <div id="votes" class="text-center">
            <h2>{{ dataDetail.upvote.length - dataDetail.downvote.length }}</h2>
          </div>
          <div class="text-center" @click.prevent="downvote(dataDetail._id)">
            <v-btn icon><v-icon>mdi-arrow-down</v-icon></v-btn>
          </div>
        </div>
      </v-list-item>
    </v-card>
    <div class="mt-3" v-show="!isAnswer && editStatus">
      <h3>Edit Question</h3>
      <Editor />
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import Editor from '@/components/Editor'

export default {
  name: 'detailCard',
  computed: {
    dataDetail() {
      return this.$store.state.detailQuestion
    },
    isOwner() {
      return this.dataDetail.user_id._id === this.$store.state.userID
    },
    isEdited() {
      return this.$store.state.editData
    },
    editStatus() {
      return this.$store.state.editStatus
    },
    isAnswer() {
      return this.$store.state.isAnswer
    }
  },
  components: {
    Editor
  },
  methods: {
    upvote(id) {
      this.$store.dispatch('UPVOTE_QUESTION', id)
    },
    downvote(id) {
      this.$store.dispatch('DOWNVOTE_QUESTION', id)
    },
    remove(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if (result.value) {
          this.$store.dispatch('DELETE_QUESTION', id)
        }
      })
    },
    editData(val) {
      this.$store.commit('FILL_EDIT', val)
      this.$store.commit('CHANGE_EDIT')
    }
  }
}
</script>

<style lang="css"></style>
