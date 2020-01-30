<template>
  <div class="p-4">
    <div class="row">
      <div class="col-md-1">
        <p>
          <strong>{{data.userId.username}}</strong>
        </p>
        <p class="vote-section">
          <i class="fas fa-sort-up large" @click="upvote"></i>
        </p>
        <p class="vote-section">{{totalvotes}}</p>
        <p class="vote-section">
          <i class="fas fa-sort-down large" @click="downvote"></i>
        </p>
      </div>
      <div class="col-md question-content" v-html="data.description"></div>
    </div>
    <div class="d-flex justify-content-end">
      <el-button
        type="primary"
        icon="el-icon-edit"
        circle
        v-if="isOwn"
        @click="$bvModal.show('modal-'+data._id)"
      ></el-button>
    </div>
    <el-divider></el-divider>

    <!-- Modal -->
    <b-modal :id="'modal-'+ data._id" size="lg" hide-footer>
      <template v-slot:modal-title>Edit Answer</template>
      <quill-editor class="quil-wysywig" ref="myTextEditor" v-model="description"></quill-editor>
      <button class="btn btn-primary btn-edit" @click="editAnswer">Edit My Answer</button>
    </b-modal>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  props: ['data'],
  data() {
    return {
      description: ''
    }
  },
  methods: {
    upvote() {
      this.$store.dispatch('upvote_answer', {
        id: this.data._id,
        questionId: this.data.questionId
      })
    },
    downvote() {
      this.$store.dispatch('downvote_answer', {
        id: this.data._id,
        questionId: this.data.questionId
      })
    },
    editAnswer() {
      this.$store.dispatch('edit_answer', {
        id: this.data._id,
        description: this.description,
        questionId: this.$route.params.id
      })
      this.$bvModal.hide('modal-' + this.data._id)
    }
  },
  computed: {
    totalvotes() {
      let upvote = this.data.upvote.length
      let downvote = this.data.downvote.length
      return upvote - downvote
    },
    isOwn() {
      if (this.data.userId._id === localStorage.getItem('id')) {
        return true
      } else {
        return false
      }
    }
  },
  created() {
    this.description = this.data.description
  }
}
</script>

<style>
.vote-section {
  font-size: 34px;
  text-align: center;
  margin-bottom: 0;
  height: 25px;
  color: #bbc0c4;
}
.large {
  font-size: 40px;
}
.large:hover {
  cursor: pointer;
}
pre.ql-syntax {
  padding: 20px;
  background-color: #EFF0F1!Important;
  color: #000!Important;
}
.btn-edit {
  width: 100%;
}
</style>
